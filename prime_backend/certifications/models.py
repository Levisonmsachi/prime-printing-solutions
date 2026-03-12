from django.db import models

# ------------------------------
# Certifications Page Intro
# ------------------------------
class CertificationPageIntro(models.Model):
    title = models.CharField(
        max_length=255,
        default="Our Certifications & Accreditations"
    )
    subtitle = models.TextField(
        help_text="Short credibility statement"
    )

    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


# ------------------------------
# Certification Notice
# ------------------------------
class CertificationNotice(models.Model):
    message = models.TextField(
        default="All certifications are valid and verifiable with issuing authorities."
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return "Certification Notice"


# ------------------------------
# Certifications CTA
# ------------------------------
class CertificationCTA(models.Model):
    message = models.CharField(
        max_length=255,
        default="Need a certified and trusted printing partner?"
    )
    button_text = models.CharField(
        max_length=100,
        default="Contact Us"
    )
    button_link = models.CharField(max_length=255, default="/contact")

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.message


# ------------------------------
# Certifications Page Section Toggle
# ------------------------------
class CertificationPageSection(models.Model):
    SECTION_CHOICES = [
        ("intro", "Page Intro"),
        ("certifications", "Certifications Grid"),
        ("notice", "Verification Notice"),
        ("cta", "Call To Action"),
    ]

    section_key = models.CharField(
        max_length=50,
        choices=SECTION_CHOICES,
        unique=True
    )
    display_name = models.CharField(max_length=100)

    is_enabled = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=1)

    default_enabled = models.BooleanField(default=True)
    default_order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["display_order"]

    def reset_to_default(self):
        self.is_enabled = self.default_enabled
        self.display_order = self.default_order
        self.save()

    def __str__(self):
        return self.display_name

from django.db import models

# ------------------------------
# Contact Page Intro
# ------------------------------
class ContactPageIntro(models.Model):
    title = models.CharField(
        max_length=255,
        default="Get In Touch"
    )
    subtitle = models.TextField(
        help_text="Short description of contact section"
    )

    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


# ------------------------------
# Contact Information
# ------------------------------
class ContactInfo(models.Model):
    phone = models.CharField(max_length=20, default="+265 996 678 548")
    email = models.EmailField(default="primeprintsolutions25@outlook.com")
    address = models.TextField(default="Area 51/B, Lilongwe, Malawi")
    business_hours = models.TextField(
        default="Always Open: 6:00 AM - 9:00 PM"
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return "Contact Information"


# ------------------------------
# Office Location
# ------------------------------
class OfficeLocation(models.Model):
    name = models.CharField(max_length=100, default="Main Office")
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100, default="USA")
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)

    is_main = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


# ------------------------------
# Contact Message
# ------------------------------
class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    company = models.CharField(max_length=100, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()

    attachment = models.FileField(
        upload_to='contact_attachments/%Y/%m/%d/', 
        null=True, 
        blank=True,
        help_text="Optional file attachment"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.name}: {self.subject}"


# ------------------------------
# Contact Form Settings
# ------------------------------
class ContactFormSettings(models.Model):
    require_phone = models.BooleanField(default=False)
    allow_attachments = models.BooleanField(default=False)
    max_attachment_size = models.PositiveIntegerField(default=10 * 1024 * 1024)  # 10 MB
    success_message = models.TextField(
        default="Thank you for your message! We'll get back to you within 24 hours."
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return "Contact Form Settings"


# ------------------------------
# Contact CTA
# ------------------------------
class ContactCTA(models.Model):
    message = models.CharField(
        max_length=255,
        default="Ready to start your next printing project?"
    )
    button_text = models.CharField(
        max_length=100,
        default="Get Quote"
    )
    button_link = models.URLField(default="/services")

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.message


# ------------------------------
# Contact Page Section Toggle
# ------------------------------
class ContactPageSection(models.Model):
    SECTION_CHOICES = [
        ("intro", "Page Intro"),
        ("info", "Contact Information"),
        ("locations", "Office Locations"),
        ("form", "Contact Form"),
        ("map", "Map Section"),
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

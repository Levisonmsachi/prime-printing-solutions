from django.db import models
from django.utils import timezone

# ------------------------------
# Hero Section (Main Image + Title + Subtitle)
# ------------------------------
class HeroSection(models.Model):
    title = models.CharField(max_length=255, default="Prime Print Solutions")
    subtitle = models.CharField(max_length=255, default="Prints that speak loud and clear!")
    background_image = models.ImageField(upload_to="homepage/hero/")

    # Three message fields 
    message_1 = models.CharField(max_length=200, default="Quality prints that speak volumes")
    message_2 = models.CharField(max_length=200, default="Fast turnaround, guaranteed results")
    message_3 = models.CharField(max_length=200, default="Sustainable printing solutions")

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


# Future Upgrade: Multiple images for carousel (Sliding images)
class HeroImage(models.Model):
    hero = models.ForeignKey(HeroSection, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="homepage/hero/")
    display_order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["display_order"]


# ---------------------------------------------------------------------------
# Intro Section (Text) About the Company (simple modal text like spark systems)
# ---------------------------------------------------------------------------
class IntroSection(models.Model):
    content = models.TextField(help_text="3-4 sentence intro of the company")
    delivered_projects = models.PositiveIntegerField(default=0, help_text="Total number of projects delivered")
    clients_satisfied = models.PositiveIntegerField(default=0, help_text="Percentage value (0-100)")
    years_experience = models.PositiveIntegerField(default=0, help_text="Number of years in business")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content[:50] + "..."


# ------------------------------
# Service Highlight (Cards)
# ------------------------------
class ServiceHighlight(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=100, blank=True, null=True,
                            help_text="FontAwesome/React Icons class or icon name")
    display_order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return self.title


# ------------------------------
# Company Profile Download
# ------------------------------
class CompanyProfile(models.Model):
    title = models.CharField(max_length=255, default="Download Our Company Profile")
    file = models.FileField(upload_to="homepage/company_profiles/")
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


# -----------------------------------------
# Testimonials / Client Success Stories
# -----------------------------------------
class Testimonial(models.Model):
    client_name = models.CharField(max_length=100)
    client_role = models.CharField(max_length=100, blank=True, null=True)
    company = models.CharField(max_length=100, blank=True, null=True)
    quote = models.TextField()
    avatar = models.ImageField(upload_to="homepage/testimonials/", blank=True, null=True)
    default_avatar = models.ImageField(upload_to="homepage/testimonials/defaults/",
                                       blank=True, null=True)
    rating = models.PositiveSmallIntegerField(default=5)
    display_order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return f"{self.client_name} - {self.company}"
    

# -----------------------------
# Featured Projects
# -----------------------------
class FeaturedProject(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to="homepage/featured_projects/")
    project_link = models.URLField(blank=True, null=True)
    display_order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return self.title


# ------------------------------
# Certifications
# ------------------------------
class Certification(models.Model):
    title = models.CharField(max_length=255)
    issuer = models.CharField(max_length=255)
    logo = models.ImageField(upload_to="homepage/certifications/", blank=True, null=True)
    default_logo = models.ImageField(upload_to="homepage/certifications/defaults/",
                                     blank=True, null=True)
    issue_date = models.DateField(blank=True, null=True)
    expiry_date = models.DateField(blank=True, null=True)
    display_order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return f"{self.title} ({self.issuer})"


# ------------------------------
# CTA Section
# ------------------------------
class CallToAction(models.Model):
    message = models.CharField(max_length=255, default="Looking for an excellent business solution?")
    button_text = models.CharField(max_length=100, default="Get a Quote")
    button_link = models.CharField(max_length=50, default="/request-quote")
    default_button_link = models.CharField(max_length=50, default="/request-quote")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.button_text


# ------------------------------
# Homepage Section Toggle
# ------------------------------
class HomepageSection(models.Model):
    SECTION_CHOICES = [
        ("hero", "Hero Section"),
        ("intro", "Intro Section"),
        ("service", "Service Highlights"),
        ("featured_projects", "Featured Projects"),
        ("company_profile", "Company Profile"),
        ("testimonials", "Testimonials"),
        ("certifications", "Certifications"),
        ("cta", "Call To Action"),
    ]

    section_key = models.CharField(max_length=50, choices=SECTION_CHOICES, unique=True)
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

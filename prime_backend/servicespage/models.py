from django.db import models

# ------------------------------
# Services Page Intro
# ------------------------------
class ServicesPageIntro(models.Model):
    title = models.CharField(
        max_length=255,
        default="Our Services"
    )
    subtitle = models.TextField(
        help_text="Short description of services offered"
    )

    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


# ------------------------------
# Service Category
# ------------------------------
class ServiceCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    icon = models.CharField(
        max_length=100,
        blank=True,
        help_text="FontAwesome/React Icons class or icon name"
    )
    display_order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order"]
        verbose_name_plural = "Service Categories"

    def __str__(self):
        return self.name


# ------------------------------
# Service
# ------------------------------
class Service(models.Model):
    category = models.ForeignKey(
        ServiceCategory,
        on_delete=models.CASCADE,
        related_name="services"
    )
    name = models.CharField(max_length=200)
    short_description = models.TextField(
        help_text="Brief description for listings"
    )
    full_description = models.TextField(
        help_text="Detailed description for service page"
    )
    icon = models.CharField(
        max_length=100,
        blank=True,
        help_text="FontAwesome/React Icons class or icon name"
    )
    image = models.ImageField(
        upload_to="servicespage/services/",
        blank=True,
        null=True
    )
    features = models.JSONField(
        default=list,
        help_text="List of key features as JSON array"
    )
    pricing_info = models.CharField(
        max_length=200,
        blank=True,
        help_text="Basic pricing information"
    )
    turnaround_time = models.CharField(
        max_length=100,
        blank=True,
        help_text="Typical turnaround time"
    )
    display_order = models.PositiveIntegerField(default=1)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return self.name


# ------------------------------
# Service Process Step
# ------------------------------
class ServiceProcessStep(models.Model):
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name="process_steps"
    )
    step_number = models.PositiveIntegerField()
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(
        max_length=100,
        blank=True,
        help_text="FontAwesome/React Icons class or icon name"
    )
    estimated_time = models.CharField(
        max_length=50,
        blank=True,
        help_text="Estimated time for this step"
    )

    class Meta:
        ordering = ["step_number"]
        unique_together = ["service", "step_number"]

    def __str__(self):
        return f"{self.service.name} - Step {self.step_number}: {self.title}"


# ------------------------------
# Services CTA
# ------------------------------
class ServicesCTA(models.Model):
    message = models.CharField(
        max_length=255,
        default="Ready to get started with your printing project?"
    )
    button_text = models.CharField(
        max_length=100,
        default="Get Quote"
    )
    button_link = models.URLField(default="/contact")

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.message


# ------------------------------
# Services Page Section Toggle
# ------------------------------
class ServicesPageSection(models.Model):
    SECTION_CHOICES = [
        ("intro", "Page Intro"),
        ("categories", "Service Categories"),
        ("featured_services", "Featured Services"),
        ("all_services", "All Services"),
        ("process", "Our Process"),
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

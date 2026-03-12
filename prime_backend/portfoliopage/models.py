from django.db import models

# ------------------------------
# Portfolio Intro
# ------------------------------
class PortfolioIntro(models.Model):
    title = models.CharField(
        max_length=255,
        default="Our Work Speaks for Itself"
    )
    subtitle = models.TextField(
        help_text="Short intro about the portfolio"
    )

    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


# ------------------------------
# Portfolio Categories
# ------------------------------
class PortfolioCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    display_order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return self.name


# ------------------------------
# Portfolio Project
# ------------------------------
class PortfolioProject(models.Model):
    title = models.CharField(max_length=255)
    client_name = models.CharField(max_length=255, blank=True, null=True)

    category = models.ForeignKey(
        PortfolioCategory,
        on_delete=models.SET_NULL,
        null=True,
        related_name="projects"
    )

    short_description = models.CharField(
        max_length=300,
        help_text="Shown on cards"
    )
    full_description = models.TextField(
        help_text="Shown on project detail view",
        blank=True
    )

    cover_image = models.ImageField(
        upload_to="portfolio/projects/covers/"
    )

    is_featured = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return self.title


# ------------------------------
# Portfolio Project Gallery
# ------------------------------
class PortfolioProjectImage(models.Model):
    project = models.ForeignKey(
        PortfolioProject,
        on_delete=models.CASCADE,
        related_name="images"
    )
    image = models.ImageField(
        upload_to="portfolio/projects/gallery/"
    )

    caption = models.CharField(max_length=255, blank=True)
    display_order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["display_order"]


# ------------------------------
# Project Highlights
# ------------------------------
class ProjectHighlight(models.Model):
    project = models.ForeignKey(
        PortfolioProject,
        on_delete=models.CASCADE,
        related_name="highlights"
    )

    label = models.CharField(max_length=100)
    value = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.label}: {self.value}"


# ------------------------------
# Portfolio CTA
# ------------------------------
class PortfolioCTA(models.Model):
    message = models.CharField(
        max_length=255,
        default="Like what you see? Let's create something together."
    )
    button_text = models.CharField(
        max_length=100,
        default="Get a Quote"
    )
    button_link = models.CharField(max_length=100, default="/request-quote")

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.message


# ------------------------------
# Portfolio Page Section Toggle
# ------------------------------
class PortfolioPageSection(models.Model):
    SECTION_CHOICES = [
        ("intro", "Portfolio Intro"),
        ("categories", "Category Filters"),
        ("projects", "Portfolio Projects"),
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

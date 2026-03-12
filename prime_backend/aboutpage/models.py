from django.db import models

# ------------------------------
# Company Profile Section (Core Identity)
# ------------------------------
class CompanyProfileSection(models.Model):
    company_name = models.CharField(max_length=255)
    tagline = models.CharField(max_length=255, blank=True)

    what_we_do = models.TextField(help_text="Short paragraph about what the company does")
    mission = models.TextField()
    vision = models.TextField()
    values_summary = models.TextField( help_text="High-level values summary (not the cards below)")
    team_Members_count = models.PositiveIntegerField(default=0)
    years_experience = models.PositiveIntegerField(default=0)
    projects_completed = models.PositiveIntegerField(default=0)
    clients_served = models.PositiveIntegerField(default=0)
    target_market = models.TextField(help_text="Who the company serves")

    image = models.ImageField(upload_to="about/company_profile/")

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.company_name
    


# ------------------------------
# Company History
# ------------------------------
class CompanyHistory(models.Model):
    title = models.CharField(max_length=255, default="Our Journey")
    content = models.TextField(help_text="Full company history")

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


# ------------------------------
# Our Team
# ------------------------------
class TeamMember(models.Model):
    full_name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    bio = models.TextField(help_text="Qualifications and responsibilities")

    avatar = models.ImageField(upload_to="about/team/")
    display_order = models.PositiveIntegerField(default=1)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return self.full_name


# ------------------------------
# Our Values (6 Cards)
# ------------------------------
class CompanyValue(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

    display_order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return self.title


# ------------------------------
# Our Impact
# ------------------------------
class CompanyImpact(models.Model):
    title = models.CharField(max_length=255, help_text="E.g. Our Impact")
    description = models.TextField()

    display_order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return self.title


# ------------------------------
# Partners
# ------------------------------
class Partner(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to="about/partners/")
    website = models.URLField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    partnership_since = models.DateField(blank=True, null=True)
    partnership_type = models.CharField(max_length=100, blank=True, null=True)

    display_order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return self.name


# ------------------------------
# About Page Section Toggle
# ------------------------------
class AboutPageSection(models.Model):
    SECTION_CHOICES = [
        ("profile", "Company Profile"),
        ("history", "Company History"),
        ("team", "Our Team"),
        ("values", "Our Values"),
        ("impact", "Our Impact"),
        ("partners", "Partners"),
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

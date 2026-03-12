from django.db import models

class QuoteRequest(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)

    project_type = models.CharField(max_length=150)
    description = models.TextField()

    quantity = models.PositiveIntegerField()
    deadline = models.DateField(null=True, blank=True)

    attachment = models.FileField(
        upload_to="quote_attachments/",
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} — {self.project_type}"
    

class QuoteSettings(models.Model):
    allow_attachments = models.BooleanField(default=True)
    max_attachment_size = models.PositiveIntegerField(default=10 * 1024 * 1024)  # 10 MB
    auto_response_message = models.TextField(
        default="Thank you for requesting a quote! We will review your project and get back to you shortly."
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return "Quote Request Settings"
from django.db import models
from .constants import CATEGORY_CHOICES, PRIORITY_CHOICES, STATUS_CHOICES


class Ticket(models.Model):

    title = models.CharField(
        max_length=200,
        null=False,
        blank=False
    )

    description = models.TextField(
        null=False,
        blank=False
    )

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        null=False,
        blank=False
    )

    priority = models.CharField(
        max_length=20,
        choices=PRIORITY_CHOICES,
        null=False,
        blank=False
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="open",
        null=False,
        blank=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        db_index=True
    )

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["status"]),
            models.Index(fields=["priority"]),
            models.Index(fields=["category"]),
        ]

    def __str__(self):
        return f"{self.title} ({self.status})"

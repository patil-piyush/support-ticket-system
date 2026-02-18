from django.db.models import Count, Avg
from django.db.models.functions import TruncDate
from .models import Ticket


def get_ticket_stats():
    # Total tickets
    total_tickets = Ticket.objects.count()

    # Open tickets
    open_tickets = Ticket.objects.filter(status="open").count()

    # Priority breakdown
    priority_data = (
        Ticket.objects
        .values("priority")
        .annotate(count=Count("id"))
    )

    priority_breakdown = {
        "low": 0,
        "medium": 0,
        "high": 0,
        "critical": 0,
    }

    for item in priority_data:
        priority_breakdown[item["priority"]] = item["count"]

    # Category breakdown
    category_data = (
        Ticket.objects
        .values("category")
        .annotate(count=Count("id"))
    )

    category_breakdown = {
        "billing": 0,
        "technical": 0,
        "account": 0,
        "general": 0,
    }

    for item in category_data:
        category_breakdown[item["category"]] = item["count"]

    # Average tickets per day
    daily_counts = (
        Ticket.objects
        .annotate(day=TruncDate("created_at"))
        .values("day")
        .annotate(count=Count("id"))
    )

    avg_tickets_per_day = daily_counts.aggregate(
        avg=Avg("count")
    )["avg"]

    return {
        "total_tickets": total_tickets,
        "open_tickets": open_tickets,
        "avg_tickets_per_day": round(avg_tickets_per_day or 0, 2),
        "priority_breakdown": priority_breakdown,
        "category_breakdown": category_breakdown,
    }

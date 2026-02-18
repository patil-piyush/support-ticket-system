from django.shortcuts import render

from rest_framework import generics, views, status
from rest_framework.response import Response
from django.db.models import Q
from .models import Ticket
from .serializers import TicketSerializer



class TicketListCreateView(generics.ListCreateAPIView):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()

    def get_queryset(self):
        queryset = Ticket.objects.all()

        category = self.request.query_params.get("category")
        priority = self.request.query_params.get("priority")
        status_param = self.request.query_params.get("status")
        search = self.request.query_params.get("search")

        if category:
            queryset = queryset.filter(category=category)

        if priority:
            queryset = queryset.filter(priority=priority)

        if status_param:
            queryset = queryset.filter(status=status_param)

        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search)
            )

        return queryset





class TicketUpdateView(generics.UpdateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    http_method_names = ["patch"]

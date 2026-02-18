from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from .models import Ticket
from .serializers import TicketSerializer
from .selectors import get_ticket_stats
from tickets.services.llm_service import classify_ticket




# Create and list ticket
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




# Update Ticket
class TicketUpdateView(generics.UpdateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    http_method_names = ["patch"]



# ticket stats
class TicketStatsView(APIView):

    def get(self, request):
        stats = get_ticket_stats()
        return Response(stats)



# classify ticket
class TicketClassifyView(APIView):

    def post(self, request):

        description = request.data.get("description")

        if not description:
            return Response(
                {"error": "Description is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        result = classify_ticket(description)

        return Response(result, status=status.HTTP_200_OK)

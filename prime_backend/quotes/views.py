from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import QuoteRequestSerializer

class QuoteRequestCreateView(APIView):
    def post(self, request):
        serializer = QuoteRequestSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Quote request submitted successfully"},
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

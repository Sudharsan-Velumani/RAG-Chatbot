from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Conversation, Document, DocumentChunk
from .utils import *
from pgvector.django import CosineDistance
import uuid

class UploadDocument(APIView):
    def post(self, request):
        files = request.FILES.getlist('files')
        if not files:
            return Response({'error': 'No files provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Create new conversation
        conversation = Conversation.objects.create()
        
        for file in files:
            # Create document under conversation
            document = Document.objects.create(
                conversation=conversation,
                file=file
            )
            
            # Process document
            text = extract_text_from_pdf(file)
            chunks = chunk_text(text)
            embeddings = get_embeddings(chunks)
            
            # Create chunks
            for chunk, embedding in zip(chunks, embeddings):
                DocumentChunk.objects.create(
                    document=document,
                    text=chunk,
                    embedding=embedding
                )

        return Response({'conversation_id': conversation.id}, status=status.HTTP_201_CREATED)

class Query(APIView):
    def post(self, request):
        conversation_id = request.data.get('conversation_id')
        query = request.data.get('query')
        
        if not conversation_id:
            return Response({'error': 'conversation_id is required'}, status=400)
        
        try:
            conversation = Conversation.objects.get(id=conversation_id)
        except Conversation.DoesNotExist:
            return Response({'error': 'Conversation not found'}, status=404)

        # Get query embedding
        query_embedding = get_embeddings([query])[0]
        
        # Search within conversation documents
        chunks = DocumentChunk.objects.filter(
            document__conversation=conversation
        ).annotate(
            similarity=1 - CosineDistance('embedding', query_embedding)
        ).order_by('-similarity')[:3]

        # Rest of the logic remains the same...
        if chunks.exists():
            context = "\n".join([chunk.text for chunk in chunks])
            prompt = f"Context: {context}\n\nQuestion: {query}\nAnswer:"
        else:
            prompt = query
        
        response = co.generate(
            prompt=prompt,
            model='command',
            max_tokens=300,
            temperature=0.7
        )
        
        return Response({'answer': response.generations[0].text})
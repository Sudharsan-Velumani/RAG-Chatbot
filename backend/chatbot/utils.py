import cohere
import PyPDF2
from io import BytesIO
import os

co = cohere.Client(os.getenv('COHERE_API_KEY'))

def extract_text_from_pdf(file):
    pdf = PyPDF2.PdfReader(file)
    text = ""
    for page in pdf.pages:
        text += page.extract_text()
    return text

def chunk_text(text, chunk_size=500):
    words = text.split()
    chunks = [' '.join(words[i:i+chunk_size]) for i in range(0, len(words), chunk_size)]
    return chunks

def get_embeddings(texts):
    response = co.embed(
        texts=texts,
        model='embed-english-v3.0',
        input_type='search_document'
    )
    print(f"Embedding dimensions: {len(response.embeddings[0])}")  # Debug statement
    return response.embeddings
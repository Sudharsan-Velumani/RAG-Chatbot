# RAG-Based Q&A Chatbot

## Overview
This is a web application that allows users to upload documents (PDFs) and ask questions based on the uploaded content. The chatbot utilizes **Retrieval-Augmented Generation (RAG)** to enhance AI responses using relevant information from the uploaded documents.

## Tech Stack
- **Backend**: Django (Handles document upload, text extraction, embedding generation, and retrieval)
- **Frontend**: React (Provides a UI for document upload and chatbot interaction)
- **Database**: PostgreSQL with `pgvector` (Stores document embeddings for similarity-based retrieval)
- **Containerization**: Docker + Docker Compose (Manages backend, frontend, and database services)
- **Embedding Model**: Cohere (Generates embeddings from document text and queries)
- **LLM Response Generation**: Cohere
- **Vector Search**: `pgvector` extension for PostgreSQL
- **Frameworks**: LangChain (For document chunking and retrieval workflow)

## Features
1. **Document Upload & Processing**
   - Users can upload PDF.
   - Extracts text from uploaded documents.
   - Cleans and preprocesses extracted text.

2. **Embedding Generation**
   - Breaks text into smaller chunks.
   - Converts chunks into vector embeddings using Cohere.

3. **Vector Database**
   - Stores embeddings in PostgreSQL with `pgvector`.
   - Uses cosine similarity for efficient retrieval.

4. **Query-Based Retrieval & Augmented Response**
   - Takes user query and converts it into embeddings.
   - Searches vector database for relevant text chunks.
   - Constructs a prompt and sends it to Cohere for final response generation.
   - Implements a fallback mechanism if no relevant content is found.

5. **React Frontend**
   - Users can upload PDF.
   - Users can ask questions via a chatbot interface.
   - Displays AI responses augmented with relevant document content.

6. **Containerization**
   - Uses `docker-compose` to run the backend, frontend, and database as separate services.
   - Initializes the `pgvector` extension on startup.

---
## Installation & Setup
### **Prerequisites**
Ensure you have the following installed:
- Docker & Docker Compose
- Python 3.11+
- Node.js 20+

### **1. Clone the Repository**
```sh
git clone https://github.com/Sudharsan-Velumani/RAG-Chatbot.git
cd chatbot
```

### **2. Environment Variables**
Create a `.env` file in the root directory and add the following:
```
SECRET_KEY=your-django-secret-key
DATABASE_URL=postgresql://user:password@db:5432/chatbot
COHERE_API_KEY=your-cohere-api-key

POSTGRES_USER=your-username
POSTGRES_PASSWORD=your-password
POSTGRES_DB=your-db
POSTGRES_HOST=your-host
POSTGRES_PORT=5432
```

### **3. Start the Application**
Run the following command to build and start all services:
```sh
docker-compose up --build -d
```
This will start:
- Django backend at `http://localhost:8000`
- React frontend at `http://localhost:3000`
- PostgreSQL database with `pgvector`

### **4. Running Migrations**
If migrations are not applied automatically, run:
```sh
docker-compose exec backend python manage.py migrate
```

### **5. Access the Application**
- Open `http://localhost:3000` to interact with the chatbot.

---
## File Structure
```
rag-chatbot/
│── backend/          # Django Backend
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── manage.py
│   ├── chatbot/  # Main Django app
│── frontend/         # React Frontend
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│── init.sql          # Initializes pgvector extension
│── docker-compose.yml
│── .env
│── README.md
│── .gitignore
```

---
## API Endpoints
### **Document Upload**
- `POST /upload/` - Uploads a document, extracts text, and stores embeddings.

### **Question Answering**
- `POST /query/` - Takes a user query and returns an AI-generated answer.

---
## Troubleshooting
### **1. If the database fails to start**
Run:
```sh
docker-compose down -v
```
Then restart the containers:
```sh
docker-compose up --build
```

### **2. If migrations are missing**
```sh
docker-compose exec backend python manage.py migrate
```

### **3. If you get a missing `.env` error**
Ensure that `.env` exists in the root folder before running `docker-compose`.

---
## Future Improvements
- Implement support for multiple document formats.
- Enhance UI with message history and improved design.
- Add CSS media queries for small screens
- Optimize vector search using hybrid search techniques.

---
## License
MIT License

---
## Author
* [Sudharsan Velumani](https://github.com/Sudharsan-Velumani)


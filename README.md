# Support Ticket System  
Tech Intern Assessment  

A full-stack Support Ticket System with **LLM-powered auto-classification**, built using:

- **Backend:** Django + Django REST Framework  
- **Frontend:** React  
- **Database:** PostgreSQL  
- **LLM Integration:** Google Gemini API (configurable)  
- **Infrastructure:** Docker + Docker Compose  

This project satisfies all requirements defined in the assessment.

---

# Features Overview

## Core Capabilities

- Submit support tickets
- AI-powered automatic category & priority suggestions
- Filter and search tickets
- Update ticket status
- Real-time statistics dashboard
- Fully containerized setup with Docker

---

### Structure Philosophy

- API logic separated from UI components
- Reusable components
- Clean state management
- Separation of concerns

---

### Backend Design Decisions

- LLM logic isolated in `services/`
- Business logic separated from views
- Database-level aggregation for stats
- Environment-variable configuration
- Clean REST architecture

---

## Environment Variables

Configured via `docker-compose.yml`.

Required:

```
GOOGLE_API_KEY=your_api_key_here

```

API key is **never hardcoded**.

---

# Docker Setup

The entire application runs with:

```
docker-compose up --build
```

---

## Services Included

### 1 PostgreSQL
- Dedicated database container
- Persistent storage

### 2 Django Backend
- Waits for database
- Runs migrations automatically on startup
- Exposes port 8000

### 3 React Frontend
- Runs on port 5173
- Connects to backend service

---

## docker-compose.yml Overview

Includes:

- `db` service
- `backend` service
- `frontend` service
- Proper service dependencies
- Environment variable injection
- Automatic migration execution

---

# How to Run the Project

### 1 Clone the Project

```
git clone https://github.com/patil-piyush/support-ticket-system.git
cd support-ticket-system
```

---

### 2 Add Your API Key

Create a `.env` file or update `docker-compose.yml`:

```
GOOGLE_API_KEY=your_real_key
```

---

### 3 Build and Start Containers

```
docker-compose up --build
```

---

# Access the Application

- Frontend → http://localhost:5173  
- Backend API → http://localhost:8000/api/tickets/  
- Django Admin → http://localhost:8000/admin  

---

# Testing the LLM Feature

1. Enter a description in the ticket form  
2. Classification endpoint is triggered  
3. Category & priority are auto-filled  
4. You may override them  
5. Submit ticket  

If API key is missing:
- System still works
- Only AI suggestions are disabled

---

# Evaluation Coverage

| Area | Status |
|------|--------|
| End-to-end Docker setup | ✅ |
| LLM integration | ✅ |
| DB constraints | ✅ |
| Clean API design | ✅ |
| DB-level aggregation | ✅ |
| React structure | ✅ |
| Code quality | ✅ |
| Commit history included | ✅ |

---

# Submission Includes

- Django backend source code  
- React frontend source code  
- docker-compose.yml  
- Dockerfiles  
- README.md  
- .git folder (with commit history)  

---

# Final Notes

This project emphasizes:

- Clean architecture  
- Proper separation of concerns  
- Production-ready Docker setup  
- Reliable AI integration with graceful fallback  

The entire system runs end-to-end using a single command:

```
docker-compose up --build
```

No additional manual setup is required (except providing an LLM API key).

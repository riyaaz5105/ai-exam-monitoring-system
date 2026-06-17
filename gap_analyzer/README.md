# AI Exam Monitoring System — Learning Gap Analyzer

## Overview

This repository contains a working prototype of an exam monitoring / learning gap analyzer application.

The current implementation provides:

- FastAPI backend for authentication and material upload
- MongoDB persistence for users and uploaded documents
- PDF text extraction using PyMuPDF
- React + Vite frontend for login, registration, dashboard, and upload

---

## Implemented Features

### Backend

- `POST /api/auth/register`
  - Creates a new user with a bcrypt-hashed password.
- `POST /api/auth/login`
  - Authenticates users and returns a JWT token.
- `POST /api/material/upload`
  - Receives a file upload, saves it locally, extracts text from the PDF, and stores metadata to MongoDB.

### Frontend

- Login page stores JWT token and user profile in localStorage.
- Register page creates new users.
- Dashboard page displays a welcome greeting and navigation cards.
- Upload page sends files to the backend upload endpoint.

---

## Repository structure

```text
gap_analyzer/
├── backend/
│   ├── auth.py
│   ├── database.py
│   ├── main.py
│   ├── model.py
│   ├── pdf_utils.py
│   ├── requirements.txt
│   ├── upload.py
│   ├── uploads/
│   ├── .env.sample
│   └── .gitignore
└── frontend/
    ├── package.json
    ├── public/
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── pages/
        │   ├── Dashboard.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   └── UploadMaterial.jsx
        └── services/
            └── api.js
```

---

## Backend setup

1. Create and activate a virtual environment:

```powershell
cd gap_analyzer/backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install dependencies:

```powershell
pip install -r requirements.txt
```

3. Create a `.env` file from `.env.sample`:

```text
MONGO_URL=mongodb://localhost:27017
DATABASE_NAME=gap_analyzer_db
JWT_SECRET=your_jwt_secret_here
```

4. Start the backend server:

```powershell
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend service will run at `http://127.0.0.1:8000`.

---

## Frontend setup

1. Install dependencies:

```bash
cd gap_analyzer/frontend
npm install
```

2. Run the frontend:

```bash
npm run dev
```

The frontend app will launch on the Vite local server (typically `http://127.0.0.1:5173`).

---

## Environment variables

Required backend variables in `backend/.env`:

- `MONGO_URL` — MongoDB connection string
- `DATABASE_NAME` — database name
- `JWT_SECRET` — secret for signing JWT tokens

---

## API endpoints

### Authentication

- `POST /api/auth/register`
  - Request body: `{ "name": string, "email": string, "password": string }`
  - Registers a new user.

- `POST /api/auth/login`
  - Request body: `{ "email": string, "password": string }`
  - Returns `{ "token": string, "name": string, "email": string }`

### Material upload

- `POST /api/material/upload`
  - Multipart form field: `file`
  - Saves uploaded file, extracts text, and stores material metadata in MongoDB.

---

## How to use the app

1. Start the backend and frontend servers.
2. Open the frontend in your browser.
3. Create a new account on the Register page.
4. Log in from the Login page.
5. On the Dashboard, click the card to upload a material.
6. Select a PDF file and click Upload.
7. The backend saves the file in `backend/uploads/` and extracts its text.

### Example API request

```bash
curl -X POST http://127.0.0.1:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

```bash
curl -X POST http://127.0.0.1:8000/api/material/upload \
  -F "file=@/path/to/document.pdf"
```

---

## Data persistence

### `users` collection

Each document stores:

- `name`
- `email`
- `password` (bcrypt hash)

### `materials` collection

Each document stores:

- `file_id`
- `filename`
- `filepath`
- extracted `text`

---

## Notes

- The current application supports authentication, file upload, and PDF text extraction.
- The AI gap analysis and automated quiz generation features are not yet implemented in code.
- Frontend authentication uses `localStorage` to store the JWT token and user details.
- `backend/.gitignore` already excludes `venv`, `__pycache__`, and `.env`.

---

## Troubleshooting

- If the frontend cannot call the backend, confirm both servers are running and that the backend is available at `http://127.0.0.1:8000`.
- If registration or login fails, verify `MONGO_URL` and `DATABASE_NAME` in `backend/.env` and confirm MongoDB is reachable.
- If PDF upload fails, ensure the file is a valid PDF and that the backend has write permission to `backend/uploads/`.
- If the backend does not start, install dependencies with `pip install -r backend/requirements.txt` and confirm Python 3.10+ is active.

---

## Next improvements

- Add JWT authorization for upload and protected routes.
- Display upload history and material details in the frontend.
- Add file-type validation and better error handling.
- Build the AI analysis pipeline for gap detection and roadmap generation.
- Add backend and frontend tests.

---

## Added files

- `backend/requirements.txt`
- `backend/.env.sample`

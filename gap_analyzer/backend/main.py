from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from auth import router as auth_router
from upload import router as upload_router

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication Routes
app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Authentication"]
)

# Material Upload Routes
app.include_router(
    upload_router,
    prefix="/api/material",
    tags=["Material"]
)

@app.get("/")
def home():
    return {
        "message": "AI Learning Gap Analyzer Backend Running"
    }
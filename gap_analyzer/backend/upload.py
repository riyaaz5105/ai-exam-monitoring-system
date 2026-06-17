from fastapi import APIRouter, UploadFile, File, HTTPException
from database import materials_collection
from gemini_service import extract_concepts

import os
import uuid

from pdf_utils import extract_text

ALLOWED_EXTENSIONS = {"pdf"}

def is_allowed_file(filename: str) -> bool:
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )

router = APIRouter()

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

# ----------------------
# Upload Material
# ----------------------
@router.post("/upload")
async def upload_material(
    file: UploadFile = File(...)
):

    file_id = str(uuid.uuid4())

    filepath = os.path.join(
        UPLOAD_FOLDER,
        f"{file_id}_{file.filename}"
    )

    if not is_allowed_file(file.filename):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported."
        )

    with open(filepath, "wb") as f:
        content = await file.read()
        f.write(content)

    try:
        extracted_text = extract_text(filepath)
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Unable to read PDF file. Please upload a valid PDF."
        )

    if not extracted_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Uploaded PDF contains no readable text."
        )

    materials_collection.insert_one({
        "file_id": file_id,
        "filename": file.filename,
        "filepath": filepath,
        "text": extracted_text
    })

    return {
        "message": "Upload Success",
        "file_id": file_id
    }


# ----------------------
# Extract Concepts
# ----------------------
@router.post(
    "/extract-concepts/{file_id}"
)
async def extract_material_concepts(
    file_id: str
):

    material = materials_collection.find_one(
        {
            "file_id": file_id
        }
    )

    if not material:
        raise HTTPException(
            status_code=404,
            detail="Material not found"
        )

    concepts = extract_concepts(
        material["text"]
    )

    materials_collection.update_one(
        {
            "file_id": file_id
        },
        {
            "$set": {
                "concepts": concepts
            }
        }
    )

    return {
        "concepts": concepts
    }
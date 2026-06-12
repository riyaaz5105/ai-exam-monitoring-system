from fastapi import APIRouter, UploadFile, File
from database import materials_collection

import os
import uuid

from pdf_utils import extract_text

router = APIRouter()

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

@router.post("/upload")
async def upload_material(
    file: UploadFile = File(...)
):

    file_id = str(uuid.uuid4())

    filepath = os.path.join(
        UPLOAD_FOLDER,
        f"{file_id}_{file.filename}"
    )

    with open(filepath, "wb") as f:
        content = await file.read()
        f.write(content)

    extracted_text = extract_text(
        filepath
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
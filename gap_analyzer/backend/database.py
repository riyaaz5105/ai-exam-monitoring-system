from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(
    os.getenv("MONGO_URL")
)

db = client[
    os.getenv("DATABASE_NAME")
]

users_collection = db["users"]
materials_collection = db["materials"]

print("Database Connected")
print(users_collection)
print(materials_collection)
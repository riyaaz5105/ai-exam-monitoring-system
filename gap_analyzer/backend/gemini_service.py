import os
import json
import re
from urllib import response
import google.generativeai as genai

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)
def _extract_json_object(text: str) -> str:
    text = text.strip()
    start = text.find("{")
    if start == -1:
        raise ValueError("No JSON object found in model response")

    depth = 0
    for index, char in enumerate(text[start:], start=start):
        if char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                return text[start:index + 1]

    raise ValueError("Unable to parse JSON object from model response")


def extract_concepts(text):

    prompt = f"""
Analyze the following study material.

Extract:

1. Main Concepts
2. Important Topics

Return ONLY JSON.

Example:

{{
    "concepts":[
        "Deep Learning",
        "Neural Networks",
        "Gradient Descent"
    ]
}}

Material:

{text[:10000]}
"""

    response = model.generate_content(
        prompt
    )
    print("========== GEMINI RESPONSE ==========")
    print(response.text)
    print("====================================")
    result = response.text.strip()

    if result.startswith("```"):
        result = re.sub(r"^```(?:json)?", "", result).strip()
        if result.endswith("```"):
            result = result[:-3].strip()

    try:
        if result.startswith("{") and result.endswith("}"):
            parsed = json.loads(result)
        else:
            json_text = _extract_json_object(result)
            parsed = json.loads(json_text)
    except (ValueError, json.JSONDecodeError) as exc:
        raise ValueError(
            f"Unable to parse JSON from Gemini response: {exc}"
        )

    concepts = parsed.get("concepts")
    if concepts is None:
        raise ValueError("Gemini response JSON does not contain 'concepts'")

    return concepts

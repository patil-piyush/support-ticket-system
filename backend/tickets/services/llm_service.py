import os
import json
from google import genai
from tickets.constants import CATEGORY_CHOICES, PRIORITY_CHOICES
import re

def extract_json(text: str):
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        return match.group()
    return None



ALLOWED_CATEGORIES = [c[0] for c in CATEGORY_CHOICES]
ALLOWED_PRIORITIES = [p[0] for p in PRIORITY_CHOICES]


def classify_ticket(description: str):

    api_key = os.getenv("GOOGLE_API_KEY")

    if not api_key:
        return {
            "suggested_category": None,
            "suggested_priority": None,
        }

    try:
        client = genai.Client(api_key=api_key)

        prompt = f"""
You are a support ticket classifier.

Classify the following support request into:

Categories:
{ALLOWED_CATEGORIES}

Priorities:
{ALLOWED_PRIORITIES}

Respond ONLY in valid JSON format like:
{{
  "category": "...",
  "priority": "..."
}}

Ticket description:
{description}
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        print("RAW GEMINI RESPONSE:")
        print(response.text)


        content = response.text.strip()

        json_string = extract_json(content)

        if not json_string:
            raise ValueError("No JSON found in Gemini response")

        parsed = json.loads(json_string)


        category = parsed.get("category")
        priority = parsed.get("priority")

        if category not in ALLOWED_CATEGORIES:
            category = None

        if priority not in ALLOWED_PRIORITIES:
            priority = None

        return {
            "suggested_category": category,
            "suggested_priority": priority,
        }

    except Exception as e:
        print("GEMINI ERROR:", e)
        return {
            "suggested_category": None,
            "suggested_priority": None,
        }

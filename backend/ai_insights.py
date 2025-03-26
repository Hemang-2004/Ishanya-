# from google import genai
import google.generativeai as genai
from dotenv import load_dotenv
import os
import asyncio



load_dotenv()

api_key = os.getenv("GENAI_API_KEY")


async def get_insights_async(text):
    input_text = "This is a differently abled student's progress report. Generate insights on the student and their progress, and generate insights on what the educator can do to help the student. Output only the insights, do not give any other text." + text
    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=input_text,
    )
    
    return response.candidates[0].content.parts[0].text  # Accessing the text content


def get_insights(text):
    return asyncio.run(get_insights_async(text))

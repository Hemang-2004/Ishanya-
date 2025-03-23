import easyocr
from PIL import Image
from pdfminer.high_level import extract_text
from google import genai
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
import os
import asyncio



load_dotenv()

api_key = os.getenv("GENAI_API_KEY")


class PersonalInfoAadhar(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    date_of_birth: Optional[str] = None
    gender:  Optional[str] = None
    address: Optional[str] = None

class PersonalInfoCV(BaseModel):
    name: Optional[str] = None
    phone_number: Optional[str] = None
    email_address: Optional[str] = None
    highest_degree_qualification: Optional[str] = None


def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)

def extract_text_from_image(image_path: str) -> str:
    reader = easyocr.Reader(['en'])  # For English text

    image = Image.open(image_path)

    result = reader.readtext(image)

    extracted_text = ""
    for detection in result:
        text = detection[1]
        extracted_text += text + "\n"

    return extracted_text

async def parse_aadhar_async(filepath):
    input_text = extract_text_from_image(filepath)
    client = genai.Client(api_key=api_key)

    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=input_text,
        config={
            'response_mime_type': 'application/json',
            'response_schema': list[PersonalInfoAadhar],
        },
    )

    personal_info: list[PersonalInfoAadhar] = response.parsed
    personal_info_dict = {
        "first_name": personal_info[0].first_name,
        "last_name": personal_info[0].last_name,
        "date_of_birth": personal_info[0].date_of_birth,
        "gender": personal_info[0].gender,
        "address": personal_info[0].address
    }

    return personal_info_dict

def parse_aadhar(filepath):
    return asyncio.run(parse_aadhar_async(filepath))  # Explicitly create a new event loop


async def parse_cv_async(filepath):
    input_text = extract_text_from_pdf(filepath)
    prompt = f'Extract the name, phone number, email address, highest degree qualification from the following text: {input_text}'
    
    client = genai.Client(api_key=api_key)

    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=prompt,
        config={
            'response_mime_type': 'application/json',
            'response_schema': PersonalInfoCV,
        },
    )

    personal_info: PersonalInfoCV = response.parsed
    personal_info_dict = {
        "name": personal_info.name,
        "phone_number": personal_info.phone_number,
        "email_address": personal_info.email_address,
        "highest_degree_qualification": personal_info.highest_degree_qualification
    }

    return personal_info_dict

def parse_cv(filepath):
    return asyncio.run(parse_cv_async(filepath))  # Explicitly create a new event loop

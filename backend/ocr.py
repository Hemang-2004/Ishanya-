import easyocr
from PIL import Image
from pdfminer.high_level import extract_text
from google import genai
# import google.generativeai as genai

from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
import os
import asyncio



load_dotenv()

api_key = os.getenv("GENAI_API_KEY")


class MedicalReportInfo(BaseModel):
    primary_diagnosis: Optional[str] = None
    blood_group: Optional[str] = None
    comorbidity: Optional[str] = None
    allergies: Optional[str] = None


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


import numpy as np

def extract_text_from_pdf_using_easyocr(pdf_path):
    # Convert PDF pages to images
    images = convert_from_path(pdf_path)
    
    reader = easyocr.Reader(['en'])  # Load EasyOCR reader
    extracted_text = ""

    for image in images:
        image_np = np.array(image)  # Convert PIL Image to NumPy array
        result = reader.readtext(image_np)
        
        for detection in result:
            extracted_text += detection[1] + "\n"
    
    return extracted_text



def extract_text_from_file(filepath, isText):
    if filepath.lower().endswith('.pdf'):
        if isText:
            return extract_text_from_pdf(filepath)
        return extract_text_from_pdf_using_easyocr(filepath)
    else:
        return extract_text_from_image(filepath)

async def parse_aadhar_async(filepath):
    input_text = extract_text_from_file(filepath, isText=False)
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
    input_text = extract_text_from_file(filepath, isText=True)
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

async def parse_medical_report_async(filepath):
    input_text = extract_text_from_file(filepath, isText=False)
    input_text = 'Extract the primary diagnosis, blood group, comorbidity, allergies from the following text: ' + input_text
    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=input_text,
        config={
            'response_mime_type': 'application/json',
            'response_schema': MedicalReportInfo,
        },
    )
    
    medical_info: MedicalReportInfo = response.parsed
    medical_info_dict = {
        "primary_diagnosis": medical_info.primary_diagnosis,
        "blood_group": medical_info.blood_group,
        "comorbidity": medical_info.comorbidity,
        "allergies": medical_info.allergies
    }    
    return medical_info_dict

def parse_medical_report(filepath):
    return asyncio.run(parse_medical_report_async(filepath))
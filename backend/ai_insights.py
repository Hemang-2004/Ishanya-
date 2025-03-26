import google.generativeai as genai
from dotenv import load_dotenv
import os
import asyncio



load_dotenv()

api_key = os.getenv("GENAI_API_KEY")


async def get_insights_async(filepath):
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

def get_insights(filepath):
    return asyncio.run(get_insights_async(filepath))

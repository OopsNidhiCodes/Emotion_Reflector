import google.generativeai as genai
import os
from dotenv import load_dotenv
load_dotenv()


genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-pro")

def generate_reflection(user_input, achievements):
    prompt = f"""
    The user said: {user_input}"
    Their achievements are: {achievements}
    
    Respond with a confident, positive reflection showing why their self doubts is distroted.
    Be factual, encouraging and evidence-based.
    """
    responce = model.generate_content(prompt)
    return responce.text

def mentor_chat(user_message, user_context):
    prompt = f"""
    You are a career mentor for the user under pressure.
    Context :{user_context}
    Message from user: "{user_message}"
    
    Respond with a concise, empathetic, and actionable message to help the user manage their stress and provide actionable advice.
    """
    
    responce = model.generate_content(prompt)
    return responce.text

from fastapi import APIRouter, Depends
from services.auth_service import get_current_user
from services.gemini_service import mentor_chat
from models.schemas import MentorChatRequest    

router = APIRouter()
@router.post("/mentor/chat")
def mentor_interaction(request:MentorChatRequest, uid: str = Depends(get_current_user)):
    response = mentor_chat(request.message, request.context)
    return {"mentor_Reply": response}
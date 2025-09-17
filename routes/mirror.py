from fastapi import APIRouter, Depends
from services.auth_service import get_current_user
from services.gemini_service import generate_reflection
from models.schemas import ReflectionRequest
from services.firebase_service import get_memories

router = APIRouter()

@router.post("/mirror/analyze")
def analyze_reflection(request: ReflectionRequest, uid: str = Depends(get_current_user)):
    user_achievements = get_memories(uid)
    reflection = generate_reflection(request.text, user_achievements)
    
    return {"reflection": reflection}
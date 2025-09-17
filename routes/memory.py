from fastapi import APIRouter, Depends
from services.auth_service import get_current_user
from services.firebase_service import get_memories, add_memory
from models.schemas import MemoryRequest

router = APIRouter()
@router.post("/memory/add")
def add_user_memory(request: MemoryRequest, uid: str = Depends(get_current_user)):
    add_memory(uid, request.dict())
    return {"message": "Memory added successfully"}

@router.get("/memory/list")
def get_user_memories(uid: str = Depends(get_current_user)):
    memories = get_memories(uid)
    return {"memories": memories}
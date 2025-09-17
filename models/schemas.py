from pydantic import BaseModel
from typing import List
from datetime import datetime

class ReflectionRequest(BaseModel):
    text: str
    achievements: List[str]
    
class MentorChatRequest(BaseModel):
    message: str
    context: str
    
class MemoryRequest(BaseModel):
    title: str
    description: str
    timwstamp: datetime
    
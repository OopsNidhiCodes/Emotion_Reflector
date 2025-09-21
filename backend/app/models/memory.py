from pydantic import BaseModel, Field
from typing import List, Optional, Dict
import time

class MemoryRequest(BaseModel):
    title: str = Field(..., description="Title of the achievement")
    description: str = Field(..., description="Description of the achievement")
    category: Optional[str] = Field(None, description="Category of the achievement")

class MemoryResponse(BaseModel):
    id: str = Field(..., description="ID of the stored achievement")
    title: str = Field(..., description="Title of the achievement")
    description: str = Field(..., description="Description of the achievement")
    category: Optional[str] = Field(None, description="Category of the achievement")
    createdAt: float = Field(default_factory=time.time, description="Creation timestamp")
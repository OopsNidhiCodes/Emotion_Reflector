from pydantic import BaseModel, Field
from typing import List, Optional

class Evidence(BaseModel):
    title: str = Field(..., description="Title of the evidence")
    description: str = Field(..., description="Description of the evidence")
    source: Optional[str] = Field(None, description="Source of the evidence")

class MirrorRequest(BaseModel):
    text: str = Field(..., description="The negative thought to analyze")
    achievements: List[str] = Field(default=[], description="List of user achievements to consider")

class MirrorResponse(BaseModel):
    original: str = Field(..., description="The original negative thought")
    corrected: str = Field(..., description="The reframed thought")
    evidence: List[Evidence] = Field(default=[], description="Evidence supporting the reframing")
    processing_time: Optional[float] = Field(None, description="Processing time in seconds")
    cached: Optional[bool] = Field(False, description="Whether the response was cached")
from pydantic import BaseModel, Field
from typing import List, Optional, Dict

class Resource(BaseModel):
    title: str = Field(..., description="Title of the resource")
    url: str = Field(..., description="URL of the resource")

class MentorRequest(BaseModel):
    message: str = Field(..., description="The question or topic for the mentor")
    context: Optional[str] = Field("", description="Additional context for the question")

class MentorResponse(BaseModel):
    advice: str = Field(..., description="The mentor's advice")
    actionSteps: List[str] = Field(default=[], description="Suggested action steps")
    resources: List[Resource] = Field(default=[], description="Helpful resources")
    processing_time: Optional[float] = Field(None, description="Processing time in seconds")
    cached: Optional[bool] = Field(False, description="Whether the response was cached")
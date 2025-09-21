from fastapi import APIRouter, HTTPException, status
from typing import List, Optional, Dict, Any
import time
import uuid

# from app.core.auth import get_current_user
from app.models.mentor import MentorRequest, MentorResponse

router = APIRouter(tags=["mentor"])

@router.post("/mentor/chat", response_model=Dict[str, Any])
async def get_mentor_advice(
    request: MentorRequest,
):
    """
    Get AI mentorship advice
    """
    # Generate a request ID for tracking
    request_id = str(uuid.uuid4())
    start_time = time.time()
    
    # Hardcoded prompts and solutions for Mentor
    MENTOR_SOLUTIONS = {
        "How do I overcome procrastination?": {
            "advice": "Start with small tasks and set achievable goals. Reward yourself for progress.",
            "actionSteps": [
                "List your tasks for the day",
                "Pick the easiest one and start",
                "Take short breaks to stay fresh"
            ],
            "resources": [
                {"title": "Procrastination Guide", "url": "https://example.com/guides/procrastination"}
            ]
        },
        "How can I improve my focus?": {
            "advice": "Eliminate distractions and use time blocks for deep work.",
            "actionSteps": [
                "Turn off notifications",
                "Set a timer for focused work",
                "Review your progress after each block"
            ],
            "resources": [
                {"title": "Focus Techniques", "url": "https://example.com/techniques/focus"}
            ]
        }
    }
    try:
        user_id = "anonymous"
        solution = MENTOR_SOLUTIONS.get(request.message)
        processing_time = time.time() - start_time
        if solution:
            response = {
                "success": True,
                "data": {
                    "advice": solution["advice"],
                    "actionSteps": solution["actionSteps"],
                    "resources": solution["resources"],
                    "processing_time": processing_time
                },
                "_metadata": {
                    "requestId": request_id,
                    "userId": user_id,
                    "duration": processing_time
                }
            }
        else:
            response = {
                "success": False,
                "data": {
                    "advice": "No advice available for this prompt.",
                    "actionSteps": [],
                    "resources": [],
                    "processing_time": processing_time
                },
                "_metadata": {
                    "requestId": request_id,
                    "userId": user_id,
                    "duration": processing_time
                }
            }
        return response
    except Exception as e:
        # Log the error (would use a proper logger in production)
        print(f"Error in mentor advice: {str(e)}")
        
        # Return error response
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get mentor advice: {str(e)}"
        )
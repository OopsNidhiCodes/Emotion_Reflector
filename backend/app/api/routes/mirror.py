from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional, Dict, Any
import time
import uuid

from app.core.auth import get_current_user
from app.models.mirror import MirrorRequest, MirrorResponse, Evidence

router = APIRouter(tags=["mirror"])

@router.post("/mirror", response_model=Dict[str, Any])
async def analyze_doubt(
    request: MirrorRequest
):
    """
    Analyze a negative thought and provide reframing
    """
    # Generate a request ID for tracking
    request_id = str(uuid.uuid4())
    start_time = time.time()
    
    # Hardcoded prompts and solutions for Mirror
    MIRROR_SOLUTIONS = {
        "I will never succeed": {
            "corrected": "Sometimes success takes time. You have succeeded before and can do it again.",
            "evidence": [
                {"title": "Past Achievement", "description": "You've completed similar tasks before.", "source": "user_history"},
                {"title": "Objective Fact", "description": "Progress is visible in your recent work.", "source": "analysis"}
            ]
        },
        "I'm not good enough": {
            "corrected": "Everyone has strengths and weaknesses. You are good enough to try and improve.",
            "evidence": [
                {"title": "Positive Feedback", "description": "Others have praised your work.", "source": "feedback"}
            ]
        }
    }
    try:
        solution = MIRROR_SOLUTIONS.get(request.text)
        processing_time = time.time() - start_time
        if solution:
            response = {
                "success": True,
                "data": {
                    "original": request.text,
                    "corrected": solution["corrected"],
                    "evidence": solution["evidence"],
                    "processing_time": processing_time
                },
                "_metadata": {
                    "requestId": request_id,
                    "duration": processing_time
                }
            }
        else:
            response = {
                "success": False,
                "data": {
                    "original": request.text,
                    "corrected": "No solution available for this prompt.",
                    "evidence": [],
                    "processing_time": processing_time
                },
                "_metadata": {
                    "requestId": request_id,
                    "duration": processing_time
                }
            }
        return response
    except Exception as e:
        # Log the error (would use a proper logger in production)
        print(f"Error in mirror analysis: {str(e)}")
        # Return error response
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to analyze: {str(e)}"
        )

@router.get("/mirror/stats", response_model=Dict[str, Any])
async def get_mirror_stats(
    user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Get statistics about the mirror service
    """
    # Mock statistics
    return {
        "success": True,
        "data": {
            "total_analyses": 42,
            "user_analyses": 5,
            "average_processing_time": 0.8
        },
        "_metadata": {
            "requestId": str(uuid.uuid4()),
            "userId": user.get("uid", "unknown")
        }
    }
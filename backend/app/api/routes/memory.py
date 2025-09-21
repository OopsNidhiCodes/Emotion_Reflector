from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional, Dict, Any
import time
import uuid

from app.core.auth import get_current_user
from app.models.memory import MemoryRequest, MemoryResponse

router = APIRouter(tags=["memory"])

@router.post("/memory", response_model=Dict[str, Any])
async def process_memory(
    request: MemoryRequest,
    user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Process a memory/achievement
    """
    # Generate a request ID for tracking
    request_id = str(uuid.uuid4())
    start_time = time.time()
    
    try:
        # Extract user ID from Firebase token
        user_id = user.get("uid", "unknown")
        
        # In a real implementation, this would store the achievement in a database
        # For now, we'll just return a success response
        
        # Calculate processing time
        processing_time = time.time() - start_time
        
        # Construct response
        response = {
            "success": True,
            "data": {
                "id": str(uuid.uuid4()),  # Mock ID for the stored achievement
                "title": request.title,
                "description": request.description,
                "category": request.category,
                "createdAt": time.time()
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
        print(f"Error in memory processing: {str(e)}")
        
        # Return error response
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process memory: {str(e)}"
        )
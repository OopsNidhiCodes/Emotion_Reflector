from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import time
import uuid
from typing import Optional, List, Dict, Any

from app.api.routes import mirror, mentor, memory
from app.core.config import settings
from app.core.auth import get_current_user

app = FastAPI(
    title="Reality Reflector API",
    description="Backend API for Reality Reflector application",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(mirror.router, prefix="/api/v1")
app.include_router(mentor.router, prefix="/api/v1")
app.include_router(memory.router, prefix="/api/v1")

@app.get("/")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "version": app.version
    }

@app.get("/api/v1")
async def api_root():
    """API root endpoint"""
    return {
        "message": "Welcome to Reality Reflector API",
        "version": app.version,
        "docs_url": "/docs"
    }

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom exception handler for HTTP exceptions"""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
            "status_code": exc.status_code,
            "_metadata": {
                "requestId": str(uuid.uuid4()),
                "timestamp": time.time()
            }
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """General exception handler"""
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "error": "Internal server error",
            "message": str(exc),
            "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "_metadata": {
                "requestId": str(uuid.uuid4()),
                "timestamp": time.time()
            }
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
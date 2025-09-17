from services.firebase_service import verify_user_token
from fastapi import HTTPException, Header

def get_current_user(authorization: str = Header(...)):
    """ Extract UID from firebase token in Authorization header."""
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    
    token = authorization.split("Bearer ")[1]
    uid = verify_user_token(token)
    if not uid:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    return uid
from fastapi import FastAPI
from routes import mirror, memory, mentor

app = FastAPI(title="Memory-Mirror API", version="1.0.0")

app.include_router(mirror.router,prefix="/api", tags=["Mirror"])
app.include_router(memory.router,prefix="/api", tags=["Memory Lane"])
app.include_router(mentor.router,prefix="/api", tags=["Mentor"])

@app.get("/")
def root():
    return {"message": "Welcome to the Memory-Mirror API!"}
# Reality Reflector Backend

A FastAPI backend for the Reality Reflector application that provides API endpoints for Mirror, Mentor, and Memory features.

## Features

- **Mirror API**: Analyze and reframe negative thoughts
- **Mentor API**: Get AI-powered mentorship advice
- **Memory API**: Store and manage personal achievements
- **Firebase Authentication**: Secure API endpoints with Firebase Auth

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Configure Firebase:
   - Create a Firebase project (if not already done)
   - Generate a service account key from Firebase console
   - Update the `.env` file with your Firebase credentials

3. Run the server:
   ```bash
   python run.py
   ```

## API Endpoints

### Mirror
- `POST /api/v1/mirror` - Analyze negative thoughts
- `GET /api/v1/mirror/stats` - Get mirror usage statistics

### Mentor
- `POST /api/v1/mentor/chat` - Get mentorship advice

### Memory
- `POST /api/v1/memory` - Store a new achievement

## Environment Variables

Create a `.env` file with the following variables:

```
# Backend API Configuration
API_PORT=8000
API_HOST=0.0.0.0
DEBUG=True

# CORS Settings
CORS_ORIGINS=["http://localhost:5173", "http://localhost:4173"]

# Firebase Admin SDK Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account-email@project-id.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account-email%40project-id.iam.gserviceaccount.com
```

## Development

- API documentation is available at `/docs` when the server is running
- For local development, set `DEBUG=True` in your `.env` file
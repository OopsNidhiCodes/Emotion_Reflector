# Environment Configuration Guide

This guide explains how to set up environment variables for the Reality Reflector frontend application.

## Overview

The application uses Vite's environment variable system. All environment variables must be prefixed with `VITE_` to be accessible in the browser.

## Environment Files

### `.env.example`
Template file with all available environment variables and their descriptions. **Never commit actual credentials to this file.**

### `.env.local` (Create this file)
Your local development environment variables with actual credentials. This file is gitignored and should contain your real Firebase and API credentials.

### `.env.development`
Default development configuration. Contains non-sensitive defaults for development.

## Required Setup Steps

### 1. Create Local Environment File

```bash
cp .env.example .env.local
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Go to Project Settings > General > Your apps
4. Copy the Firebase configuration values
5. Update `.env.local` with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 3. Configure Python Backend API

Update the API configuration in `.env.local`:

```env
# For local Python backend
VITE_API_BASE_URL=http://localhost:8000/api

# For remote Python backend
VITE_API_BASE_URL=https://your-backend-domain.com/api

# Request timeout (optional)
VITE_API_TIMEOUT=10000
```

## Environment Variables Reference

### Firebase Configuration
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | `AIzaSyC...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | `myapp.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | `myapp-12345` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | `myapp.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | `123456789` |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | `1:123:web:abc123` |

### Python Backend API Configuration
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Base URL for Python backend API | `http://localhost:8000/api` |
| `VITE_API_TIMEOUT` | Request timeout in milliseconds | `10000` |

### Development Configuration
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_DEBUG_API` | Enable API request/response logging | `true` |

## Different Environments

### Development
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_DEBUG_API=true
```

### Staging
```env
VITE_API_BASE_URL=https://staging-api.yourapp.com/api
VITE_DEBUG_API=false
```

### Production
```env
VITE_API_BASE_URL=https://api.yourapp.com/api
VITE_DEBUG_API=false
```

## Security Notes

1. **Never commit `.env.local`** - It contains sensitive credentials
2. **Use different Firebase projects** for development, staging, and production
3. **Rotate API keys regularly** in production environments
4. **Use HTTPS** for all production API endpoints

## Troubleshooting

### Firebase Connection Issues
- Verify all Firebase environment variables are set correctly
- Check Firebase project settings match your configuration
- Ensure Firebase Authentication and Firestore are enabled

### API Connection Issues
- Verify `VITE_API_BASE_URL` points to your running Python backend
- Check CORS configuration on your Python backend
- Ensure the backend API is running and accessible

### Environment Variables Not Loading
- Ensure variables are prefixed with `VITE_`
- Restart the development server after changing environment variables
- Check that `.env.local` exists and contains the variables
# Reality Reflector Frontend

A React + Vite frontend application that helps users challenge negative thoughts, store achievements, and get AI-powered mentorship advice.

## Features

- **Reality Mirror**: Analyze and reframe negative thoughts with evidence-based insights
- **Memory Palace**: Store and celebrate personal achievements
- **AI Mentor**: Get personalized advice and guidance

## Tech Stack

- React 18 with React Router v6
- Vite for build tooling
- Firebase (Authentication + Firestore)
- Axios for API communication
- Plain CSS (no frameworks)

## Setup

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Copy `.env.example` to `.env` and fill in your configuration:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. Configure your environment variables:
   - `VITE_API_URL`: Your FastAPI backend URL
   - Firebase configuration keys

5. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Environment Variables

Create a `.env` file with the following variables:

\`\`\`env
VITE_API_URL=http://localhost:8000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
\`\`\`

## API Integration

The app integrates with a FastAPI backend with the following endpoints:

- `POST /mirror` - Analyze negative thoughts
- `POST /mentor` - Get AI mentorship advice
- `POST /memory/*` - Memory-related endpoints (if needed)

All API calls include Firebase ID tokens for authentication.

## Firebase Setup

1. Create a Firebase project
2. Enable Authentication (Google provider)
3. Enable Firestore Database
4. Add your web app configuration to the environment variables

## Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
├── routes/             # Page components
├── services/           # API and Firebase services
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── models/             # Data schemas and validation
└── styles/             # CSS styles
\`\`\`

## Building for Production

\`\`\`bash
npm run build
\`\`\`

The built files will be in the `dist` directory.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

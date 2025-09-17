# Reality Reflector Frontend

A React application for cognitive behavioral therapy and thought reframing.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **CSS3** - Styling with custom design system
- **Vitest** - Testing framework

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── ui/        # Base UI components
│   │   ├── mirror/    # Mirror page components
│   │   ├── memory/    # Memory page components
│   │   └── mentor/    # Mentor page components
│   ├── routes/        # Page components
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API and external services
│   ├── styles/        # CSS files and design system
│   └── config/        # Configuration files
├── public/            # Static assets
├── docs/             # Documentation
└── package.json      # Dependencies and scripts
```

## 🎨 Features

- **Mirror Page**: Thought analysis and reframing
- **Memory Page**: Achievement tracking and management
- **Mentor Page**: AI-powered guidance and advice
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Accessibility**: WCAG AA compliant with proper contrast ratios
- **Modern UI**: Glassmorphism design with smooth animations

## 🔧 Development

### Environment Variables

Copy `.env.example` to `.env.development` and configure:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_GEMINI_API_KEY=your_gemini_key
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## 🌐 API Integration

The frontend integrates with the backend API for:
- User authentication
- Data persistence
- AI-powered features

## 📱 Responsive Breakpoints

- **Mobile**: ≤768px
- **Tablet**: 769px-1024px  
- **Desktop**: >1024px

## 🧪 Testing

Tests are located in `src/**/__tests__/` and use Vitest with React Testing Library.

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

Build the project and serve the `dist` folder:

```bash
npm run build
# Serve the dist folder with your preferred static file server
```

## 📄 License

This project is part of the Reality Reflector application.
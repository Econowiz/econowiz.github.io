# Portfolio Project Overview

## Purpose
A modern, personal portfolio website built as a single-page application showcasing professional work, skills, and contact information. The portfolio focuses on financial analytics, business intelligence, and process automation projects.

## Tech Stack
- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 3.4.17 with custom design system
- **Animations**: Framer Motion 12.23.12
- **Routing**: React Router DOM 7.8.2
- **Form Handling**: React Hook Form 7.62.0
- **Email Service**: EmailJS 4.4.1
- **Package Manager**: pnpm (with lockfile)
- **Linting**: ESLint 9.33.0 with TypeScript ESLint
- **Icons**: Heroicons, React Icons, Lucide React

## Key Features
- Responsive design with mobile-first approach
- URL-based routing with deep linking support
- Contact form with EmailJS integration and bot protection
- Animated components and smooth transitions
- Custom design system with dark theme
- Error boundaries for graceful error handling
- TypeScript strict mode with comprehensive type safety
- Environment variable validation for production builds

## Project Structure
```
src/
├── components/
│   ├── sections/        # Main page sections (About, Portfolio, Blog, Contact)
│   ├── shared/          # Reusable UI components
│   ├── decor/           # Decorative and animation components
│   ├── ui/              # Basic UI components
│   └── *.tsx            # Layout and navigation components
├── utils/               # Utility functions
├── lib/                 # Core utilities (cn function)
├── assets/              # Static assets
└── App.tsx             # Main application component
```

## Development Environment
- **OS**: Darwin (macOS)
- **Node**: Modern ES modules (type: "module")
- **TypeScript**: ~5.8.3 with strict configuration
- **Path Aliases**: `@/*` mapped to `src/*`
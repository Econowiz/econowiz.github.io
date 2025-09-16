# Code Style and Conventions

## TypeScript Configuration
- **Strict Mode**: Enabled with comprehensive type checking
- **No Unused Locals**: Enforced to prevent dead code
- **No Unused Parameters**: Enforced for clean function signatures
- **Path Aliases**: Use `@/` for imports from `src/` directory
- **JSX**: React JSX transform (no React import needed)

## Component Conventions
- **Functional Components**: Use function declarations with TypeScript
- **Props Interface**: Always define TypeScript interfaces for props
- **Default Exports**: Use default exports for components
- **File Naming**: PascalCase for component files (e.g., `MainContent.tsx`)

## Import Organization
```typescript
// 1. React and hooks
import { useState, useEffect } from 'react'

// 2. Third-party libraries
import { motion } from 'framer-motion'
import { useLocation, useParams } from 'react-router-dom'

// 3. Internal components
import Navigation from './Navigation'
import About from './sections/About'

// 4. Utils and libraries
import { cn } from '@/lib/utils'
```

## Styling Conventions
- **Tailwind CSS**: Primary styling method with custom design system
- **Custom Colors**: Use semantic color names (e.g., `eerie-black-1`, `orange-yellow`)
- **Responsive Design**: Mobile-first approach with `lg:` and `md:` breakpoints
- **Class Utilities**: Use `cn()` utility for conditional classes

## Component Structure
```typescript
interface ComponentProps {
  // Props with descriptive types
}

const Component = ({ prop1, prop2 }: ComponentProps) => {
  // 1. State declarations
  const [state, setState] = useState()
  
  // 2. Effect hooks
  useEffect(() => {}, [])
  
  // 3. Event handlers
  const handleClick = () => {}
  
  // 4. Render helpers
  const renderContent = () => {}
  
  // 5. Return JSX
  return (
    <div className="responsive classes">
      {/* Content */}
    </div>
  )
}

export default Component
```

## Animation Patterns
- **Framer Motion**: Primary animation library
- **Page Transitions**: Use consistent motion patterns for route changes
- **Hover Effects**: Subtle scale and color transitions
- **Stagger Animations**: For lists and card grids

## Error Handling
- **Error Boundaries**: Wrap components that might fail
- **Graceful Degradation**: Provide fallbacks for external services
- **Console Logging**: Use for development debugging, remove for production

## State Management
- **Local State**: Use `useState` for component-specific state
- **URL State**: Use React Router for shareable state (active tabs, selected projects)
- **Props**: Pass state through props for simple parent-child communication

## Environment Variables
- **Naming**: Use `VITE_` prefix for client-side variables
- **Validation**: Always validate environment variables at build time
- **Security**: Never commit actual credentials to version control
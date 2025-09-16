# Suggested Commands for Portfolio Development

## Development Commands
```bash
# Start development server with hot reload
pnpm dev
```

## Build Commands
```bash
# Standard build for development/testing
pnpm build

# Production build with full environment validation
pnpm run build:prod

# GitHub Pages optimized build
pnpm run build:gh-pages

# Preview production build locally
pnpm preview
```

## Deployment Commands
```bash
# Deploy to GitHub Pages (manual)
pnpm run deploy

# Install gh-pages if needed
pnpm add -D gh-pages
```

## Validation and Quality Assurance
```bash
# Run ESLint for code quality checks
pnpm lint

# Validate environment variables
pnpm run validate-env

# Check TypeScript compilation
pnpm exec tsc --noEmit
```

## Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Copy production environment template
cp .env.production.example .env.production
```

## Package Management (pnpm only)
```bash
# Install dependencies
pnpm install

# Install with frozen lockfile (CI/CD)
pnpm install --frozen-lockfile

# Add new dependency
pnpm add <package-name>

# Add development dependency
pnpm add -D <package-name>

# Update dependencies
pnpm update

# Remove dependency
pnpm remove <package-name>
```

## Git and Project Management
```bash
# Standard git commands (Darwin/macOS)
git status
git add .
git commit -m "message"
git push

# View project files
ls -la
find . -name "*.tsx" -type f
grep -r "pattern" src/
```

## File Operations (Darwin/macOS)
```bash
# Navigate project
cd src/components
ls -la

# Find files
find . -name "*.tsx"
find . -type f -name "*Component*"

# Search content
grep -r "useState" src/
grep -l "framer-motion" src/**/*.tsx
```

## Debugging and Development
```bash
# Check bundle size (if needed)
du -sh dist/

# View environment variables
printenv | grep VITE_

# Check pnpm version
pnpm --version
```

## Testing Email Functionality
```bash
# Validate EmailJS configuration
pnpm run validate-env

# Test in development mode (allows placeholders)
pnpm dev

# Test production mode (requires real credentials)
pnpm run build:prod
```
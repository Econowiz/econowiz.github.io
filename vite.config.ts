import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'

// Simple environment validation for production builds
function validateProductionEnv() {
  // Only validate when explicitly building for production
  if (process.env.NODE_ENV === 'production' && process.env.VALIDATE_ENV === 'true') {
    const requiredVars = [
      'VITE_EMAILJS_SERVICE_ID',
      'VITE_EMAILJS_TEMPLATE_ID',
      'VITE_EMAILJS_PUBLIC_KEY'
    ]

    const placeholders = [
      'service_placeholder',
      'template_placeholder',
      'public_key_placeholder',
      'your_service_id_here',
      'your_template_id_here',
      'your_public_key_here'
    ]

    const errors: string[] = []

    for (const varName of requiredVars) {
      const value = process.env[varName]
      if (!value) {
        errors.push(`${varName} is required but not set`)
      } else if (placeholders.includes(value)) {
        errors.push(`${varName} contains placeholder value: "${value}"`)
      }
    }

    if (errors.length > 0) {
      console.error('\n❌ Environment validation failed:')
      errors.forEach(error => console.error(`   ${error}`))
      console.error('\n📖 For setup instructions, see EMAILJS_SETUP.md')
      throw new Error('Environment validation failed')
    }

    console.log('✅ Environment variables validated successfully')
  }
}

// Environment validation plugin
function envValidationPlugin() {
  return {
    name: 'env-validation',
    buildStart() {
      validateProductionEnv()
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    envValidationPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // GitHub Pages configuration
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  build: {
    // Ensure environment variables are available at build time
    rollupOptions: {
      external: [],
    },
  },
})

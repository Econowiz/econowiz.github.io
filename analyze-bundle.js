#!/usr/bin/env node

import { build } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { resolve } from 'path'

console.log('🔍 Starting Bundle Analysis...')

const config = {
  plugins: [
    visualizer({
      filename: 'bundle-analysis.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap'
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html')
      }
    }
  }
}

try {
  await build(config)
  console.log('✅ Bundle analysis complete! Check bundle-analysis.html')
} catch (error) {
  console.error('❌ Analysis failed:', error)
}

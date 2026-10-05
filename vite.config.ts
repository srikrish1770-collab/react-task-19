import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ensureFiles } from './scripts/ensureFiles.mjs'

export default defineConfig(() => {
  ensureFiles() // create fallbacks for any missing file before Vite resolves imports
  return { plugins: [react()] }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'create-nojekyll',
      writeBundle() {
        fs.writeFileSync('./docs/.nojekyll', '');
      }
    }
  ],
  build: {
    outDir: './docs',
    sourcemap: true
  },
  base: '/ResumeAppBot/'
});
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl(),
    {
      name: 'create-nojekyll',
      writeBundle() {
        fs.writeFileSync('./docs/.nojekyll', '');
      }
    }
  ],
  build: {
    outDir: './docs',
    sourcemap: true,
    assetsInlineLimit: 0
  },
  base: '/ResumeAppBot/',
  resolve: {
    alias: {
      // Если есть проблемы с импортами
    }
  }
});
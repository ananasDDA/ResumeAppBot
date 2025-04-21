import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'create-nojekyll-and-cname',
      closeBundle() {
        const outDir = path.resolve(__dirname, 'docs');
        fs.writeFileSync(path.resolve(outDir, '.nojekyll'), '');
        // Also copy 404.html to the output directory
        if (fs.existsSync(path.resolve(__dirname, 'public', '404.html'))) {
          fs.copyFileSync(
            path.resolve(__dirname, 'public', '404.html'),
            path.resolve(outDir, '404.html')
          );
        }
      }
    }
  ],
  build: {
    outDir: 'docs'
  },
  base: '/ResumeAppBot/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
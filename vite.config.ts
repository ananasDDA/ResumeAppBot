import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'create-nojekyll-and-cname',
      closeBundle() {
        const outDir = resolve(__dirname, 'docs');
        fs.writeFileSync(resolve(outDir, '.nojekyll'), '');
        // Also copy 404.html to the output directory
        if (fs.existsSync(resolve(__dirname, 'public', '404.html'))) {
          fs.copyFileSync(
            resolve(__dirname, 'public', '404.html'),
            resolve(outDir, '404.html')
          );
        }
      }
    }
  ],
  build: {
    outDir: 'docs'
  },
  base: '/ResumeAppBot/'
});
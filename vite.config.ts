import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '.',
        }
      ],
    }),
  ],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: './index.html',
        devtools: './devtools.html',
        panel: './panel.html',
        background: './src/devtools/background.ts',
        content: './src/devtools/content.ts',
      },
      output: {
        entryFileNames: '[name].js', // Ensures each entry gets a unique name
      }
    },
  },
});
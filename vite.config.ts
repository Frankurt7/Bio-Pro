import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: 'BioEvo: Tu Evolución Corporal',
          short_name: 'BioEvo',
          description: 'Seguimiento de composición corporal y bio-avatar 3D',
          theme_color: '#050a14',
          background_color: '#050a14',
          display: 'standalone',
          orientation: 'portrait',
          icons: [
            {
              src: 'https://api.dicebear.com/7.x/shapes/svg?seed=BioEvoApp&backgroundColor=050a14&shapeColor=00f2ff',
              sizes: '192x192',
              type: 'image/svg+xml',
              purpose: 'any'
            },
            {
              src: 'https://api.dicebear.com/7.x/shapes/svg?seed=BioEvoApp&backgroundColor=050a14&shapeColor=00f2ff',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'any'
            },
            {
              src: 'https://api.dicebear.com/7.x/shapes/svg?seed=BioEvoApp&backgroundColor=050a14&shapeColor=00f2ff',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'maskable'
            }
          ]
        }
      })
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});

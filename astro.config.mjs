// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';

export default defineConfig({
  output: 'server',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react(), keystatic()],
  adapter: cloudflare({ platformProxy: { enabled: true } }),
});

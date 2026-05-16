// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import keystatic from '@keystatic/astro';

export default defineConfig({
  output: 'server',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [keystatic()],
  adapter: cloudflare(),
});

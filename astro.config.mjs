import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sidbbrowser.com',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});


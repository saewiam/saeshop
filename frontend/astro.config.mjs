// @ts-check
import { defineConfig, envField } from 'astro/config'

import cloudflare from '@astrojs/cloudflare'

import react from '@astrojs/react';

export default defineConfig({
  site: process.env.FRONTEND_SITE_URL || 'http://saeshop.localhost',

  env: {
      schema: {
          STRIPE_SECRET_KEY: envField.string({
              context: 'server',
              access: 'secret',
              optional: false,
          }),
          STRIPE_PUBLISHABLE_KEY: envField.string({
              context: 'client',
              access: 'public',
              optional: false,
          }),
          FRONTEND_SITE_URL: envField.string({
              context: 'client',
              access: 'public',
              optional: true,
          }),
      },
  },

  adapter: cloudflare(),
  integrations: [react()],
})
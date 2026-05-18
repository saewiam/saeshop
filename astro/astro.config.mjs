// @ts-check
import { defineConfig } from 'astro/config'

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [
      {
          name: 'dev-server-dynamic-render',
          hooks: {
              'astro:config:setup': (config) => {
                  if (config.command === 'dev') {
                      config.updateConfig({
                          output: 'server',
                      })
                  }
              },
          },
      },
  ],

  adapter: cloudflare(),
})
import { satteri } from '@astrojs/markdown-satteri'
import expressiveCode from 'astro-expressive-code'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import satteriCallouts from 'satteri-callouts'

export default defineConfig({
  integrations: [icon(), expressiveCode()],
  markdown: {
    processor: satteri({
      features: {
        attributes: true,
      },
      hastPlugins: [
        // @ts-expect-error
        satteriCallouts(),
      ],
    }),
  },
})

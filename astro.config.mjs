// @ts-check
import expressiveCode from 'astro-expressive-code'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import { h } from 'hastscript'
import remarkDirective from 'remark-directive'
import remarkGithubAdmonitionsToDirectives, {
  DEFAULT_MAPPING,
} from 'remark-github-admonitions-to-directives'
import remarkToc from 'remark-toc'
import { visit } from 'unist-util-visit'

export default defineConfig({
  integrations: [
    icon(),
    expressiveCode({
      themes: ['catppuccin-frappe', 'catppuccin-latte'],
      styleOverrides: {
        borderColor: 'var(--palette-neutral-border)',
        borderWidth: '1px',
        frames: { frameBoxShadowCssValue: 'none' },
      },
    }),
  ],
  markdown: {
    remarkPlugins: [
      [remarkToc, { heading: 'Inhalt' }],
      [remarkGithubAdmonitionsToDirectives, { mapping: DEFAULT_MAPPING }],
      [remarkDirective, {}],
      [
        () => (tree) => {
          visit(tree, (node) => {
            if (node.type === 'containerDirective') {
              const hast = h(node.name, node.attributes || {})

              node.data ??= {}
              node.data.hName = 'div'
              node.data.hProperties = hast.properties
            }
          })
        },
        {},
      ],
    ],
  },
})

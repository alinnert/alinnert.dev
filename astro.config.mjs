// @ts-check
import { defineConfig } from 'astro/config'
import { h } from 'hastscript'
import remarkDirective from 'remark-directive'
import remarkGithubAdmonitionsToDirectives, {
  DEFAULT_MAPPING,
} from 'remark-github-admonitions-to-directives'
import { visit } from 'unist-util-visit'

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
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

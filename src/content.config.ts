import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

export const collections = {
  projects: defineCollection({
    loader: glob({ base: './src/data/projects', pattern: '*.md' }),
    schema: z.object({
      name: z.string(),
      type: z.enum(['frontend', 'library']),
      languages: z.array(z.string()),
      styles: z.array(z.string()).nullable(),
      frameworks: z.array(z.string()).nullable(),
      libraries: z.array(z.string()).nullable(),
    }),
  }),
}

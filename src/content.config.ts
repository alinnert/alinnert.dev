import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

export const collections = {
  blog: defineCollection({
    loader: glob({ base: './src/data/blog', pattern: '*.md' }),
    schema: z.object({
      title: z.string(),
      published: z.date(),
      topics: z.array(z.string()).optional(),
      followUpLinks: z
        .array(
          z.object({
            label: z.string(),
            url: z.string().url(),
          }),
        )
        .optional(),
    }),
  }),
  projects: defineCollection({
    loader: glob({ base: './src/data/projects', pattern: '*.md' }),
    schema: z.object({
      name: z.string(),
      type: z.enum(['frontend', 'library']),
      languages: z.array(z.string()),
      styles: z.array(z.string()).optional(),
      frameworks: z.array(z.string()).optional(),
      libraries: z.array(z.string()).optional(),
      repository: z.string().optional(),
    }),
  }),
}

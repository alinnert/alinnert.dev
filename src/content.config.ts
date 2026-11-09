import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

export const collections = {
  artikel: defineCollection({
    loader: glob({ base: './content/artikel', pattern: '*.md' }),
    schema: z.object({
      title: z.string(),
      published: z.date(),
      topics: z.array(z.string()).optional(),
      followUpLinks: z
        .array(z.object({ label: z.string(), url: z.url() }))
        .optional(),
    }),
  }),
  projekte: defineCollection({
    loader: glob({ base: './content/projekte', pattern: '*.md' }),
    schema: z.object({
      name: z.string(),
      type: z.enum(['frontend', 'library', 'website']),
      description: z.string().optional(),
      languages: z.array(z.string()),
      styles: z.array(z.string()).optional(),
      frameworks: z.array(z.string()).optional(),
      libraries: z.array(z.string()).optional(),
      repository: z.string().optional(),
      website: z.string().optional(),
    }),
  }),
}

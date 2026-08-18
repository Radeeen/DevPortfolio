import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/**.md',
      schema: z.object({
        summary: z.string(),
        date: z.string(),
        tags: z.array(z.enum(['fullstack', 'data-ml', 'ui-ux'])).min(1),
        role: z.string(),
        team: z.string().optional(),
        stack: z.array(z.string()).min(1),
        metrics: z
          .array(z.object({ value: z.string(), label: z.string() }))
          .default([]),
        featured: z.boolean().default(false),
        cover: z.string().optional(),
        confidential: z.boolean().default(false),
        repo: z.string().optional(),
        demo: z.string().optional(),
        published: z.string().optional(),
      }),
    }),
  },
})

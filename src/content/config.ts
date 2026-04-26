import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    excerpt: z.string(),
    readTime: z.number(),
    pinned: z.boolean().default(false),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    series: z.string().optional(),
  }),
});

export const collections = { posts };

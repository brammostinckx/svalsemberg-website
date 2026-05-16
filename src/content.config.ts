import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const nieuws = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/nieuws' }),
  schema: z.object({
    titel: z.string(),
    datum: z.string(),
    tag: z.string(),
    samenvatting: z.string(),
    uitgelicht: z.boolean().default(false),
    gepubliceerd: z.boolean().default(true),
    link: z.string().url().optional(),
    internalLink: z.string().optional(),
    flyer: z.string().optional(),
  }),
});

export const collections = { nieuws };

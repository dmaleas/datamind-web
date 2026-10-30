import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Service pages (hard disks, SSD, RAID...). The file name is the URL:
// services/raid.md -> /raid/   and   services-en/data-recovery-raid.md -> /en/data-recovery-raid/
const serviceSchema = z.object({
    title: z.string(), // H1 on the page
    seoTitle: z.string(), // <title> shown in Google
    description: z.string(), // meta description shown in Google
    cardTitle: z.string(), // short name for menus and cards
    cardText: z.string(), // one line under the card on the homepage
    intro: z.string(),
    order: z.number(),
    pricing: z.string().optional(), // id of a group in src/data/pricing.json
    slug: z.string().optional(), // only used by Pages CMS to name new files
    image: z.string().optional(),
});
const services = defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/services' }), schema: serviceSchema });
const servicesEn = defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/services-en' }), schema: serviceSchema });

// Blog posts. The file name is the URL: ssd-defragmentation.md -> /ssd-defragmentation/
const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    slug: z.string().optional(), // only used by Pages CMS to name new files
    draft: z.boolean().default(false),
  }),
});

// Free-text pages (company, recovery process...), Greek and English.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
  }),
});

export const collections = { services, servicesEn, blog, pages };

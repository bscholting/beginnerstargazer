import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// ── Shared base schema ───────────────────────────────────────
const baseSchema = z.object({
  title: z.string(),
  description: z.string().max(160),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default("BeginnerStargazer Team"),
  draft: z.boolean().default(false),
  image: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
});

// ── Reviews ──────────────────────────────────────────────────
const reviews = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/reviews" }),
  schema: baseSchema.extend({
    productName: z.string(),
    productType: z.enum([
      "telescope",
      "mount",
      "eyepiece",
      "accessory",
      "camera",
      "binoculars",
    ]),
    brand: z.string(),
    price: z.number(),
    priceRange: z.enum(["budget", "mid-range", "premium"]),
    rating: z.number().min(1).max(5),
    verdict: z.enum(["recommended", "good-value", "avoid", "best-in-class"]),
    affiliateUrl: z.string().url(),
    affiliateStore: z.string().default("Amazon"),
    whoIsItFor: z.string(),
    whoShouldSkip: z.string(),
    bestAlternative: z.string().optional(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    specs: z
      .object({
        aperture: z.string().optional(),
        focalLength: z.string().optional(),
        focalRatio: z.string().optional(),
        mount: z.string().optional(),
        weight: z.string().optional(),
        bestFor: z.string().optional(),
      })
      .optional(),
  }),
});

// ── Posts (guides, how-to, comparisons) ─────────────────────
const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: baseSchema.extend({
    category: z.enum([
      "buying-guide",
      "how-to",
      "what-can-you-see",
      "stargazing-guide",
      "astrophotography",
      "comparison",
      "worth-it",
    ]),
    tags: z.array(z.string()).default([]),
    readingTime: z.number().optional(),
    featured: z.boolean().default(false),
    relatedPosts: z.array(z.string()).default([]),
  }),
});

// ── Comparisons ──────────────────────────────────────────────
const comparisons = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/comparisons" }),
  schema: baseSchema.extend({
    compareA: z.string(),
    compareB: z.string(),
    verdict: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { reviews, posts, comparisons };

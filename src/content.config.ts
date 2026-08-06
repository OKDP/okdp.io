import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { z } from "astro/zod";

const localizedField = z.union([
  z.string(),
  z.object({
    fr: z.string().optional(),
    en: z.string().optional(),
  }),
]);

const eventDate = z.union([
  z.string(),
  z.object({
    start: z.string(),
    end: z.string().optional(),
  }),
]);

const events = defineCollection({
  loader: file("src/data/events.yaml"),
  schema: z.object({
    id: z.string(),
    date: eventDate,
    title: localizedField,
    description: localizedField.optional(),
    location: localizedField.optional(),
    source: z.string().optional(),
  }),
});

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  events,
};

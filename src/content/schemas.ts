import { z } from "astro:content";

export const ContentSchema = z.object({
  content: z.string(),
});

export const DescriptionSchema = z.object({
  description: z.string(),
});

export const PostContentSchema = z.object({
  en: z.object({
    title: z.string(),
    content: z.string(),
  }),
  ru: z.object({
    title: z.string(),
    content: z.string(),
  }),
});

// DB Models => Collections
export const RoleSchema = z.object({
  id: z.string(),
  content: z.object({
    en: ContentSchema,
    ru: ContentSchema,
  }),
  created: z.string(),
  updated: z.string(),
});

export const ToolSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  icon: z.string().min(1),
  url: z.string().url(),
  created: z.string(),
  updated: z.string(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  url: z.string().url().optional(),
  started: z.string(),
  tools: z.array(z.string()),
  images: z.array(z.string()),
  title: z.string(),
  content: z.object({
    en: DescriptionSchema,
    ru: DescriptionSchema,
  }),
  created: z.string(),
  updated: z.string(),
  expand: z.object({
    tools: z.array(ToolSchema),
  }),
});

export const PostSchema = z.object({
  id: z.string(),
  images: z.array(z.string()),
  content: PostContentSchema,
  created: z.string(),
  updated: z.string(),
});

export const ValueSchema = z.object({
  id: z.string(),
  content: z.object({
    en: ContentSchema,
    ru: ContentSchema,
  }),
  created: z.string(),
  updated: z.string(),
});

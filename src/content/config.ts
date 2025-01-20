import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { getAdminPB } from "../server/pb";
import { PostSchema, ProjectSchema, RoleSchema, ValueSchema } from "./schemas";

const adminPB = await getAdminPB();

const portraits = defineCollection({
  loader: glob({ pattern: "**/*.jpg", base: "./src/assets/images/portraits" }),
  schema: z.string().url(),
});

const posts = defineCollection({
  loader: async () => {
    const posts = await adminPB.collection("posts").getFullList();
    return posts;
  },
  schema: PostSchema,
});

const projects = defineCollection({
  loader: async () => {
    const projects = await adminPB
      .collection("projects")
      .getFullList({ expand: "tools" });
    return projects;
  },
  schema: ProjectSchema,
});

const roles = defineCollection({
  loader: async () => {
    const roles = await adminPB.collection("roles").getFullList();
    return roles;
  },
  schema: RoleSchema,
});

const values = defineCollection({
  loader: async () => {
    const values = await adminPB.collection("values").getFullList();
    return values;
  },
  schema: ValueSchema,
});

export const collections = { posts, projects, roles, values };

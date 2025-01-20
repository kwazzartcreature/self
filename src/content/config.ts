import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { getAdminPB } from "../server/pb";
import { PostSchema, ProjectSchema, RoleSchema, ValueSchema } from "./schemas";

const adminPB = await getAdminPB();

const portraits = defineCollection({
  loader: async () => {
    const portraits = await adminPB.collection("portraits").getFullList();
    return portraits.map((portrait) => {
      return {
        id: portrait.id,
        url: adminPB.files.getURL(portrait, portrait.image),
      };
    });
  },
  schema: z.object({ url: z.string().url() }),
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

export const collections = { portraits, posts, projects, roles, values };

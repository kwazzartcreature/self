import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";
import { getAdminPB } from "../server/pb";
import {
  PostSchema,
  ProjectSchema,
  RoleSchema,
  ToolSchema,
  ValueSchema,
} from "./schemas";

const adminPB = await getAdminPB();

const portraits = defineCollection({
  loader: async () => {
    const portraits = await adminPB.collection("portraits").getFullList();
    return portraits.map((portrait) => {
      return {
        id: portrait.id,
        url: adminPB.files.getURL(portrait, portrait.image, {
          thumb: "200x200",
        }),
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

const tools = defineCollection({
  loader: async () => {
    const tools = await adminPB.collection("tools").getFullList();
    return tools;
  },
  schema: ToolSchema,
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

const socials = defineCollection({
  loader: async () => {
    const socials = await adminPB.collection("socials").getFullList();
    return socials;
  },
  schema: z.object({
    url: z.string().url(),
    icon: z.string(),
    name: z.string(),
  }),
});

const general = defineCollection({
  loader: file("src/content/general.json"),
});

export const collections = {
  portraits,
  posts,
  tools,
  projects,
  roles,
  values,
  socials,
  general,
};

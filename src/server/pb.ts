import PocketBase from "pocketbase";

export const adminPB = new PocketBase(import.meta.env.PB_URL);
adminPB
  .collection("_superusers")
  .authWithPassword(import.meta.env.PB_EMAIL, import.meta.env.PB_PASSWORD);

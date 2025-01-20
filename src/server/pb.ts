import { PB_URL, PB_EMAIL, PB_PASSWORD } from "astro:env/server";
import PocketBase from "pocketbase";

let adminPB: PocketBase | null = null;

export const getAdminPB = async () => {
  if (adminPB) return adminPB;
  const pb = new PocketBase(PB_URL);
  await pb.collection("_superusers").authWithPassword(PB_EMAIL, PB_PASSWORD);
  adminPB = pb;
  return pb;
};

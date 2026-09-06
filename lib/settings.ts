// lib/settings.ts
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getSetting = unstable_cache(
  async (key: string, defaultValue: string = ""): Promise<string> => {
    try {
      const setting = await prisma.setting.findUnique({
        where: { key },
      });
      return setting ? setting.value : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  ["site-setting"],
  { tags: ["settings"] }
);

export async function getProfileImageUrl(): Promise<string> {
  const url = await getSetting("profileImageUrl", "/images/profile.jpg");
  return url || "/images/profile.jpg";
}

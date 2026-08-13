import "server-only";

import { prisma } from "@/lib/prisma";
import {
  ANNOUNCEMENT_KEY,
  DEFAULT_ANNOUNCEMENT,
} from "@/lib/site-settings";

export async function getAnnouncementText() {
  try {
    const row = await prisma.siteSetting.findUnique({
      where: { key: ANNOUNCEMENT_KEY },
      select: { value: true },
    });
    const value = row?.value.trim();
    return value || DEFAULT_ANNOUNCEMENT;
  } catch {
    return DEFAULT_ANNOUNCEMENT;
  }
}

import "server-only";

import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  decrypt,
  encrypt,
  type SessionPayload,
} from "@/lib/session-crypto";

export type { SessionPayload };
export { COOKIE_NAME, decrypt };

export async function createSession(payload: SessionPayload) {
  const token = await encrypt(payload);
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function deleteSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function getSession() {
  const jar = await cookies();
  return decrypt(jar.get(COOKIE_NAME)?.value);
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return null;
  }
  return session;
}

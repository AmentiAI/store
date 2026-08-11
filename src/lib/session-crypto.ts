import { SignJWT, jwtVerify } from "jose";

export const COOKIE_NAME = "reup_session";
const EXPIRY = "7d";

export type SessionRole = "CUSTOMER" | "ADMIN";

export type SessionPayload = {
  userId: string;
  email: string;
  name: string;
  role: SessionRole;
};

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .sign(getSecret());
}

export async function decrypt(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: ["HS256"],
    });
    return {
      userId: String(payload.userId),
      email: String(payload.email),
      name: String(payload.name),
      role: payload.role as SessionRole,
    };
  } catch {
    return null;
  }
}

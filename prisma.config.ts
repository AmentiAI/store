import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prefer DIRECT_URL for migrations; fall back to DATABASE_URL so
// `prisma generate` works on Vercel when only DATABASE_URL is set.
const datasourceUrl =
  process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: datasourceUrl,
  },
});

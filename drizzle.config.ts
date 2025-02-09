import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle",
    schema: "./src/lib/server/db/schema.ts",
    dialect: "turso",
    dbCredentials: {
        url: process.env.TURSO_DATABASE_URL ?? "Missing TURSO_DATABASE_URL",
        authToken: process.env.TURSO_AUTH_TOKEN ?? "Missing TURSO_AUTH_TOKEN",
    },
});

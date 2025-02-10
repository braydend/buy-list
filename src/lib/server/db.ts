import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./db/schema";
import { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from "$env/static/private";

export const db = drizzle({
    connection: {
        url: TURSO_DATABASE_URL ?? "Missing TURSO_DATABASE_URL",
        authToken: TURSO_AUTH_TOKEN ?? "Missing TURSO_AUTH_TOKEN",
    },
    schema,
});

import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    email: text().notNull().unique(),
});

export const itemsTable = sqliteTable("items_table", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    tags: text({ mode: "json" }).$type<string[]>().default([]).notNull(),
    price: int().notNull(),
    userId: int().references(() => usersTable.id),
});

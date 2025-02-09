import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    email: text().notNull().unique(),
});

export const userRelations = relations(usersTable, ({ many }) => ({
    items: many(itemsTable),
}));

export const itemsTable = sqliteTable("items_table", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    tags: text({ mode: "json" }).$type<string[]>().default([]).notNull(),
    price: int().notNull(),
    userId: int().references(() => usersTable.id),
});

export const itemRelations = relations(itemsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [itemsTable.userId],
        references: [usersTable.id],
    }),
}));

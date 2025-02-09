import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const usersTable = sqliteTable("users_table", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    email: text().notNull().unique(),
});

export const userRelations = relations(usersTable, ({ many }) => ({
    items: many(itemsTable),
}));

export const userInsertSchema = createInsertSchema(usersTable);

export const itemsTable = sqliteTable("items_table", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    tags: text({ mode: "json" }).$type<string[]>().default([]).notNull(),
    price: int().notNull(),
    userId: int().references(() => usersTable.id).notNull(),
});

export const itemRelations = relations(itemsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [itemsTable.userId],
        references: [usersTable.id],
    }),
}));

export const itemInsertSchema = createInsertSchema(itemsTable, {
    name: (value) =>
        value.min(1, "Name must contain at least 1 character").max(
            100,
            "Name must contain less than 100 characters",
        ),
    price: z.string().transform((value) => parseInt(value, 10)).pipe(
        z.number().nonnegative(),
    ),
    tags: z.array(z.string()).default([]),
});

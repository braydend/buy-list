import { relations, sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

const blamableFields = {
	createdAt: int({ mode: 'timestamp' })
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`),
	createdBy: int().notNull(),
	updatedAt: int({ mode: 'timestamp' })
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`)
		.$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
	updatedBy: int().notNull()
};

const deletableFields = {
	deletedAt: int({ mode: 'timestamp' }),
	deletedBy: int()
};

export const usersTable = sqliteTable('users_table', {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	email: text().notNull().unique()
});

export const userRelations = relations(usersTable, ({ many }) => ({
	items: many(itemsTable)
}));

export const userInsertSchema = createInsertSchema(usersTable);

export const itemsTable = sqliteTable('items_table', {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	tags: text({ mode: 'json' }).$type<string[]>().default([]).notNull(),
	price: int().notNull(),
	userId: int()
		.references(() => usersTable.id)
		.notNull(),
	...blamableFields,
	...deletableFields
});

export const itemRelations = relations(itemsTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [itemsTable.userId],
		references: [usersTable.id]
	})
}));

export const itemInsertSchema = createInsertSchema(itemsTable, {
	name: (value) =>
		value
			.min(1, 'Name must contain at least 1 character')
			.max(100, 'Name must contain less than 100 characters'),
	price: z
		.string()
		.transform((value) => parseInt(value, 10))
		.pipe(z.number().nonnegative()),
	tags: z.array(z.string()).default([])
});

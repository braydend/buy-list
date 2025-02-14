import { db } from '$lib/server/db';
import { itemInsertSchema, itemsTable, usersTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const actions = {
	// 	login: async ({ cookies, request }) => {
	// 	const data = await request.formData();
	// 	const email = data.get('email');
	// 	const password = data.get('password');

	// 	const user = await db.getUser(email);
	// 	cookies.set('sessionid', await db.createSession(user), { path: '/' });

	// 	return { success: true };
	// },
	addItem: async ({ request }) => {
		// TODO: Add proper users, sessions and tenancy checks
		let user = await db.query.usersTable.findFirst({
			where: eq(usersTable.id, 1)
		});

		if (!user) {
			[user] = await db
				.insert(usersTable)
				.values({
					name: 'Test',
					email: 'test@email.com'
				})
				.returning();
		}

		const data = await request.formData();
		const name = data.get('name');
		const tags = data.get('tags');
		const price = data.get('price');

		const item = {
			name,
			tags: tags?.toString().split(',') ?? [],
			price,
			userId: user.id,
			createdBy: user.id,
			updatedBy: user.id
		};

		const { data: validItem, success, error } = itemInsertSchema.safeParse(item);

		if (!success) {
			console.error(error);

			return {
				success: false,
				errors: error.errors.map(({ message, path }) => ({
					message,
					field: path.toString()
				})),
				formData: item
			};
		}

		await db.insert(itemsTable).values(validItem);

		return { success: true };
	}
};

export const load: PageServerLoad = async () => {
	const items = await db.query.itemsTable.findMany();

	return {
		items
	};
};

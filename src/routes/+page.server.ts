import { db } from "$lib/server/db";
import { itemsTable, usersTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

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
			where: eq(usersTable.id, 1),
		});

		if (!user) {
			[user] = await db.insert(usersTable).values({
				name: "Test",
				email: "test@email.com",
			}).returning();
		}

		const data = await request.formData();
		const name = data.get("name");
		const tags = data.get("tags");
		const price = data.get("price");
		if (!name?.toString()) {
			return { success: false, message: "Name is required" };
		}

		if (!price) {
			return { success: false, message: "Price is required" };
		}

		const item = {
			name: name.toString(),
			tags: tags?.toString().split(",") ?? [],
			price: parseFloat(price.toString()),
		};

		await db.insert(itemsTable).values({
			name: item.name,
			tags: item.tags,
			price: item.price,
			userId: user.id,
		});

		return { success: true };
	},
};

export const load: PageServerLoad = async () => {
	const items = await db.query.itemsTable.findMany();

	return {
		items,
	};
};

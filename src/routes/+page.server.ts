import type { Item } from "$lib/common/types/item";
import type { PageServerLoad } from "./$types";

const items: Item[] = [
	{
		name: "Shovel",
		tags: ["Garden", "Tool"],
		price: 20.00,
	},
	{ name: "Hammer", tags: ["Tool"], price: 15.32 },
];

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
		const data = await request.formData();
		const name = data.get("name");
		const tags = data.get("tags");
		const price = data.get("price");
		if (!name?.toString()) {
			return { success: false, message: "Name is required" };
		}

		const item = {
			name: name.toString(),
			tags: tags?.toString().split(",") ?? [],
			price: price ? parseFloat(price.toString()) : undefined,
		};

		console.log({ item });

		items.push(item);
		return { success: true };
	},
};

export const load: PageServerLoad = async () => {
	return {
		items,
	};
};

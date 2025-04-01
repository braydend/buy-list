import { expect, vitest, describe, it } from 'vitest';
import { actions } from './+page.server';
import { db } from '../lib/server/db';

describe('Page: /', () => {
	describe('Action: addItem', () => {
		it('adds an item with tags', async () => {
			const insertSpy = vitest.fn();
			vitest.spyOn(db, 'insert').mockReturnValue({
				values: insertSpy
			} as unknown as ReturnType<typeof db.insert>);

			await actions.addItem({
				request: {
					formData: async () => ({
						get: (key: string) => {
							switch (key) {
								case 'name':
									return 'Test Item';
								case 'tags':
									return 'tag1,tag2';
								case 'price':
									return '100';
							}
						}
					})
				}
			});

			expect(insertSpy).toHaveBeenCalledWith({
				name: 'Test Item',
				tags: ['tag1', 'tag2'],
				price: 100,
				userId: 1,
				createdBy: 1,
				updatedBy: 1
			});
		});
	});
});

<script lang="ts">
	import Dropdown from '$lib/client/components/Dropdown.svelte';
	import ItemList from '$lib/client/components/ItemList.svelte';
	import CreateItem from '$lib/client/forms/CreateItem.svelte';
	import type { Item } from '$lib/common/types/item';
	import Heading from '$lib/client/typography/Heading.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	const items = data.items || [];

	const allTags = new Set(items.flatMap((item) => item.tags));

	let tagFilter = $state('');

	let sort = $state<keyof Item>('name');

	let sortedItems = $derived.by(() => {
		switch (sort) {
			case 'price':
				return items.toSorted((a, b) => (a.price ?? 0) - (b.price ?? 0));
			case 'name':
				return items.toSorted((a, b) => a.name.localeCompare(b.name));
			case 'tags':
				return items.toSorted((a, b) =>
					a.tags.sort().join(',').localeCompare(b.tags.sort().join(','))
				);
			default:
				return items;
		}
	});

	let itemsToDisplay = $derived(
		tagFilter === '' ? sortedItems : sortedItems.filter((item) => item.tags.includes(tagFilter))
	);
</script>

<main class="p-4">
	<Heading level={1}>Buy list</Heading>
	<CreateItem success={form?.success} error={form?.message} />

	<div class="flex flex-row justify-between">
		<Dropdown
			label="Filter by tag:"
			bind:value={tagFilter}
			options={[{ value: '', label: 'All' }, ...allTags]}
		/>
		<Dropdown label="Sort by:" bind:value={sort} options={['name', 'tags', 'price']} />
	</div>

	<ItemList items={itemsToDisplay} />
</main>

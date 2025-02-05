<script lang="ts">
	import ItemList from '$lib/components/ItemList.svelte';
	import type { Item } from '$lib/types/item';
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

	let tags = $state<string[]>([]);

	function addTagField() {
		tags.push('');
	}
</script>

<h1>Buy list</h1>
<form action="?/addItem" method="post">
	<input type="text" name="name" placeholder="Item name" />
	{#each tags as tag, i}
		<input type="text" name="tag" placeholder="Tag" bind:value={tags[i]} />
	{/each}
	<input type="text" name="tags" hidden value={tags.join(',')} />
	<button type="button" onclick={addTagField}>Add tag</button>
	<input type="number" name="price" placeholder="Price (optional)" />
	<button type="submit">Add</button>
</form>

{#if form?.success}
	<p>Item created!</p>
{:else}
	<p style="color: red">{form?.message}</p>
{/if}

<div>
	<h2>Filters:</h2>
	<select name="tag-filter" id="tag-filter" bind:value={tagFilter}>
		<option value="">All</option>
		{#each allTags as tag}
			<option value={tag}>{tag}</option>
		{/each}
	</select>
</div>

<div>
	<label for="sort">Sort by:</label>
	<select name="sort" id="sort" bind:value={sort}>
		{#each ['name', 'tags', 'price'] as field}
			<option value={field}>{field}</option>
		{/each}
	</select>
</div>

<ItemList items={itemsToDisplay} />

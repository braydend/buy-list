<script lang="ts">
	import type { Item } from '$lib/common/types/item';
	import Tag from './Tag.svelte';

	const { items }: { items: Item[] } = $props();
	const currencyFormatter = (price: number) => {
		return `$${price}`;
		// TODO: look to use Intl
		// Intl.NumberFormat("IT", {currency: "EUR"}).format;
	};
</script>

<ul>
	{#each items as item}
		<div class="grid grid-cols-[100%100%] gap-8 overflow-x-scroll">
			<li class="flex flex-row border-b py-2">
				<span>{item.name}</span>
				<span class="flex flex-grow">
					{#each item.tags as tag, i}
						{#if i < 2}
							<Tag label={tag} />
						{:else}
							<Tag label={`+${item.tags.length - i}`} />
						{/if}
					{/each}
				</span>
				<span class="place-self-end">
					{item.price ? currencyFormatter(item.price) : '-'}
				</span>
			</li>
			<div class="bg-red-400">Delete</div>
		</div>
	{/each}
</ul>

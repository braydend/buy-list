<script lang="ts">
	import Button from '$lib/client/components/Button.svelte';
	import type { Item } from '$lib/common/types/item';
	import Input from '$lib/client/components/Input.svelte';

	const {
		success,
		errors,
		initialData
	}: { success?: boolean; errors?: { message: string; field: string }[]; initialData?: Item } =
		$props();

	let tags = $state<string[]>(initialData?.tags ?? []);
	let isCollapsed = $state(!Boolean(initialData));

	function addTagField() {
		tags.push('');
	}

	function handleClose() {
		tags = [];
		isCollapsed = true;
	}
</script>

<div class="flex flex-col gap-4">
	<Button
		type="button"
		onclick={() => {
			if (isCollapsed) {
				isCollapsed = !isCollapsed;
				return;
			}
			handleClose();
		}}
		extraClass="place-self-end mr-4"
	>
		<div class={`${!isCollapsed && 'rotate-45'} inline-block transition-all`}>+</div>
		Create Item
	</Button>

	<div
		class={`${isCollapsed ? ' invisible grid-rows-[0fr]' : 'grid-rows-[1fr]'} grid transition-[grid-template-rows]`}
	>
		<form
			action="?/addItem"
			method="post"
			class={`flex flex-col gap-4 overflow-hidden bg-slate-200 p-4`}
		>
			<Input
				type="text"
				name="name"
				placeholder="Item name"
				value={initialData?.name}
				error={errors?.find(({ field }) => field === 'name')?.message}
			/>
			<Input
				type="number"
				name="price"
				placeholder="Price"
				value={initialData?.price}
				error={errors?.find(({ field }) => field === 'price')?.message}
			/>
			{#each tags as _, i}
				<Input
					type="text"
					name="tag"
					placeholder="Tag"
					bind:value={tags[i]}
					error={errors?.find(({ field }) => field === 'tags')?.message}
				/>
			{/each}
			<input type="text" name="tags" hidden value={tags.join(',')} />
			<Button type="button" onclick={addTagField} extraClass="place-self-start">Add tag</Button>
			<div>
				<Button type="submit">Add</Button>
				<Button type="button" variant="red" onclick={handleClose}>Cancel</Button>
			</div>
		</form>
	</div>

	{#if success}
		<p>Item created!</p>
	{/if}
</div>

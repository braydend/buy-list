<script lang="ts">
	type Option = string | { value: unknown; label: string };

	let {
		label,
		options,
		value = $bindable()
	}: { label: string; options: Option[]; value: unknown } = $props();

	const isOptionString = (option: Option): option is string => {
		if (typeof option === 'string') return true;
		return false;
	};
</script>

<div class="flex flex-col">
	<label for="sort">{label}</label>
	<select name="sort" id="sort" bind:value>
		{#each options as option}
			{#if isOptionString(option)}
				<option value={option}>{option}</option>
			{:else}
				<option value={option.value}>{option.label}</option>
			{/if}
		{/each}
	</select>
</div>

<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = HTMLInputAttributes & {
		error?: string;
		name: Required<HTMLInputAttributes['name']>;
		type: Required<HTMLInputAttributes['type']>;
	};

	const { name, type, error, placeholder, value = $bindable(), ...props }: Props = $props();
</script>

<input {type} {name} {placeholder} {value} class={error && 'border border-red-400'} {...props} />

{#if error}
	<p style="color: red">{error}</p>
{/if}

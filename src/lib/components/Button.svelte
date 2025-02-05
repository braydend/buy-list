<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	type Props = Omit<HTMLButtonAttributes, 'class'> & {
		extraClass?: string;
		variant?: 'blue' | 'red' | 'green';
	};

	const { children, extraClass = '', variant = 'blue', ...props }: Props = $props();

	const backgroundColor = {
		blue: 'bg-blue-500',
		red: 'bg-red-500',
		green: 'bg-green-500'
	}[variant];
</script>

<button {...props} class={`rounded-md ${backgroundColor} px-4 py-2 text-white ${extraClass}`}>
	{@render children?.()}
</button>

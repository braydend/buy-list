<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children, level } = $props<{ level: 1 | 2 | 3 | 4 | 5; children: Snippet }>();
</script>

{#if level === 1}
	<h1 class="text-4xl font-bold">{@render children()}</h1>
{:else if level === 2}
	<h2 class="text-3xl font-bold">{@render children()}</h2>
{:else if level === 3}
	<h3 class="text-2xl font-bold">{@render children()}</h3>
{:else if level === 4}
	<h4 class="text-xl font-bold">{@render children()}</h4>
{:else if level === 5}
	<h5 class="text-lg font-bold">{@render children()}</h5>
{/if}

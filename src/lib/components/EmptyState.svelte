<script lang="ts">
	import type { Snippet } from 'svelte';

	/** Propriedades aceitas por {@link EmptyState}. */
	interface Props {
		/** Título curto que descreve a ausência de resultados. */
		title: string;
		/** Texto opcional exibido abaixo do título para explicar o estado. */
		description?: string;
		/** Snippet opcional para uma ação, como limpar um filtro. */
		children?: Snippet;
	}

	let { title, description, children }: Props = $props();
</script>

<div class="empty-state" role="status">
	<span class="empty-icon" aria-hidden="true">⌕</span>
	<h2>{title}</h2>
	{#if description}<p>{description}</p>{/if}
	{#if children}{@render children()}{/if}
</div>

<style>
	.empty-state {
		padding: 48px 20px;
		border: 1px dashed var(--border, #e5e7eb);
		border-radius: 14px;
		text-align: center;
	}

	.empty-icon {
		color: var(--text-muted, #737b8c);
		font-size: 2rem;
	}

	h2 {
		margin: 12px 0 8px;
		font-size: 1.1rem;
	}

	p {
		color: var(--text-muted, #737b8c);
	}

	:global(.empty-state button) {
		padding: 9px 14px;
		border: 0;
		border-radius: 8px;
		background: var(--accent, #5a33a5);
		color: white;
		cursor: pointer;
	}
</style>

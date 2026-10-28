<script lang="ts">
	import type { Snippet } from 'svelte';

	/** Propriedades aceitas por {@link PageHeader}. */
	interface Props {
		/** Rótulo opcional exibido acima do título. */
		eyebrow?: string;
		/** Título principal da página. */
		title: string;
		/** Descrição opcional exibida abaixo do título. */
		subtitle?: string;
		/** Snippet opcional exibido à direita, geralmente com botões ou indicadores. */
		actions?: Snippet;
	}

	let { eyebrow, title, subtitle, actions }: Props = $props();
</script>

<header class="page-header">
	<div>
		{#if eyebrow}<p class="eyebrow">{eyebrow}</p>{/if}
		<h1>{title}</h1>
		{#if subtitle}<p class="subtitle">{subtitle}</p>{/if}
	</div>
	{#if actions}{@render actions()}{/if}
</header>

<style>
	.page-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}

	.eyebrow {
		margin: 0 0 8px;
		color: var(--text-muted, #737b8c);
		font-size: 0.72rem;
		font-weight: 750;
		letter-spacing: 0.1em;
	}

	h1 {
		margin: 0;
		font-size: clamp(1.7rem, 4vw, 2.2rem);
		letter-spacing: -0.04em;
	}

	.subtitle {
		margin: 8px 0 0;
		color: var(--text-muted, #737b8c);
		font-size: 0.92rem;
		line-height: 1.6;
	}

	@media (max-width: 640px) {
		.page-header {
			align-items: flex-start;
		}
	}
</style>

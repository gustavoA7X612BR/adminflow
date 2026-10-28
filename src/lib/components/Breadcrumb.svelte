<script lang="ts">
	import type { ResolvedPathname } from '$app/types';

	/** Um segmento da trilha de navegação. */
	interface BreadcrumbItem {
		/** Texto exibido neste segmento. */
		label: string;
		/** Destino do segmento navegável; o segmento atual ignora este valor. */
		href?: ResolvedPathname;
	}

	/** Propriedades aceitas por {@link Breadcrumb}. */
	interface Props {
		/** Segmentos do caminho em ordem; o último é marcado como a página atual. */
		items: BreadcrumbItem[];
	}

	let { items }: Props = $props();
</script>

<nav aria-label="Breadcrumb" class="breadcrumbs">
	<ol>
		{#each items as item, index (index)}
			<li>
				{#if index > 0}<span class="slash" aria-hidden="true">/</span>{/if}
				{#if index === items.length - 1}
					<strong aria-current="page">{item.label}</strong>
				{:else if item.href}
					<a href={item.href}>{item.label}</a>
				{:else}
					<span>{item.label}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
	.breadcrumbs {
		display: flex;
		align-items: center;
		color: #969eac;
		font-size: 11px;
	}
	ol {
		display: flex;
		align-items: center;
		gap: 10px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	li {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	strong {
		color: #3c4659;
		font-weight: 600;
	}
	.slash {
		color: #c4c9d2;
	}

	@media (max-width: 760px) {
		.breadcrumbs {
			display: none;
		}
	}
</style>

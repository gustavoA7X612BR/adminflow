<script lang="ts">
	import type { PageProps } from './$types';
	import SearchInput from '$lib/components/SearchInput.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';

	let { data }: PageProps = $props();
	let search = $state('');

	let filteredPosts = $derived(
		data.posts.filter((post) => {
			const query = search.trim().toLowerCase();

			return post.title.toLowerCase().includes(query) || post.body.toLowerCase().includes(query);
		})
	);
</script>

<svelte:head>
	<title>Publicações | AdminFlow</title>
	<meta name="description" content="Consulte e pesquise as publicações do AdminFlow." />
</svelte:head>

<section class="posts-page">
	<PageHeader
		eyebrow="CONTEÚDO"
		title="Publicações"
		subtitle="Explore as publicações e consulte seus detalhes."
	>
		{#snippet actions()}
			<span class="post-count">
				{filteredPosts.length}
				{filteredPosts.length === 1 ? 'publicação' : 'publicações'}
			</span>
		{/snippet}
	</PageHeader>

	<div class="search-container">
		<SearchInput
			bind:value={search}
			placeholder="Buscar por título ou conteúdo..."
			label="Buscar publicações"
		/>

		{#if search}
			<button
				type="button"
				class="clear-button"
				aria-label="Limpar pesquisa"
				onclick={() => (search = '')}
			>
				×
			</button>
		{/if}
	</div>

	{#if filteredPosts.length > 0}
		<div class="posts-grid">
			{#each filteredPosts as post (post.id)}
				<PostCard {post} />
			{/each}
		</div>
	{:else}
		<EmptyState title="Nenhuma publicação encontrada" description="Tente outro termo de pesquisa.">
			{#if search}
				<button type="button" onclick={() => (search = '')}> Limpar pesquisa </button>
			{/if}
		</EmptyState>
	{/if}

	<footer class="page-footer">
		Exibindo {filteredPosts.length} de {data.posts.length} publicações
	</footer>
</section>

<style>
	.posts-page {
		display: flex;
		flex-direction: column;
		gap: 24px;
		padding: 32px;
		color: var(--text-primary, #172033);
	}

	.post-count {
		flex-shrink: 0;
		padding: 8px 12px;
		border: 1px solid var(--border, #e5e7eb);
		border-radius: 10px;
		background: var(--surface, #fff);
		font-size: 0.85rem;
		font-weight: 600;
	}

	.clear-button {
		border: 0;
		background: transparent;
		color: inherit;
		font-size: 1.4rem;
		cursor: pointer;
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 18px;
	}

	.page-footer {
		color: var(--text-muted, #737b8c);
		font-size: 0.82rem;
	}

	@media (max-width: 1000px) {
		.posts-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 640px) {
		.posts-page {
			padding: 22px 16px;
		}

		.posts-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

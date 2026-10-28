<script lang="ts">
	import type { PageProps } from './$types';
	import SearchInput from '$lib/components/SearchInput.svelte';

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
	<header class="page-header">
		<div>
			<p class="eyebrow">CONTEÚDO</p>
			<h1>Publicações</h1>
			<p class="subtitle">Explore as publicações e consulte seus detalhes.</p>
		</div>

		<span class="post-count">
			{filteredPosts.length}
			{filteredPosts.length === 1 ? 'publicação' : 'publicações'}
		</span>
	</header>

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
				<article class="post-card">
					<div class="card-top">
						<span class="post-id">POST #{post.id}</span>
						<span class="post-author">Usuário #{post.userId}</span>
					</div>

					<h2>{post.title}</h2>

					<p class="post-body">{post.body}</p>

					<a class="details-link" href={`/posts/${post.id}`}>
						Ver detalhes <span aria-hidden="true">→</span>
					</a>
				</article>
			{/each}
		</div>
	{:else}
		<div class="empty-state">
			<span class="empty-icon" aria-hidden="true">⌕</span>
			<h2>Nenhuma publicação encontrada</h2>
			<p>Tente outro termo de pesquisa.</p>

			{#if search}
				<button type="button" onclick={() => (search = '')}> Limpar pesquisa </button>
			{/if}
		</div>
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
		font-weight: 700;
		letter-spacing: 0.1em;
	}

	h1 {
		margin: 0;
		font-size: clamp(1.7rem, 4vw, 2rem);
		letter-spacing: -0.04em;
	}

	.subtitle {
		margin: 8px 0 0;
		color: var(--text-muted, #737b8c);
		font-size: 0.95rem;
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

	.post-card {
		display: flex;
		flex-direction: column;
		min-width: 0;
		padding: 22px;
		border: 1px solid var(--border, #e5e7eb);
		border-radius: 14px;
		background: var(--surface, #fff);
		transition:
			border-color 150ms ease,
			transform 150ms ease;
	}

	.post-card:hover {
		transform: translateY(-2px);
		border-color: #c4b5fd;
	}

	.card-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
	}

	.post-id {
		color: var(--accent, #5a33a5);
		font-size: 0.72rem;
		font-weight: 750;
		letter-spacing: 0.04em;
	}

	.post-author {
		color: var(--text-muted, #737b8c);
		font-size: 0.75rem;
	}

	.post-card h2 {
		margin: 20px 0 12px;
		font-size: 1.05rem;
		line-height: 1.5;
		text-transform: capitalize;
	}

	.post-body {
		display: -webkit-box;
		overflow: hidden;
		margin: 0 0 24px;
		color: var(--text-muted, #737b8c);
		font-size: 0.9rem;
		line-height: 1.7;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
		line-clamp: 4;
	}

	.details-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		align-self: flex-start;
		margin-top: auto;
		color: var(--accent, #5a33a5);
		font-size: 0.88rem;
		font-weight: 650;
		text-decoration: none;
	}

	.details-link:hover {
		text-decoration: underline;
	}

	.empty-state {
		padding: 48px 20px;
		border: 1px dashed var(--border, #e5e7eb);
		border-radius: 14px;
		text-align: center;
	}

	.empty-icon {
		font-size: 2rem;
		color: var(--text-muted, #737b8c);
	}

	.empty-state h2 {
		margin: 12px 0 8px;
		font-size: 1.1rem;
	}

	.empty-state p {
		color: var(--text-muted, #737b8c);
	}

	.empty-state button {
		padding: 9px 14px;
		border: 0;
		border-radius: 8px;
		background: var(--accent, #5a33a5);
		color: white;
		cursor: pointer;
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

		.page-header {
			align-items: flex-start;
		}

		.posts-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

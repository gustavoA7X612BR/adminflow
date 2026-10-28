<script lang="ts">
	import type { PageProps } from './$types';
	import StatCard from '$lib/components/StatCard.svelte';

	let { data }: PageProps = $props();

	const formatNumber = (value: number) => new Intl.NumberFormat('pt-BR').format(value);
</script>

<svelte:head>
	<title>Dashboard | AdminFlow</title>
	<meta name="description" content="Visão geral de usuários e publicações no AdminFlow." />
</svelte:head>

<main class="dashboard">
	<header class="page-header">
		<div>
			<p class="eyebrow">VISÃO GERAL</p>
			<h1>Dashboard</h1>
			<p class="subtitle">Acompanhe os dados e as publicações da plataforma.</p>
		</div>

		<span class="live-indicator">
			<span class="status-dot"></span>
			Dados da API
		</span>
	</header>

	<section class="stats-grid" aria-label="Indicadores gerais">
		<StatCard
			label="Total de usuários"
			value={formatNumber(data.stats.totalUsers)}
			description="Usuários retornados pela API"
			icon="♙"
			variant="users"
		/>

		<StatCard
			label="Total de publicações"
			value={formatNumber(data.stats.totalPosts)}
			description="Publicações disponíveis"
			icon="▤"
			variant="posts"
		/>

		<StatCard
			label="Média por usuário"
			value={data.stats.postsPerUser}
			description="Publicações por usuário"
			icon="↗"
			variant="average"
		/>
	</section>

	<section class="recent-section">
		<header class="section-header">
			<div>
				<p class="eyebrow">CONTEÚDO</p>
				<h2>Publicações recentes</h2>
				<p class="section-description">Últimas cinco publicações por identificador.</p>
			</div>

			<a href="/posts" class="view-all">
				Ver todas <span aria-hidden="true">→</span>
			</a>
		</header>

		<div class="posts-list">
			{#each data.recentPosts as post (post.id)}
				<article class="post-row">
					<div class="post-id">#{post.id}</div>

					<div class="post-info">
						<h3>
							<a href={`/posts/${post.id}`}>{post.title}</a>
						</h3>
						<p>{post.body}</p>
						<span class="post-author">Usuário #{post.userId}</span>
					</div>

					<a href={`/posts/${post.id}`} class="post-link" aria-label={`Ver publicação ${post.id}`}>
						→
					</a>
				</article>
			{/each}
		</div>
	</section>

	<section class="quick-access">
		<header class="section-header">
			<div>
				<p class="eyebrow">NAVEGAÇÃO</p>
				<h2>Acesso rápido</h2>
			</div>
		</header>

		<div class="quick-grid">
			<a href="/users" class="quick-card">
				<span class="quick-icon users-icon" aria-hidden="true">♙</span>
				<span>
					<strong>Usuários</strong>
					<small>Consultar usuários cadastrados</small>
				</span>
				<span class="quick-arrow" aria-hidden="true">→</span>
			</a>

			<a href="/posts" class="quick-card">
				<span class="quick-icon posts-icon" aria-hidden="true">▤</span>
				<span>
					<strong>Publicações</strong>
					<small>Pesquisar e explorar publicações</small>
				</span>
				<span class="quick-arrow" aria-hidden="true">→</span>
			</a>
		</div>
	</section>
</main>

<style>
	.dashboard {
		display: flex;
		flex-direction: column;
		gap: 32px;
		max-width: 1280px;
		margin: 0 auto;
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
		font-weight: 750;
		letter-spacing: 0.1em;
	}

	h1 {
		margin: 0;
		font-size: clamp(1.8rem, 4vw, 2.2rem);
		letter-spacing: -0.04em;
	}

	.subtitle,
	.section-description {
		margin: 8px 0 0;
		color: var(--text-muted, #737b8c);
		font-size: 0.92rem;
		line-height: 1.6;
	}

	.live-indicator {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 9px 12px;
		border: 1px solid var(--border, #e5e7eb);
		border-radius: 999px;
		background: var(--surface, #fff);
		font-size: 0.8rem;
		white-space: nowrap;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #16a34a;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 20px;
	}

	.quick-icon {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: 12px;
		font-size: 1.35rem;
	}

	.users-icon {
		background: #ede9fe;
		color: #5a33a5;
	}

	.posts-icon {
		background: #dbeafe;
		color: #1d4ed8;
	}

	.recent-section,
	.quick-access {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}

	.section-header h2 {
		margin: 0;
		font-size: 1.2rem;
		letter-spacing: -0.02em;
	}

	.section-header .eyebrow {
		margin-bottom: 6px;
	}

	.view-all {
		color: var(--accent, #5a33a5);
		font-size: 0.88rem;
		font-weight: 650;
		text-decoration: none;
		white-space: nowrap;
	}

	.view-all:hover {
		text-decoration: underline;
	}

	.posts-list {
		overflow: hidden;
		border: 1px solid var(--border, #e5e7eb);
		border-radius: 14px;
		background: var(--surface, #fff);
	}

	.post-row {
		display: flex;
		align-items: center;
		gap: 18px;
		padding: 20px 22px;
	}

	.post-row + .post-row {
		border-top: 1px solid var(--border, #e5e7eb);
	}

	.post-id {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 44px;
		height: 44px;
		border-radius: 12px;
		background: #f3f4f6;
		color: #4b5563;
		font-size: 0.8rem;
		font-weight: 700;
	}

	.post-info {
		flex: 1;
		min-width: 0;
	}

	.post-info h3 {
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.5;
		text-transform: capitalize;
	}

	.post-info h3 a {
		color: inherit;
		text-decoration: none;
	}

	.post-info h3 a:hover {
		color: var(--accent, #5a33a5);
	}

	.post-info > p {
		display: -webkit-box;
		overflow: hidden;
		margin: 5px 0;
		color: var(--text-muted, #737b8c);
		font-size: 0.84rem;
		line-height: 1.6;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
	}

	.post-author {
		color: var(--text-muted, #737b8c);
		font-size: 0.76rem;
	}

	.post-link,
	.quick-arrow {
		flex-shrink: 0;
		color: var(--accent, #5a33a5);
		font-size: 1.25rem;
		text-decoration: none;
	}

	.quick-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 18px;
	}

	.quick-card {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 20px;
		border: 1px solid var(--border, #e5e7eb);
		border-radius: 14px;
		background: var(--surface, #fff);
		color: inherit;
		text-decoration: none;
		transition:
			border-color 150ms ease,
			transform 150ms ease;
	}

	.quick-card:hover {
		transform: translateY(-2px);
		border-color: #c4b5fd;
	}

	.quick-card > span:nth-child(2) {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 6px;
		min-width: 0;
	}

	.quick-card strong {
		font-size: 0.92rem;
	}

	.quick-card small {
		color: var(--text-muted, #737b8c);
		font-size: 0.8rem;
		line-height: 1.5;
	}

	@media (max-width: 900px) {
		.stats-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 640px) {
		.dashboard {
			gap: 26px;
			padding: 22px 16px;
		}

		.page-header {
			align-items: flex-start;
		}

		.live-indicator {
			font-size: 0;
		}

		.stats-grid,
		.quick-grid {
			grid-template-columns: 1fr;
		}

		.post-row {
			gap: 12px;
			padding: 16px;
		}

		.post-id {
			width: 38px;
			height: 38px;
		}
	}
</style>

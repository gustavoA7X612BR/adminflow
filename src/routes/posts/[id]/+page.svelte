<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const initials = (name: string) =>
		name
			.split(' ')
			.filter(Boolean)
			.slice(0, 2)
			.map((part) => part[0])
			.join('')
			.toUpperCase();
</script>

<svelte:head>
	<title>Publicação #{data.post.id} | AdminFlow</title>
	<meta name="description" content={data.post.title} />
</svelte:head>

<main class="post-detail">
	<a href="/posts" class="back-link">← Voltar para publicações</a>

	<article class="post-card">
		<div class="post-meta">
			<span class="post-id">PUBLICAÇÃO #{data.post.id}</span>
			<span class="author-label">Usuário #{data.post.userId}</span>
		</div>

		<h1>{data.post.title}</h1>

		<div class="post-content">
			<p>{data.post.body}</p>
		</div>

		<footer class="post-footer">
			<span>Identificador: {data.post.id}</span>
			<span>Autor: usuário #{data.post.userId}</span>
		</footer>
	</article>

	<section class="comments-section">
		<header class="comments-header">
			<div>
				<p class="eyebrow">DISCUSSÃO</p>
				<h2>Comentários</h2>
			</div>

			<span class="comment-count">
				{data.comments.length}
				{data.comments.length === 1 ? 'comentário' : 'comentários'}
			</span>
		</header>

		{#if data.comments.length > 0}
			<div class="comments-list">
				{#each data.comments as comment (comment.id)}
					<article class="comment-card">
						<div class="comment-avatar">
							{initials(comment.name)}
						</div>

						<div class="comment-body">
							<div class="comment-heading">
								<h3>{comment.name}</h3>
								<a href={`mailto:${comment.email}`}>
									{comment.email}
								</a>
							</div>

							<p>{comment.body}</p>
						</div>
					</article>
				{/each}
			</div>
		{:else}
			<div class="empty-state">Nenhum comentário encontrado para esta publicação.</div>
		{/if}
	</section>
</main>

<style>
	.post-detail {
		display: flex;
		flex-direction: column;
		gap: 28px;
		max-width: 1000px;
		margin: 0 auto;
		padding: 32px;
		color: var(--text-primary, #172033);
	}

	.back-link {
		align-self: flex-start;
		color: var(--accent, #5a33a5);
		font-size: 0.9rem;
		font-weight: 600;
		text-decoration: none;
	}

	.back-link:hover {
		text-decoration: underline;
	}

	.post-card {
		padding: 32px;
		border: 1px solid var(--border, #e5e7eb);
		border-radius: 16px;
		background: var(--surface, #fff);
	}

	.post-meta {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 12px;
	}

	.post-id,
	.author-label {
		font-size: 0.78rem;
		font-weight: 650;
	}

	.post-id {
		color: var(--accent, #5a33a5);
		letter-spacing: 0.05em;
	}

	.author-label {
		color: var(--text-muted, #737b8c);
	}

	h1 {
		margin: 24px 0;
		font-size: clamp(1.6rem, 4vw, 2.2rem);
		line-height: 1.4;
		text-transform: capitalize;
		overflow-wrap: anywhere;
	}

	.post-content {
		padding: 24px 0;
		border-top: 1px solid var(--border, #e5e7eb);
	}

	.post-content p {
		margin: 0;
		font-size: 1rem;
		line-height: 1.9;
		white-space: pre-line;
	}

	.post-footer {
		display: flex;
		flex-wrap: wrap;
		gap: 12px 24px;
		padding-top: 20px;
		border-top: 1px solid var(--border, #e5e7eb);
		color: var(--text-muted, #737b8c);
		font-size: 0.82rem;
	}

	.comments-section {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.comments-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}

	.eyebrow {
		margin: 0 0 6px;
		color: var(--text-muted, #737b8c);
		font-size: 0.7rem;
		font-weight: 750;
		letter-spacing: 0.1em;
	}

	.comments-header h2 {
		margin: 0;
		font-size: 1.35rem;
	}

	.comment-count {
		padding: 7px 11px;
		border: 1px solid var(--border, #e5e7eb);
		border-radius: 9px;
		background: var(--surface, #fff);
		font-size: 0.8rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.comments-list {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.comment-card {
		display: flex;
		align-items: flex-start;
		gap: 16px;
		padding: 22px;
		border: 1px solid var(--border, #e5e7eb);
		border-radius: 12px;
		background: var(--surface, #fff);
	}

	.comment-avatar {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 42px;
		height: 42px;
		border-radius: 12px;
		background: #ede9fe;
		color: #5a33a5;
		font-size: 0.85rem;
		font-weight: 750;
	}

	.comment-body {
		min-width: 0;
		flex: 1;
	}

	.comment-heading h3 {
		margin: 0;
		font-size: 0.95rem;
		overflow-wrap: anywhere;
	}

	.comment-heading a {
		display: inline-block;
		margin-top: 5px;
		color: var(--accent, #5a33a5);
		font-size: 0.8rem;
		text-decoration: none;
		overflow-wrap: anywhere;
	}

	.comment-heading a:hover {
		text-decoration: underline;
	}

	.comment-body > p {
		margin: 14px 0 0;
		color: var(--text-muted, #737b8c);
		font-size: 0.9rem;
		line-height: 1.8;
		white-space: pre-line;
	}

	.empty-state {
		padding: 32px;
		border: 1px dashed var(--border, #e5e7eb);
		border-radius: 12px;
		color: var(--text-muted, #737b8c);
		text-align: center;
	}

	@media (max-width: 640px) {
		.post-detail {
			padding: 22px 16px;
		}

		.post-card {
			padding: 22px;
		}

		.comment-card {
			gap: 12px;
			padding: 16px;
		}

		.comments-header {
			align-items: flex-start;
		}
	}
</style>

<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Post } from '$lib/types/api';

	/** Propriedades aceitas por {@link PostCard}. */
	interface Props {
		/** Dados da publicação usados no resumo e no link para a página de detalhes. */
		post: Post;
	}

	let { post }: Props = $props();
</script>

<article class="post-card">
	<div class="card-top">
		<span class="post-id">POST #{post.id}</span>
		<span class="post-author">Usuário #{post.userId}</span>
	</div>

	<h2>{post.title}</h2>
	<p class="post-body">{post.body}</p>
	<a class="details-link" href={resolve('/posts/[id]', { id: String(post.id) })}>
		Ver detalhes <span aria-hidden="true">→</span>
	</a>
</article>

<style>
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

	h2 {
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
</style>

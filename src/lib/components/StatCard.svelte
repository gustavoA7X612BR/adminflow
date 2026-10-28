<script lang="ts">
	interface Props {
		label: string;
		value: string | number;
		description: string;
		icon: string;
		variant?: 'users' | 'posts' | 'average';
	}

	let { label, value, description, icon, variant = 'users' }: Props = $props();
</script>

<article class="stat-card">
	<div
		class="stat-icon"
		class:users={variant === 'users'}
		class:posts={variant === 'posts'}
		class:average={variant === 'average'}
		aria-hidden="true"
	>
		{icon}
	</div>

	<p class="stat-label">{label}</p>
	<p class="stat-value">{value}</p>
	<p class="stat-description">{description}</p>
</article>

<style>
	.stat-card {
		padding: 24px;
		border: 1px solid var(--border, #e5e7eb);
		border-radius: 14px;
		background: var(--surface, #fff);
	}

	.stat-icon {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: 12px;
		font-size: 1.35rem;
	}

	.users {
		background: #ede9fe;
		color: #5a33a5;
	}

	.posts {
		background: #dbeafe;
		color: #1d4ed8;
	}

	.average {
		background: #dcfce7;
		color: #15803d;
	}

	.stat-label {
		margin: 22px 0 8px;
		color: var(--text-muted, #737b8c);
		font-size: 0.88rem;
	}

	.stat-value {
		margin: 0;
		font-size: 2rem;
		font-weight: 750;
		letter-spacing: -0.04em;
		font-variant-numeric: tabular-nums;
	}

	.stat-description {
		margin: 8px 0 0;
		color: var(--text-muted, #737b8c);
		font-size: 0.8rem;
	}
</style>

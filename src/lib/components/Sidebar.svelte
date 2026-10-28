<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { BarChart3, FileText, LayoutDashboard, Users, X } from 'lucide-svelte';
	/** Propriedades aceitas por {@link Sidebar}. */
	interface Props {
		/**
		 * Controla o menu de navegação em telas pequenas. Use binding para que o
		 * layout pai possa abrir ou fechar o menu.
		 */
		open?: boolean;
	}

	let { open = $bindable(false) }: Props = $props();
</script>

{#if open}<button class="scrim" aria-label="Fechar menu" onclick={() => (open = false)}
	></button>{/if}
<aside class:open>
	<div class="brand">
		<span class="brand-mark"><BarChart3 size={19} /></span><span
			>admin<span class="brand-accent">flow</span></span
		><button class="close" aria-label="Fechar menu" onclick={() => (open = false)}
			><X size={19} /></button
		>
	</div>

	<p class="nav-label">MENU PRINCIPAL</p>
	<nav>
		<a href={resolve('/')} class:active={page.url.pathname === '/'} onclick={() => (open = false)}>
			<LayoutDashboard size={18} strokeWidth={1.8} /><span>Visão geral</span>
		</a>
		<a
			href={resolve('/users')}
			class:active={page.url.pathname.startsWith('/users')}
			onclick={() => (open = false)}
		>
			<Users size={18} strokeWidth={1.8} /><span>Usuários</span>
		</a>
		<a
			href={resolve('/posts')}
			class:active={page.url.pathname.startsWith('/posts')}
			onclick={() => (open = false)}
		>
			<FileText size={18} strokeWidth={1.8} /><span>Publicações</span>
		</a>
	</nav>
</aside>

<style>
	aside {
		position: fixed;
		inset: 0 auto 0 0;
		z-index: 20;
		display: flex;
		width: 250px;
		flex-direction: column;
		padding: 25px 16px 16px;
		background: #fff;
		border-right: 1px solid #edf0f4;
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 0 7px 27px;
		font-size: 19px;
		font-weight: 750;
		letter-spacing: -0.7px;
		color: #182033;
	}
	.brand-mark {
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		border-radius: 10px;
		background: #6c5ce7;
		color: white;
	}
	.brand-accent {
		color: #6c5ce7;
	}

	.nav-label {
		margin: 30px 8px 10px;
		color: #a0a8b5;
		font-size: 9px;
		font-weight: 700;
		letter-spacing: 1px;
	}
	nav {
		display: grid;
		gap: 4px;
	}
	nav a {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 11px 10px;
		border-radius: 9px;
		color: #7b8596;
		text-decoration: none;
		font-size: 12px;
		font-weight: 550;
	}
	nav a:hover {
		background: #f7f6ff;
		color: #6757df;
	}
	nav a.active {
		background: #f0edff;
		color: #6454dc;
		font-weight: 650;
	}

	.close,
	.scrim {
		display: none;
	}
	@media (max-width: 760px) {
		aside {
			transform: translateX(-102%);
			transition: transform 0.2s ease;
			box-shadow: 12px 0 40px #18203312;
		}
		aside.open {
			transform: translateX(0);
		}
		.close {
			display: block;
			margin-left: auto;
			border: 0;
			background: none;
			color: #667085;
		}
		.scrim {
			position: fixed;
			inset: 0;
			z-index: 19;
			display: block;
			border: 0;
			background: #11182755;
		}
	}
</style>

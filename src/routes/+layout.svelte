<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { Bell, Menu } from 'lucide-svelte';
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';
	let { children }: LayoutProps = $props();
	let menuOpen = $state(false);
</script>

<svelte:head>
	<title>Adminflow — Painel administrativo</title>
	<meta name="description" content="Painel de administração com usuários e publicações." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Sidebar bind:open={menuOpen} />
<div class="app-shell">
	<header class="topbar">
		<div class="mobile-brand">
			<button class="menu-button" aria-label="Abrir menu" onclick={() => (menuOpen = true)}
				><Menu size={20} /></button
			><span>admin<span>flow</span></span>
		</div>

		<div class="breadcrumbs">
			<span>Administração</span>
			<span class="slash">/</span>
			<strong>
				{#if page.url.pathname === '/'}
					Visão geral
				{:else if page.url.pathname === '/users'}
					Usuários
				{:else if page.url.pathname === '/posts'}
					Publicações
				{:else if /^\/posts\/\d+$/.test(page.url.pathname)}
					<a href="/posts">Publicações</a>
					<span class="slash">/</span>
					Detalhes
				{:else}
					Página não encontrada
				{/if}
			</strong>
		</div>

		<div class="top-actions">
			<span class="today">Terça-feira, 28 de outubro de 2026</span><button
				class="notification"
				aria-label="Notificações"><Bell size={18} /><i></i></button
			>
			<div class="top-avatar">GM</div>
		</div>
	</header>
	<main>{@render children()}</main>
</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}
	:global(body) {
		margin: 0;
		background: #f7f8fb;
		color: #202a3d;
		font-family: 'DM Sans', Inter, system-ui, sans-serif;
		-webkit-font-smoothing: antialiased;
	}
	:global(button),
	:global(input) {
		font-family: inherit;
	}
	.app-shell {
		min-height: 100vh;
		margin-left: 250px;
	}
	.topbar {
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		height: 67px;
		align-items: center;
		justify-content: space-between;
		padding: 0 34px;
		background: #fff;
		border-bottom: 1px solid #edf0f4;
	}
	.breadcrumbs {
		display: flex;
		align-items: center;
		gap: 10px;
		color: #969eac;
		font-size: 11px;
	}
	.breadcrumbs strong {
		color: #3c4659;
		font-weight: 600;
	}
	.slash {
		color: #c4c9d2;
	}
	.top-actions {
		display: flex;
		align-items: center;
		gap: 19px;
	}
	.today {
		color: #929aaa;
		font-size: 10px;
	}
	.notification {
		position: relative;
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border: 1px solid #edf0f4;
		border-radius: 10px;
		background: white;
		color: #707a8c;
	}
	.notification i {
		position: absolute;
		right: 7px;
		top: 7px;
		width: 6px;
		height: 6px;
		border: 1px solid white;
		border-radius: 50%;
		background: #ee6d75;
	}
	.top-avatar {
		display: grid;
		place-items: center;
		width: 31px;
		height: 31px;
		border-radius: 50%;
		background: #fbe6d6;
		color: #b96c3c;
		font-size: 10px;
		font-weight: 700;
	}
	.mobile-brand {
		display: none;
	}
	main {
		max-width: 1500px;
		margin: 0 auto;
		padding: 34px;
	}
	@media (max-width: 760px) {
		.app-shell {
			margin-left: 0;
		}
		.topbar {
			height: 60px;
			padding: 0 17px;
		}
		.breadcrumbs,
		.today {
			display: none;
		}
		.mobile-brand {
			display: flex;
			align-items: center;
			gap: 10px;
			color: #182033;
			font-size: 17px;
			font-weight: 750;
			letter-spacing: -0.6px;
		}
		.mobile-brand span span {
			color: #6c5ce7;
		}
		.menu-button {
			display: grid;
			place-items: center;
			width: 33px;
			height: 33px;
			border: 1px solid #edf0f4;
			border-radius: 9px;
			background: white;
			color: #667085;
		}
		.top-actions {
			gap: 11px;
		}
		main {
			padding: 23px 17px;
		}
	}
</style>

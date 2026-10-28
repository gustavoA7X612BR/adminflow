<script lang="ts">
	import type { PageProps } from './$types';
	import SearchInput from '$lib/components/SearchInput.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	let { data }: PageProps = $props();
	let search = $state('');

	let filteredUsers = $derived(
		data.users.filter((user) => {
			const term = search.trim().toLowerCase();

			return (
				user.name.toLowerCase().includes(term) ||
				user.email.toLowerCase().includes(term) ||
				user.company.name.toLowerCase().includes(term) ||
				user.address.city.toLowerCase().includes(term)
			);
		})
	);
</script>

<svelte:head>
	<title>Usuários | AdminFlow</title>
	<meta name="description" content="Gerenciamento de usuários do AdminFlow" />
</svelte:head>

<main>
	<PageHeader
		title="Usuários"
		subtitle={`${filteredUsers.length} de ${data.users.length} usuários`}
	/>

	<div class="toolbar">
		<SearchInput
			bind:value={search}
			placeholder="Buscar por nome, e-mail, empresa ou cidade..."
			label="Buscar usuários"
		/>
	</div>

	<DataTable
		columns={['Nome', 'E-mail', 'Empresa', 'Cidade']}
		rows={filteredUsers.map((user) => [
			user.name,
			user.email,
			user.company.name,
			user.address.city
		])}
		empty={`Nenhum usuário encontrado para "${search}".`}
	/>
</main>

<style>
	main {
		padding: 2rem;
	}

	.toolbar {
		margin: 1.5rem 0;
	}
</style>

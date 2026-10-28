import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Breadcrumb from './Breadcrumb.svelte';
import DataTable from './DataTable.svelte';
import EmptyState from './EmptyState.svelte';
import PageHeader from './PageHeader.svelte';
import PostCard from './PostCard.svelte';
import SearchInput from './SearchInput.svelte';
import StatCard from './StatCard.svelte';

describe('SearchInput', () => {
	it('exibe o rótulo acessível e permite digitar', async () => {
		const user = userEvent.setup();
		render(SearchInput, {
			value: '',
			label: 'Buscar publicações',
			placeholder: 'Digite um título'
		});

		const input = screen.getByRole('searchbox', { name: 'Buscar publicações' });
		expect(input).toHaveAttribute('placeholder', 'Digite um título');
		await user.type(input, 'Svelte');
		expect(input).toHaveValue('Svelte');
	});
});

describe('DataTable', () => {
	it('renderiza cabeçalhos, células e o link opcional da primeira célula', () => {
		render(DataTable, {
			columns: ['Nome', 'E-mail'],
			rows: [['Ada Lovelace', 'ada@example.com']],
			rowHref: (index) => `/users/${index + 1}`
		});

		expect(screen.getByRole('columnheader', { name: 'Nome' })).toBeInTheDocument();
		expect(screen.getByRole('cell', { name: 'ada@example.com' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Ada Lovelace' })).toHaveAttribute('href', '/users/1');
	});

	it('mostra a mensagem configurada quando não há linhas', () => {
		render(DataTable, { columns: ['Nome'], rows: [], empty: 'Nenhum usuário.' });

		expect(screen.getByRole('cell', { name: 'Nenhum usuário.' })).toBeInTheDocument();
	});
});

describe('StatCard', () => {
	it('exibe o nome, o valor e a descrição da métrica', () => {
		render(StatCard, {
			label: 'Total de usuários',
			value: '2.845',
			description: 'Usuários cadastrados',
			icon: '♙',
			variant: 'users'
		});

		expect(screen.getByText('Total de usuários')).toBeInTheDocument();
		expect(screen.getByText('2.845')).toBeInTheDocument();
		expect(screen.getByText('Usuários cadastrados')).toBeInTheDocument();
	});
});

describe('PageHeader', () => {
	it('exibe o título e os textos opcionais', () => {
		render(PageHeader, {
			eyebrow: 'CONTEÚDO',
			title: 'Publicações',
			subtitle: 'Explore o conteúdo da plataforma.'
		});

		expect(screen.getByRole('heading', { level: 1, name: 'Publicações' })).toBeInTheDocument();
		expect(screen.getByText('CONTEÚDO')).toBeInTheDocument();
		expect(screen.getByText('Explore o conteúdo da plataforma.')).toBeInTheDocument();
	});
});

describe('PostCard', () => {
	it('exibe o resumo e aponta para a página de detalhes', () => {
		render(PostCard, {
			post: { id: 7, userId: 2, title: 'Uma publicação', body: 'Conteúdo de exemplo' }
		});

		expect(screen.getByRole('heading', { level: 2, name: 'Uma publicação' })).toBeInTheDocument();
		expect(screen.getByText('Conteúdo de exemplo')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /ver detalhes/i })).toHaveAttribute('href', '/posts/7');
	});
});

describe('EmptyState', () => {
	it('exibe o título e a descrição do estado vazio', () => {
		render(EmptyState, {
			title: 'Nenhum resultado',
			description: 'Tente outra busca.'
		});

		expect(screen.getByRole('status')).toBeInTheDocument();
		expect(screen.getByRole('heading', { level: 2, name: 'Nenhum resultado' })).toBeInTheDocument();
		expect(screen.getByText('Tente outra busca.')).toBeInTheDocument();
	});
});

describe('Breadcrumb', () => {
	it('transforma segmentos anteriores em links e identifica a página atual', () => {
		render(Breadcrumb, {
			items: [
				{ label: 'Início', href: '/' },
				{ label: 'Publicações', href: '/posts' },
				{ label: 'Detalhe' }
			]
		});

		expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Publicações' })).toHaveAttribute('href', '/posts');
		expect(screen.getByText('Detalhe')).toHaveAttribute('aria-current', 'page');
	});
});

import { describe, expect, it } from 'vitest';
import type { ApiPost, ApiUser } from '$lib/api/jsonplaceholder';
import { buildDashboardData } from './dashboard';

const users = (count: number): ApiUser[] =>
	Array.from({ length: count }, (_, index) => ({
		id: index + 1,
		name: `Usuário ${index + 1}`,
		username: `usuario${index + 1}`,
		email: `usuario${index + 1}@example.com`,
		phone: '000-000',
		website: 'example.com',
		address: { city: 'São Paulo' },
		company: { name: 'Empresa' }
	}));

const posts = (ids: number[]): ApiPost[] =>
	ids.map((id) => ({ id, userId: 1, title: `Publicação ${id}`, body: `Conteúdo ${id}` }));

describe('buildDashboardData', () => {
	it('calcula os totais e a média de publicações por usuário', () => {
		const result = buildDashboardData(users(4), posts([1, 2, 3, 4, 5, 6, 7]));

		expect(result.stats).toEqual({ totalUsers: 4, totalPosts: 7, postsPerUser: 1.8 });
	});

	it('retorna as cinco publicações com os maiores identificadores em ordem decrescente', () => {
		const input = posts([2, 8, 1, 6, 4, 9, 3]);
		const result = buildDashboardData(users(1), input);

		expect(result.recentPosts.map((post) => post.id)).toEqual([9, 8, 6, 4, 3]);
	});

	it('não altera a ordem da lista de publicações recebida', () => {
		const input = posts([2, 1, 3]);
		const originalOrder = input.map((post) => post.id);

		buildDashboardData(users(1), input);

		expect(input.map((post) => post.id)).toEqual(originalOrder);
	});

	it('usa média zero quando não há usuários', () => {
		const result = buildDashboardData([], posts([1, 2]));

		expect(result.stats).toEqual({ totalUsers: 0, totalPosts: 2, postsPerUser: 0 });
	});

	it('retorna uma lista recente vazia quando não há publicações', () => {
		const result = buildDashboardData(users(2), []);

		expect(result.stats).toEqual({ totalUsers: 2, totalPosts: 0, postsPerUser: 0 });
		expect(result.recentPosts).toEqual([]);
	});
});

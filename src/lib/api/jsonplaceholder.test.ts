import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getComments, getPost, getPosts, getUsers } from './jsonplaceholder';

const API_URL = 'https://jsonplaceholder.typicode.com';

describe('cliente JSONPlaceholder', () => {
	const fetchMock = vi.fn<typeof fetch>();

	beforeEach(() => {
		fetchMock.mockReset();
		vi.stubGlobal('fetch', fetchMock);
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('busca usuários e retorna o corpo da resposta', async () => {
		const users = [{ id: 1, name: 'Ada Lovelace' }];
		fetchMock.mockResolvedValue(Response.json(users));

		await expect(getUsers()).resolves.toEqual(users);
		expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/users`);
	});

	it('busca publicações e retorna o corpo da resposta', async () => {
		const posts = [{ id: 3, userId: 1, title: 'Título', body: 'Conteúdo' }];
		fetchMock.mockResolvedValue(Response.json(posts));

		await expect(getPosts()).resolves.toEqual(posts);
		expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/posts`);
	});

	it('busca uma publicação pelo identificador', async () => {
		const post = { id: 3, userId: 1, title: 'Título', body: 'Conteúdo' };
		fetchMock.mockResolvedValue(Response.json(post));

		await expect(getPost(3)).resolves.toEqual(post);
		expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/posts/3`);
	});

	it('busca comentários da publicação informada', async () => {
		const comments = [
			{ id: 9, postId: 3, name: 'Comentário', email: 'ada@example.com', body: 'Texto' }
		];
		fetchMock.mockResolvedValue(Response.json(comments));

		await expect(getComments(3)).resolves.toEqual(comments);
		expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/posts/3/comments`);
	});

	it.each([
		['usuários', getUsers, 'Erro ao buscar usuários: 503'],
		['posts', getPosts, 'Erro ao buscar posts: 503'],
		['post', () => getPost(3), 'Erro ao buscar post: 503'],
		['comentários', () => getComments(3), 'Erro ao buscar comentários: 503']
	])('lança erro quando a busca de %s falha', async (_resource, request, message) => {
		fetchMock.mockResolvedValue(new Response(null, { status: 503 }));

		await expect(request()).rejects.toThrow(message);
	});
});

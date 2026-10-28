import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getComments, getPost } from '$lib/api/jsonplaceholder';
import type { ApiComment, ApiPost } from '$lib/api/jsonplaceholder';
import { load } from './+page';

vi.mock('$lib/api/jsonplaceholder', () => ({
	getPost: vi.fn(),
	getComments: vi.fn()
}));

const mockGetPost = vi.mocked(getPost);
const mockGetComments = vi.mocked(getComments);

const post: ApiPost = {
	id: 12,
	userId: 4,
	title: 'Publicação de exemplo',
	body: 'Conteúdo da publicação'
};

const comments: ApiComment[] = [
	{
		postId: 12,
		id: 120,
		name: 'Comentário de exemplo',
		email: 'leitor@example.com',
		body: 'Texto do comentário'
	}
];

function loadPost(id: string) {
	return load({ params: { id } } as Parameters<typeof load>[0]);
}

describe('load da página de detalhe da publicação', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it.each(['abc', '0', '-3', '1.5'])(
		'retorna 404 para o identificador inválido "%s"',
		async (id) => {
			await expect(loadPost(id)).rejects.toMatchObject({ status: 404 });
			expect(mockGetPost).not.toHaveBeenCalled();
		}
	);

	it('retorna publicação e comentários quando ambos carregam', async () => {
		mockGetPost.mockResolvedValue(post);
		mockGetComments.mockResolvedValue(comments);

		await expect(loadPost('12')).resolves.toEqual({ post, comments });
		expect(mockGetPost).toHaveBeenCalledWith(12);
		expect(mockGetComments).toHaveBeenCalledWith(12);
	});

	it('retorna 404 quando a API não encontra a publicação', async () => {
		mockGetPost.mockResolvedValue({ ...post, id: 0 });

		await expect(loadPost('12')).rejects.toMatchObject({ status: 404 });
		expect(mockGetComments).not.toHaveBeenCalled();
	});

	it('retorna 502 quando a busca da publicação falha', async () => {
		mockGetPost.mockRejectedValue(new TypeError('Falha de rede'));

		await expect(loadPost('12')).rejects.toMatchObject({
			status: 502,
			body: { message: 'Não foi possível carregar a publicação' }
		});
	});

	it('retorna 502 quando a busca dos comentários falha', async () => {
		mockGetPost.mockResolvedValue(post);
		mockGetComments.mockRejectedValue(new Error('Falha ao buscar comentários'));

		await expect(loadPost('12')).rejects.toMatchObject({
			status: 502,
			body: { message: 'Não foi possível carregar a publicação' }
		});
	});

	it('preserva erros HTTP da API em vez de convertê-los para 502', async () => {
		mockGetPost.mockRejectedValue({ status: 404, body: { message: 'Publicação não encontrada' } });

		await expect(loadPost('12')).rejects.toMatchObject({ status: 404 });
	});
});

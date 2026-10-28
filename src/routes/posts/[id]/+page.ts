import { error } from '@sveltejs/kit';
import { getPost, getComments } from '$lib/api/jsonplaceholder';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const id = Number(params.id);

	if (!Number.isInteger(id) || id < 1) {
		error(404, 'Publicação não encontrada');
	}

	try {
		const post = await getPost(id);

		if (!post?.id) {
			error(404, 'Publicação não encontrada');
		}

		const comments = await getComments(id);

		return { post, comments };
	} catch (err) {
		if (typeof err === 'object' && err !== null && 'status' in err) {
			throw err;
		}

		error(502, 'Não foi possível carregar a publicação');
	}
};

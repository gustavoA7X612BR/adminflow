import { getPosts } from '$lib/api/jsonplaceholder';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const posts = await getPosts();

	return { posts };
};

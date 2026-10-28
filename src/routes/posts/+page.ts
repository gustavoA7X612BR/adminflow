import { getPosts } from '$lib/api/jsonplaceholder';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const posts = await getPosts(fetch);

	return { posts };
};

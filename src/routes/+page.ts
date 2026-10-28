import { getUsers, getPosts } from '$lib/api/jsonplaceholder';
import { buildDashboardData } from '$lib/utils/dashboard';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const [users, posts] = await Promise.all([getUsers(), getPosts()]);

	return { users, posts, ...buildDashboardData(users, posts) };
};

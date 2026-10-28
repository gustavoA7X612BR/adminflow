import { getUsers, getPosts } from '$lib/api/jsonplaceholder';
import { buildDashboardData } from '$lib/utils/dashboard';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const [users, posts] = await Promise.all([getUsers(fetch), getPosts(fetch)]);

	return { users, posts, ...buildDashboardData(users, posts) };
};

import { getUsers, getPosts } from '$lib/api/jsonplaceholder';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const [users, posts] = await Promise.all([getUsers(), getPosts()]);

	return {
		users,
		posts,
		stats: {
			totalUsers: users.length,
			totalPosts: posts.length,
			postsPerUser: users.length > 0 ? Number((posts.length / users.length).toFixed(1)) : 0
		},
		recentPosts: [...posts].sort((a, b) => b.id - a.id).slice(0, 5)
	};
};

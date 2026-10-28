import type { ApiPost, ApiUser } from '$lib/api/jsonplaceholder';

/**
 * Calcula os indicadores do dashboard e seleciona as cinco publicações mais
 * recentes sem alterar a lista recebida.
 */
export function buildDashboardData(users: ApiUser[], posts: ApiPost[]) {
	return {
		stats: {
			totalUsers: users.length,
			totalPosts: posts.length,
			postsPerUser: users.length > 0 ? Number((posts.length / users.length).toFixed(1)) : 0
		},
		recentPosts: [...posts].sort((a, b) => b.id - a.id).slice(0, 5)
	};
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://jsonplaceholder.typicode.com';

export interface ApiUser {
	id: number;
	name: string;
	username: string;
	email: string;
	phone: string;
	website: string;
	address: {
		city: string;
	};
	company: {
		name: string;
	};
}

export interface ApiPost {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export interface ApiComment {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
}

export async function getUsers(fetcher: typeof fetch = fetch): Promise<ApiUser[]> {
	const response = await fetcher(`${API_BASE_URL}/users`);

	if (!response.ok) {
		throw new Error(`Erro ao buscar usuários: ${response.status}`);
	}

	return response.json() as Promise<ApiUser[]>;
}

export async function getPosts(fetcher: typeof fetch = fetch): Promise<ApiPost[]> {
	const response = await fetcher(`${API_BASE_URL}/posts`);

	if (!response.ok) {
		throw new Error(`Erro ao buscar posts: ${response.status}`);
	}

	return response.json() as Promise<ApiPost[]>;
}

export async function getPost(id: number, fetcher: typeof fetch = fetch): Promise<ApiPost> {
	const response = await fetcher(`${API_BASE_URL}/posts/${id}`);

	if (!response.ok) {
		throw new Error(`Erro ao buscar post: ${response.status}`);
	}

	return response.json() as Promise<ApiPost>;
}

export async function getComments(
	postId: number,
	fetcher: typeof fetch = fetch
): Promise<ApiComment[]> {
	const response = await fetcher(`${API_BASE_URL}/posts/${postId}/comments`);

	if (!response.ok) {
		throw new Error(`Erro ao buscar comentários: ${response.status}`);
	}

	return response.json() as Promise<ApiComment[]>;
}

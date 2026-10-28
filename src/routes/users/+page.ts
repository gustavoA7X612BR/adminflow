import { getUsers } from '$lib/api/jsonplaceholder';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const users = await getUsers(fetch);

	return { users };
};

import { createServer } from 'node:http';

const users = [
	{
		id: 1,
		name: 'Ada Lovelace',
		username: 'ada',
		email: 'ada@example.com',
		phone: '555-0101',
		website: 'ada.example.com',
		address: { city: 'Londres' },
		company: { name: 'Analytical Engines' }
	}
];

const posts = [
	{
		id: 1,
		userId: 1,
		title: 'Aprendendo SvelteKit',
		body: 'Um guia prático para criar aplicações modernas.'
	},
	{
		id: 2,
		userId: 1,
		title: 'Boas práticas de testes',
		body: 'Como validar aplicações com testes automatizados.'
	},
	{
		id: 3,
		userId: 1,
		title: 'Interfaces acessíveis',
		body: 'Dicas para construir uma interface inclusiva.'
	}
];

const comments = [
	{
		id: 1,
		postId: 1,
		name: 'Grace Hopper',
		email: 'grace@example.com',
		body: 'Excelente guia, muito útil para começar.'
	}
];

const server = createServer((request, response) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Content-Type', 'application/json; charset=utf-8');

	const pathname = new URL(request.url ?? '/', 'http://127.0.0.1').pathname;
	const postCommentsMatch = pathname.match(/^\/posts\/(\d+)\/comments$/);
	const postMatch = pathname.match(/^\/posts\/(\d+)$/);

	if (pathname === '/health') {
		response.writeHead(200).end(JSON.stringify({ status: 'ok' }));
	} else if (pathname === '/users') {
		response.writeHead(200).end(JSON.stringify(users));
	} else if (pathname === '/posts') {
		response.writeHead(200).end(JSON.stringify(posts));
	} else if (postCommentsMatch) {
		const postId = Number(postCommentsMatch[1]);
		response
			.writeHead(200)
			.end(JSON.stringify(comments.filter((comment) => comment.postId === postId)));
	} else if (postMatch) {
		const post = posts.find((item) => item.id === Number(postMatch[1]));
		response
			.writeHead(post ? 200 : 404)
			.end(JSON.stringify(post ?? { message: 'Post não encontrado' }));
	} else {
		response.writeHead(404).end(JSON.stringify({ message: 'Rota não encontrada' }));
	}
});

server.listen(4174, '127.0.0.1');

import { expect, test } from '@playwright/test';

test.describe('navegação e publicações', () => {
	test('navega entre dashboard, publicações e usuários pela sidebar', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('heading', { level: 1, name: 'Dashboard' })).toBeVisible();

		await page.getByRole('link', { name: 'Publicações', exact: true }).click();
		await expect(page).toHaveURL(/\/posts$/);
		await expect(page.getByRole('heading', { level: 1, name: 'Publicações' })).toBeVisible();

		await page.getByRole('link', { name: 'Usuários', exact: true }).click();
		await expect(page).toHaveURL(/\/users$/);
		await expect(page.getByRole('heading', { level: 1, name: 'Usuários' })).toBeVisible();
	});

	test('filtra publicações pelo título ou conteúdo e permite limpar a busca', async ({ page }) => {
		await page.goto('/posts');

		const search = page.getByRole('searchbox', { name: 'Buscar publicações' });
		await search.fill('SvelteKit');

		await expect(page.getByRole('heading', { name: 'Aprendendo SvelteKit' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Boas práticas de testes' })).toHaveCount(0);
		await expect(page.getByText('Exibindo 1 de 3 publicações')).toBeVisible();

		await search.fill('interface inclusiva');
		await expect(page.getByRole('heading', { name: 'Interfaces acessíveis' })).toBeVisible();
		await expect(page.getByText('Exibindo 1 de 3 publicações')).toBeVisible();

		await search.fill('termo sem correspondência');
		await expect(
			page.getByRole('heading', { name: 'Nenhuma publicação encontrada' })
		).toBeVisible();
		await page.getByRole('button', { name: 'Limpar pesquisa' }).last().click();
		await expect(search).toHaveValue('');
		await expect(page.getByText('Exibindo 3 de 3 publicações')).toBeVisible();
	});

	test('abre os detalhes da publicação e retorna à lista', async ({ page }) => {
		await page.goto('/posts');
		await page.getByRole('link', { name: 'Ver detalhes' }).first().click();

		await expect(page).toHaveURL(/\/posts\/1$/);
		await expect(
			page.getByRole('heading', { level: 1, name: 'Aprendendo SvelteKit' })
		).toBeVisible();
		await expect(page.getByText('Um guia prático para criar aplicações modernas.')).toBeVisible();
		await expect(page.getByRole('heading', { level: 2, name: 'Comentários' })).toBeVisible();
		await expect(page.getByRole('heading', { level: 3, name: 'Grace Hopper' })).toBeVisible();

		await page.getByRole('link', { name: '← Voltar para publicações' }).click();
		await expect(page).toHaveURL(/\/posts$/);
		await expect(page.getByRole('heading', { level: 1, name: 'Publicações' })).toBeVisible();
	});
});

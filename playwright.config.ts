import { defineConfig, devices } from '@playwright/test';

process.env.VITE_API_BASE_URL ??= 'http://127.0.0.1:4174';

export default defineConfig({
	testDir: './e2e',
	testMatch: '**/*.spec.ts',
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 2 : undefined,
	reporter: 'list',
	use: {
		baseURL: 'http://127.0.0.1:4173',
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
		...devices['Desktop Chrome']
	},
	webServer: [
		{
			command: 'node e2e/mock-api-server.mjs',
			url: 'http://127.0.0.1:4174/health',
			reuseExistingServer: !process.env.CI,
			timeout: 30_000
		},
		{
			command: 'npm run dev -- --host 127.0.0.1 --port 4173 --strictPort',
			url: 'http://127.0.0.1:4173',
			reuseExistingServer: !process.env.CI,
			timeout: 120_000
		}
	]
});

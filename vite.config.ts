import { sveltekit } from '@sveltejs/kit/vite';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import path from 'path';
import adapter from '@sveltejs/adapter-static';
import { playwright } from '@vitest/browser-playwright';
import { mockAppModules } from './vite-plugin-mock-app.js';

export default defineConfig({
	plugins: process.env.VITEST
		? [mockAppModules(), svelte({ preprocess: vitePreprocess() })]
		: [
				sveltekit({
					adapter: adapter({ fallback: 'index.html' }),
					preprocess: vitePreprocess()
				})
			],
	resolve: process.env.VITEST
		? {
				alias: {
					'$app/navigation': path.resolve(
						import.meta.dirname,
						'./src/tests/mocks/$app/navigation.ts'
					),
					'$app/state': path.resolve(import.meta.dirname, './src/tests/mocks/$app/state.ts'),
					'$app/environment': path.resolve(
						import.meta.dirname,
						'./src/tests/mocks/$app/environment.ts'
					)
				}
			}
		: undefined,
	test: {
		projects: [
			{
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium' }]
					},
					include: ['src/**/*.browser.{test,spec}.{js,ts}', 'src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**', 'src/routes/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}', 'src/**/*.browser.{test,spec}.{js,ts}']
				}
			}
		]
	}
});

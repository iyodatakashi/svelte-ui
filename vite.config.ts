import { sveltekit } from '@sveltejs/kit/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import path from 'path';
import { mockAppModules } from './vite-plugin-mock-app';

export default defineConfig({
	plugins: process.env.VITEST ? [mockAppModules(), svelte()] : [sveltekit()],
	resolve: process.env.VITEST
		? {
				alias: {
					'$app/navigation': path.resolve(__dirname, './src/__tests__/mocks/$app/navigation.ts'),
					'$app/stores': path.resolve(__dirname, './src/__tests__/mocks/$app/stores.ts'),
					'$app/environment': path.resolve(__dirname, './src/__tests__/mocks/$app/environment.ts')
				}
			}
		: undefined,
	test: {
		projects: [
			{
				test: {
					name: 'client',
					environment: 'browser',
					browser: {
						enabled: true,
						provider: 'playwright',
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

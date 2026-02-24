import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'node:path';
import { mockAppModules } from './vite-plugin-mock-app';

export default defineConfig({
	plugins: [mockAppModules(), svelte()],
	resolve: {
		alias: {
			$lib: resolve(process.cwd(), 'src/lib'),
			'$app/navigation': resolve(process.cwd(), 'src/__tests__/mocks/$app/navigation.ts'),
			'$app/stores': resolve(process.cwd(), 'src/__tests__/mocks/$app/stores.ts'),
			'$app/environment': resolve(process.cwd(), 'src/__tests__/mocks/$app/environment.ts')
		}
	},
	test: {
		pool: 'browser',
		browser: {
			enabled: true,
			provider: 'playwright',
			instances: [{ browser: 'chromium' }]
		},
		include: [
			'src/**/*.browser.{test,spec}.{js,ts}',
			'src/**/*.svelte.{test,spec}.{js,ts}',
			'src/**/*.{test,spec}.{js,ts}'
		],
		exclude: ['src/lib/server/**'],
		setupFiles: ['./vitest-setup-client.ts']
	}
});

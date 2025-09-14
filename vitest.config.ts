import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'node:path';

export default defineConfig({
	plugins: [svelte()],
	resolve: {
		alias: {
			$lib: resolve(process.cwd(), 'src/lib')
		}
	},
	test: {
		browser: {
			enabled: true,
			provider: 'playwright',
			instances: [{ browser: 'chromium' }]
		},
		include: ['src/**/*.browser.{test,spec}.{js,ts}', 'src/**/*.svelte.{test,spec}.{js,ts}'],
		exclude: ['src/lib/server/**'],
		setupFiles: ['./vitest-setup-client.ts']
	}
});

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
		// Storybookでのテスト用設定
		environment: 'jsdom',
		// ストーリーファイルを対象に
		include: ['../src/**/*.stories.@(js|ts|svelte)'],
		exclude: ['../src/lib/server/**'],
		globals: true
	}
});

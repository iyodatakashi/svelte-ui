import { defineConfig, defineProject } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'node:path';
import { mockAppModules } from './vite-plugin-mock-app';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname =
	typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const storybookConfigDir = path.join(dirname, '.storybook');

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
		// カバレッジは Vitest v3 ではプロジェクト単位ではなく
		// 「このルート設定全体」に対して一括で適用される。
		// ここで src/lib 以外（routes, stories）を集計対象から外す。
		coverage: {
			provider: 'v8',
			reportsDirectory: './coverage',
			include: ['src/lib/**'],
			exclude: ['src/routes/**', 'src/stories/**']
		},
		projects: [
			// 既存のクライアント側テスト (vite.config.ts から移動)
			defineProject({
				// ルート設定（plugins / resolve など）を継承する
				extends: true,
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
			} as any),
			// 既存のサーバー側テスト (vite.config.ts から移動)
			defineProject({
				// ルート設定（plugins / resolve など）を継承する
				extends: true,
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}', 'src/**/*.browser.{test,spec}.{js,ts}']
				}
			} as any),
			// Storybook コンポーネントテスト用プロジェクト
			// NOTE:
			// Vitest 3.2 の型定義には `extends` プロパティが含まれていませんが、
			// Storybook 公式ドキュメントに従いランタイムでは `extends: true` を使う必要があるため、
			// 下のオブジェクト全体を `any` としてキャストして型エラーを抑制しています。
			defineProject({
				extends: true,
				plugins: [
					storybookTest({
						// Storybook の設定ディレクトリ
						configDir: storybookConfigDir,
						// Storybook を起動するスクリプト（watch モード用）
						storybookScript: 'npm run storybook -- --no-open'
					})
				],
				test: {
					// addon-vitest が使うプロジェクト名と合わせる
					name: `storybook:${storybookConfigDir}`,
					// ブラウザモードで実行
					browser: {
						enabled: true,
						provider: 'playwright',
						headless: true,
						instances: [{ browser: 'chromium' }]
					},
					// Storybook 側の preview 設定をテストに反映
					setupFiles: ['./.storybook/vitest.setup.ts']
				}
			} as any)
		]
	}
});

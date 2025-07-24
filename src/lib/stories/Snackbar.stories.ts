import type { Meta, StoryObj } from '@storybook/sveltekit';
import Snackbar from '../components/Snackbar.svelte';
import { snackbarManager } from '../utils/snackbar';

// グローバルWindow型を拡張
declare global {
	interface Window {
		snackbar: typeof snackbarManager;
	}
}

// ブラウザ環境でグローバルにsnackbarManagerを公開
if (typeof window !== 'undefined') {
	window.snackbar = snackbarManager;
}

const meta: Meta<typeof Snackbar> = {
	title: 'UI/Snackbar',
	component: Snackbar,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
複数のSnackbarを管理するシステム。自動的な位置計算、キュー管理、最大表示数制限などの機能を提供します。

## 主要機能
- **自動配置**: 複数のSnackbarが重ならずに積み重ね表示
- **最大表示数制限**: 5個まで（設定可能）
- **キュー管理**: 古いものから自動削除
- **位置別管理**: top/bottom位置を独立管理
- **タイプ別API**: snackbar.success(), error(), warning(), info()
- **カスタムコンテンツ**: 任意のSvelteスニペットを表示可能

## 使用方法
\`\`\`svelte
<script>
  import { snackbarManager, Snackbar } from 'svelte-ui';
</script>

<!-- 1. アプリのルートレベルでSnackbarを配置 -->
<Snackbar />

<!-- 2. 各種通知を表示 -->
<button onclick={() => snackbar.success("保存完了")}>成功</button>
<button onclick={() => snackbar.error("エラーが発生しました")}>エラー</button>
<button onclick={() => snackbar.warning("注意が必要です")}>警告</button>
<button onclick={() => snackbar.info("情報をお知らせします")}>情報</button>

<!-- 3. オプション指定 -->
<button onclick={() => snackbar.success("保存完了", {
  variant: "outlined",
  duration: 5000,
  closable: true
})}>カスタム</button>
\`\`\`

## ブラウザコンソールでテスト
Storybookでは\`snackbar\`がグローバルに公開されているので、ブラウザのコンソールで以下のコードを実行できます：

\`\`\`javascript
// 成功メッセージ
snackbar.success("操作が正常に完了しました！");

// エラーメッセージ（クローズボタン付き、無期限表示）
snackbar.error("エラーが発生しました", { closable: true, duration: 0 });

// 警告メッセージ
snackbar.warning("ネットワーク接続が不安定です");

// 情報メッセージ
snackbar.info("新しいアップデートが利用可能です");

// アウトライン variant
snackbar.success("Outlined variant", { variant: "outlined" });

// 複数表示テスト
snackbar.success("1番目"); snackbar.error("2番目"); snackbar.warning("3番目");

// 全削除
snackbar.clear();
\`\`\`
				`
			}
		}
	},
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
	render: () => ({
		Component: Snackbar,
		props: {}
	}),
	play: async () => {
		// グローバルにsnackbarManagerを公開（再確認）
		if (typeof window !== 'undefined') {
			window.snackbar = snackbarManager;
		}

		// ページ読み込み後にデモ用のSnackbarを表示
		setTimeout(() => {
			snackbarManager.info(
				'Snackbarシステムの動作デモです。ブラウザのコンソールで snackbar.success("テスト") などを実行してください。',
				{
					duration: 8000
				}
			);
		}, 1000);

		// 追加のデモSnackbar
		setTimeout(() => {
			snackbarManager.success('コンソールで snackbar.error("エラーテスト") を試してみてください');
		}, 3000);
	}
};

export const AutoDemo: Story = {
	render: () => ({
		Component: Snackbar,
		props: {}
	}),
	play: async () => {
		// グローバルにsnackbarManagerを公開（再確認）
		if (typeof window !== 'undefined') {
			window.snackbar = snackbarManager;
		}

		// 自動的に複数のSnackbarを順次表示してデモする
		setTimeout(() => snackbarManager.success('Success メッセージの例'), 500);
		setTimeout(() => snackbarManager.error('Error メッセージの例'), 1500);
		setTimeout(() => snackbarManager.warning('Warning メッセージの例'), 2500);
		setTimeout(() => snackbarManager.info('Info メッセージの例'), 3500);
		setTimeout(() => snackbarManager.success('Outlined variant', { variant: 'outlined' }), 4500);
	}
};

export const TopPositionDemo: Story = {
	render: () => ({
		Component: Snackbar,
		props: {}
	}),
	play: async () => {
		// グローバルにsnackbarManagerを公開（再確認）
		if (typeof window !== 'undefined') {
			window.snackbar = snackbarManager;
		}

		// 上位置のSnackbarを順次表示してテスト
		setTimeout(() => snackbarManager.success('Top Success メッセージ', { position: 'top' }), 500);
		setTimeout(() => snackbarManager.error('Top Error メッセージ', { position: 'top' }), 1500);
		setTimeout(() => snackbarManager.warning('Top Warning メッセージ', { position: 'top' }), 2500);
		setTimeout(() => snackbarManager.info('Top Info メッセージ', { position: 'top' }), 3500);
		setTimeout(
			() =>
				snackbarManager.success('Top Outlined variant', { variant: 'outlined', position: 'top' }),
			4500
		);
	}
};

export const QueueDemo: Story = {
	render: () => ({
		Component: Snackbar,
		props: {}
	}),
	play: async () => {
		// グローバルにsnackbarManagerを公開（再確認）
		if (typeof window !== 'undefined') {
			window.snackbar = snackbarManager;
		}

		// 上限数（5個）を超えて10個のSnackbarを順次追加してキューイング動作をテスト
		setTimeout(() => snackbarManager.info('Queue test 1/10', { duration: 2000 }), 500);
		setTimeout(() => snackbarManager.info('Queue test 2/10', { duration: 2000 }), 800);
		setTimeout(() => snackbarManager.info('Queue test 3/10', { duration: 2000 }), 1100);
		setTimeout(() => snackbarManager.info('Queue test 4/10', { duration: 2000 }), 1400);
		setTimeout(() => snackbarManager.info('Queue test 5/10', { duration: 2000 }), 1700);
		setTimeout(
			() => snackbarManager.info('Queue test 6/10 (キューに蓄積)', { duration: 2000 }),
			2000
		);
		setTimeout(
			() => snackbarManager.info('Queue test 7/10 (キューに蓄積)', { duration: 2000 }),
			2300
		);
		setTimeout(
			() => snackbarManager.info('Queue test 8/10 (キューに蓄積)', { duration: 2000 }),
			2600
		);
		setTimeout(
			() => snackbarManager.info('Queue test 9/10 (キューに蓄積)', { duration: 2000 }),
			2900
		);
		setTimeout(
			() => snackbarManager.info('Queue test 10/10 (キューに蓄積)', { duration: 2000 }),
			3200
		);
	}
};

export const TopPositionDefault: Story = {
	render: () => ({
		Component: Snackbar,
		props: { position: 'top' }
	}),
	play: async () => {
		// グローバルにsnackbarManagerを公開（再確認）
		if (typeof window !== 'undefined') {
			window.snackbar = snackbarManager;
		}

		// デフォルトが上位置のSnackbarをテスト
		setTimeout(() => snackbarManager.success('上位置デフォルトのテスト'), 500);
		setTimeout(() => snackbarManager.error('エラーメッセージ'), 1500);
	}
};

export const BasicUsage: Story = {
	render: () => ({
		Component: Snackbar,
		props: {}
	}),
	parameters: {
		docs: {
			source: {
				code: `
<script>
  import { snackbarManager, Snackbar } from 'svelte-ui';
  
  function handleSuccess() {
    snackbar.success("操作が完了しました");
  }
  
  function handleError() {
    snackbar.error("エラーが発生しました", { closable: true });
  }
</script>

<Snackbar />

<button onclick={handleSuccess}>成功メッセージ</button>
<button onclick={handleError}>エラーメッセージ</button>
				`
			}
		}
	}
};

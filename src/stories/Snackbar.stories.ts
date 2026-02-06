import type { StoryObj } from '@storybook/sveltekit';
import Snackbar from '../lib/components/Snackbar.svelte';
import { snackbarManager } from '../lib/utils/snackbar.svelte';

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

const meta = {
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
- **タイプ別API**: snackbar.success(), error(), warning(), info(), default()
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
<button onclick={() => snackbar.default("ニュートラルなメッセージ")}>デフォルト</button>

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

// デフォルトメッセージ（ニュートラル）
snackbar.default("ニュートラルなメッセージです");

// アウトライン variant
snackbar.success("Outlined variant", { variant: "outlined" });

// 複数表示テスト
snackbar.success("1番目"); snackbar.error("2番目"); snackbar.warning("3番目"); snackbar.default("4番目");

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

export const Interactive: Story = {
	render: () => ({
		Component: Snackbar,
		props: {}
	}),
	parameters: {
		docs: {
			description: {
				story: `
インタラクティブなデモです。ブラウザのコンソールで以下のコマンドを試してください：

\`\`\`javascript
// 基本的な使用例
snackbar.success("保存完了");
snackbar.error("エラーが発生しました");
snackbar.warning("注意が必要です");
snackbar.info("情報をお知らせします");
snackbar.default("ニュートラルなメッセージ");

// オプション付き
snackbar.success("カスタム", { duration: 5000, closable: true });
snackbar.error("アウトライン", { variant: "outlined" });

// 全削除
snackbar.clear();
\`\`\`
				`
			}
		}
	},
	play: async () => {
		// グローバルにsnackbarManagerを公開
		if (typeof window !== 'undefined') {
			window.snackbar = snackbarManager;
		}

		// 説明用のSnackbarを表示
		setTimeout(() => {
			snackbarManager.info(
				'ブラウザのコンソールで snackbar.success("テスト") などを実行してください。',
				{ duration: 8000 }
			);
		}, 1000);
	}
};

export const Types: Story = {
	render: () => ({
		Component: Snackbar,
		props: {}
	}),
	parameters: {
		docs: {
			description: {
				story: `
各タイプのSnackbarを順次表示します。タイプごとの色とアイコンの違いを確認できます。

- **Success**: 緑色、チェックアイコン
- **Error**: 赤色、エラーアイコン  
- **Warning**: オレンジ色、警告アイコン
- **Info**: 青色、情報アイコン
- **Default**: テーマ色、アイコンなし
				`
			}
		}
	},
	play: async () => {
		// グローバルにsnackbarManagerを公開
		if (typeof window !== 'undefined') {
			window.snackbar = snackbarManager;
		}

		// 各タイプを順次表示
		setTimeout(() => snackbarManager.success('Success メッセージ'), 500);
		setTimeout(() => snackbarManager.error('Error メッセージ'), 2000);
		setTimeout(() => snackbarManager.warning('Warning メッセージ'), 3500);
		setTimeout(() => snackbarManager.info('Info メッセージ'), 5000);
		setTimeout(() => snackbarManager.default('Default メッセージ'), 6500);
	}
};

export const FilledWithoutClose: Story = {
	render: () => ({
		Component: Snackbar,
		props: {}
	}),
	parameters: {
		docs: {
			description: {
				story: `
Filledバリアント（背景色で塗りつぶし）で、closeボタンなしのSnackbarです。
				`
			}
		}
	},
	play: async () => {
		if (typeof window !== 'undefined') {
			window.snackbar = snackbarManager;
		}

		setTimeout(
			() => snackbarManager.success('Filled Success（closeボタンなし）', { variant: 'filled' }),
			500
		);
		setTimeout(
			() => snackbarManager.error('Filled Error（closeボタンなし）', { variant: 'filled' }),
			2000
		);
		setTimeout(
			() => snackbarManager.warning('Filled Warning（closeボタンなし）', { variant: 'filled' }),
			3500
		);
		setTimeout(
			() => snackbarManager.info('Filled Info（closeボタンなし）', { variant: 'filled' }),
			5000
		);
		setTimeout(
			() => snackbarManager.default('Filled Default（closeボタンなし）', { variant: 'filled' }),
			6500
		);
	}
};

export const FilledWithClose: Story = {
	render: () => ({
		Component: Snackbar,
		props: {}
	}),
	parameters: {
		docs: {
			description: {
				story: `
Filledバリアント（背景色で塗りつぶし）で、closeボタンありのSnackbarです。
				`
			}
		}
	},
	play: async () => {
		if (typeof window !== 'undefined') {
			window.snackbar = snackbarManager;
		}

		setTimeout(
			() =>
				snackbarManager.success('Filled Success（closeボタンあり）', {
					variant: 'filled',
					closable: true
				}),
			500
		);
		setTimeout(
			() =>
				snackbarManager.error('Filled Error（closeボタンあり）', {
					variant: 'filled',
					closable: true
				}),
			2000
		);
		setTimeout(
			() =>
				snackbarManager.warning('Filled Warning（closeボタンあり）', {
					variant: 'filled',
					closable: true
				}),
			3500
		);
		setTimeout(
			() =>
				snackbarManager.info('Filled Info（closeボタンあり）', {
					variant: 'filled',
					closable: true
				}),
			5000
		);
		setTimeout(
			() =>
				snackbarManager.default('Filled Default（closeボタンあり）', {
					variant: 'filled',
					closable: true
				}),
			6500
		);
	}
};

export const OutlinedWithoutClose: Story = {
	render: () => ({
		Component: Snackbar,
		props: {}
	}),
	parameters: {
		docs: {
			description: {
				story: `
Outlinedバリアント（ボーダーのみ、背景透明）で、closeボタンなしのSnackbarです。
				`
			}
		}
	},
	play: async () => {
		if (typeof window !== 'undefined') {
			window.snackbar = snackbarManager;
		}

		setTimeout(
			() => snackbarManager.success('Outlined Success（closeボタンなし）', { variant: 'outlined' }),
			500
		);
		setTimeout(
			() => snackbarManager.error('Outlined Error（closeボタンなし）', { variant: 'outlined' }),
			2000
		);
		setTimeout(
			() => snackbarManager.warning('Outlined Warning（closeボタンなし）', { variant: 'outlined' }),
			3500
		);
		setTimeout(
			() => snackbarManager.info('Outlined Info（closeボタンなし）', { variant: 'outlined' }),
			5000
		);
		setTimeout(
			() => snackbarManager.default('Outlined Default（closeボタンなし）', { variant: 'outlined' }),
			6500
		);
	}
};

export const OutlinedWithClose: Story = {
	render: () => ({
		Component: Snackbar,
		props: {}
	}),
	parameters: {
		docs: {
			description: {
				story: `
Outlinedバリアント（ボーダーのみ、背景透明）で、closeボタンありのSnackbarです。
				`
			}
		}
	},
	play: async () => {
		if (typeof window !== 'undefined') {
			window.snackbar = snackbarManager;
		}

		setTimeout(
			() =>
				snackbarManager.success('Outlined Success（closeボタンあり）', {
					variant: 'outlined',
					closable: true
				}),
			500
		);
		setTimeout(
			() =>
				snackbarManager.error('Outlined Error（closeボタンあり）', {
					variant: 'outlined',
					closable: true
				}),
			2000
		);
		setTimeout(
			() =>
				snackbarManager.warning('Outlined Warning（closeボタンあり）', {
					variant: 'outlined',
					closable: true
				}),
			3500
		);
		setTimeout(
			() =>
				snackbarManager.info('Outlined Info（closeボタンあり）', {
					variant: 'outlined',
					closable: true
				}),
			5000
		);
		setTimeout(
			() =>
				snackbarManager.default('Outlined Default（closeボタンあり）', {
					variant: 'outlined',
					closable: true
				}),
			6500
		);
	}
};

export const Positions: Story = {
	render: () => ({
		Component: Snackbar,
		props: {}
	}),
	parameters: {
		docs: {
			description: {
				story: `
TopとBottom位置の違いを確認できます。

- **Bottom**: 画面下部に表示（デフォルト）
- **Top**: 画面上部に表示
				`
			}
		}
	},
	play: async () => {
		// グローバルにsnackbarManagerを公開
		if (typeof window !== 'undefined') {
			window.snackbar = snackbarManager;
		}

		// Bottom位置（デフォルト）
		setTimeout(() => snackbarManager.success('Bottom Success', { position: 'bottom' }), 500);
		setTimeout(() => snackbarManager.error('Bottom Error', { position: 'bottom' }), 2000);

		// Top位置
		setTimeout(() => snackbarManager.success('Top Success', { position: 'top' }), 3500);
		setTimeout(() => snackbarManager.error('Top Error', { position: 'top' }), 5000);
	}
};

export const Queue: Story = {
	render: () => ({
		Component: Snackbar,
		props: {}
	}),
	parameters: {
		docs: {
			description: {
				story: `
キューイング機能のデモです。最大表示数（5個）を超えた場合の動作を確認できます。

- 最大5個まで同時表示
- 6個目以降はキューに蓄積
- 古いものから順次表示
				`
			}
		}
	},
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

export const CustomColors: Story = {
	render: () => ({
		Component: Snackbar,
		props: {}
	}),
	parameters: {
		docs: {
			description: {
				story: `
カスタム色のテストです。背景色とテキスト色をカスタマイズしたSnackbarを表示します。

## ブラウザコンソールでテスト
\`\`\`javascript
// カスタム背景色
snackbar.success("テスト", { color: "#FF0000" });

// カスタムテキスト色
snackbar.error("テスト", { textColor: "#00FF00" });

// 両方指定
snackbar.warning("テスト", { color: "#8B5CF6", textColor: "#FFFFFF" });
\`\`\`
				`
			}
		}
	},
	play: async () => {
		// グローバルにsnackbarManagerを公開
		if (typeof window !== 'undefined') {
			window.snackbar = snackbarManager;
		}

		// カスタム色のテスト
		setTimeout(() => snackbarManager.success('カスタム背景色: 赤', { color: '#FF0000' }), 500);
		setTimeout(
			() => snackbarManager.error('カスタムテキスト色: 緑', { textColor: '#00FF00' }),
			1500
		);
		setTimeout(
			() =>
				snackbarManager.warning('カスタム背景色とテキスト色', {
					color: '#8B5CF6',
					textColor: '#FFFFFF'
				}),
			2500
		);
		setTimeout(
			() =>
				snackbarManager.info('アウトライン + カスタム色', {
					color: '#06B6D4',
					textColor: '#FFFFFF',
					variant: 'outlined'
				}),
			3500
		);
	}
};

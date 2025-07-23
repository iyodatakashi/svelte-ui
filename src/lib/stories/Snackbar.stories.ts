// src/lib/stories/Snackbar.stories.ts
import Snackbar from '../components/Snackbar.svelte';
import type { Snippet } from 'svelte';
import { createRawSnippet } from 'svelte';

// カスタムコンテンツ用のヘルパー関数
const createContentSnippet = (content: string): Snippet => {
	return createRawSnippet(() => ({
		render: () => content
	}));
};

const meta = {
	title: 'Feedback/Snackbar',
	component: Snackbar,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'一時的な通知メッセージを表示するコンポーネント。成功、エラー、情報、警告の通知に対応し、自動消失やアクションボタンなどの機能を提供します。'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		message: {
			control: { type: 'text' },
			description: '表示メッセージ（childrenが指定されている場合は無視される）'
		},
		type: {
			control: { type: 'select' },
			options: ['info', 'success', 'warning', 'error'],
			description: '通知の種類'
		},
		variant: {
			control: { type: 'select' },
			options: ['filled', 'outlined'],
			description: 'スタイルバリエーション（filled: 濃い背景、outlined: 薄い背景）'
		},
		duration: {
			control: { type: 'number' },
			description: '表示時間（ms、0で無期限）'
		},
		position: {
			control: { type: 'select' },
			options: ['top', 'bottom'],
			description: '表示位置'
		},
		closable: {
			control: { type: 'boolean' },
			description: '×ボタン表示'
		},
		actionLabel: {
			control: { type: 'text' },
			description: 'アクションボタンテキスト'
		},
		children: {
			control: false,
			description: 'カスタムコンテンツ（Snippet）。指定された場合、messageの代わりに表示される'
		}
	}
};

export default meta;

// Basic Info
export const Info = {
	args: {
		message: 'これは情報通知です',
		type: 'info',
		duration: 3000
	}
};

// Success
export const Success = {
	args: {
		message: '保存が完了しました',
		type: 'success',
		duration: 3000
	}
};

// Warning
export const Warning = {
	args: {
		message: '注意が必要です',
		type: 'warning',
		duration: 3000
	}
};

// Error (auto closable)
export const Error = {
	args: {
		message: 'エラーが発生しました',
		type: 'error',
		duration: 0,
		closable: true
	}
};

// With Action Button
export const WithAction = {
	args: {
		message: 'ファイルを削除しました',
		type: 'info',
		duration: 5000,
		actionLabel: '元に戻す',
		closable: true,
		onAction: () => {
			alert('元に戻しました');
		}
	}
};

// Top Position
export const TopPosition = {
	args: {
		message: '画面上部に表示されます',
		type: 'info',
		position: 'top',
		duration: 3000
	}
};

// Long Duration
export const LongDuration = {
	args: {
		message: '10秒間表示される通知です',
		type: 'info',
		duration: 10000
	}
};

// Persistent (manual close only)
export const Persistent = {
	args: {
		message: '×ボタンをクリックするまで表示され続けます',
		type: 'warning',
		duration: 0,
		closable: true
	}
};

// Outlined variant
export const Outlined = {
	args: {
		message: 'アカウントが正常に作成されました',
		type: 'success',
		variant: 'outlined',
		duration: 5000
	}
};

// Variant comparison
export const VariantComparison = {
	args: {
		message: 'このメッセージで2つのvariantを比較できます',
		type: 'info',
		variant: 'filled',
		duration: 10000
	},
	parameters: {
		docs: {
			description: {
				story:
					'variant controlを切り替えて、filled（濃い背景）とoutlined（薄い背景）を比較してください。'
			}
		}
	}
};

// Custom content with Snippet
export const CustomContent = {
	args: {
		type: 'success',
		variant: 'filled',
		duration: 8000,
		children: createContentSnippet(`
			<div style="display: flex; align-items: center; gap: 8px;">
				<strong>アップデート完了</strong>
				<span style="margin-left: 8px;">バージョン 2.1.0 が利用可能です。</span>
				<a href="#" style="color: inherit; text-decoration: underline;">詳細</a>
			</div>
		`)
	}
};

// Custom content with action links
export const CustomContentWithLinks = {
	args: {
		type: 'info',
		variant: 'outlined',
		duration: 10000,
		closable: true,
		children: createContentSnippet(`
			<div>
				<div style="font-weight: 600; margin-bottom: 4px;">新しい機能が追加されました</div>
				<div style="font-size: 0.9em; opacity: 0.9;">
					ダッシュボードに新しいチャート機能を追加しました。
					<a href="#" style="color: inherit; text-decoration: underline;">設定ガイド</a>をご確認ください。
				</div>
			</div>
		`)
	},
	parameters: {
		docs: {
			description: {
				story:
					'Snippetを使用してリッチなコンテンツ（リンク、複数行テキスト、強調表示など）を表示できます。'
			}
		}
	}
};

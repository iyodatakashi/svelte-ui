// src/lib/stories/Snackbar.stories.ts
import Snackbar from '../components/Snackbar.svelte';

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
			description: '表示メッセージ'
		},
		type: {
			control: { type: 'select' },
			options: ['info', 'success', 'warning', 'error'],
			description: '通知の種類'
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

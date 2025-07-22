// snackbar.ts
import Snackbar from '../components/Snackbar.svelte';
import { mount, unmount } from 'svelte';

export interface SnackbarOptions {
	message: string;
	type?: 'info' | 'success' | 'warning' | 'error';
	duration?: number;
	position?: 'top' | 'bottom';
	closable?: boolean;
	actionLabel?: string;
	onAction?: () => void;
	onClose?: () => void;
}

export function showSnackbar(options: SnackbarOptions): void {
	// Portal用のコンテナを作成
	const container = document.createElement('div');
	container.className = 'snackbar-portal';
	container.style.cssText = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 9999;
	`;

	// body直下に追加（Portal）
	document.body.appendChild(container);

	// Svelteコンポーネントをマウント
	const snackbar = mount(Snackbar, {
		target: container,
		props: {
			...options,
			onClose: () => {
				// コンポーネントを破棄
				unmount(snackbar);
				// コンテナを削除
				if (container.parentNode) {
					container.parentNode.removeChild(container);
				}
				// 元のonCloseコールバックを実行
				if (options.onClose) {
					options.onClose();
				}
			}
		}
	});
}

// ヘルパー関数
export const snackbar = {
	success: (message: string, options?: Partial<SnackbarOptions>) =>
		showSnackbar({ message, type: 'success', ...options }),

	error: (message: string, options?: Partial<SnackbarOptions>) =>
		showSnackbar({
			message,
			type: 'error',
			duration: 0,
			closable: true,
			...options
		}),

	info: (message: string, options?: Partial<SnackbarOptions>) =>
		showSnackbar({ message, type: 'info', ...options }),

	warning: (message: string, options?: Partial<SnackbarOptions>) =>
		showSnackbar({ message, type: 'warning', ...options }),

	show: showSnackbar
};

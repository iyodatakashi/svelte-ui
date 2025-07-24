// src/lib/utils/snackbar.ts

import { writable } from 'svelte/store';
import type { Snippet } from 'svelte';

export type SnackbarItem = {
	id: string;
	message?: string;
	children?: Snippet;
	type: 'info' | 'success' | 'warning' | 'error';
	variant?: 'filled' | 'outlined';
	duration?: number;
	position?: 'top' | 'bottom';
	closable?: boolean;
	actionLabel?: string;
	onAction?: () => void;
	onClose?: () => void;
	createdAt: number;
};

export type SnackbarConfig = {
	maxVisible?: number;
	defaultDuration?: number;
	defaultVariant?: 'filled' | 'outlined';
	defaultPosition?: 'top' | 'bottom';
};

class SnackbarManager {
	private items = writable<SnackbarItem[]>([]);
	private queue: SnackbarItem[] = [];
	private config: Required<SnackbarConfig> = {
		maxVisible: 5,
		defaultDuration: 3000,
		defaultVariant: 'filled',
		defaultPosition: 'bottom'
	};

	constructor(config?: SnackbarConfig) {
		if (config) {
			this.config = { ...this.config, ...config };
		}
	}

	// 購読用のstore
	get store() {
		return this.items;
	}

	// 設定更新
	configure(config: SnackbarConfig) {
		this.config = { ...this.config, ...config };
	}

	// デフォルト位置を設定
	setDefaultPosition(position: 'top' | 'bottom') {
		this.config.defaultPosition = position;
	}

	// デフォルト設定を一括更新
	setDefaults(config: {
		position?: 'top' | 'bottom';
		maxVisible?: number;
		defaultDuration?: number;
		defaultVariant?: 'filled' | 'outlined';
	}) {
		if (config.position !== undefined) this.config.defaultPosition = config.position;
		if (config.maxVisible !== undefined) this.config.maxVisible = config.maxVisible;
		if (config.defaultDuration !== undefined) this.config.defaultDuration = config.defaultDuration;
		if (config.defaultVariant !== undefined) this.config.defaultVariant = config.defaultVariant;
	}

	// 基本的なshow メソッド
	private show(options: Omit<SnackbarItem, 'id' | 'createdAt'>): string {
		const id = `snackbar-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
		const item: SnackbarItem = {
			id,
			variant: this.config.defaultVariant,
			duration: this.config.defaultDuration,
			position: this.config.defaultPosition,
			...options,
			createdAt: Date.now()
		};

		this.items.update((currentItems) => {
			// 最大表示数を超えた場合、キューに追加
			if (currentItems.length >= this.config.maxVisible) {
				this.queue.push(item);
				return currentItems;
			}

			// 表示数以内の場合は即座に表示
			return [...currentItems, item];
		});

		// 自動削除はSnackbarItem側で制御するため、ここでは設定しない

		return id;
	}

	// タイプ別メソッド
	success(
		message: string,
		options?: Partial<Omit<SnackbarItem, 'id' | 'type' | 'message' | 'createdAt'>>
	): string {
		return this.show({ message, type: 'success', ...options });
	}

	error(
		message: string,
		options?: Partial<Omit<SnackbarItem, 'id' | 'type' | 'message' | 'createdAt'>>
	): string {
		return this.show({ message, type: 'error', ...options });
	}

	warning(
		message: string,
		options?: Partial<Omit<SnackbarItem, 'id' | 'type' | 'message' | 'createdAt'>>
	): string {
		return this.show({ message, type: 'warning', ...options });
	}

	info(
		message: string,
		options?: Partial<Omit<SnackbarItem, 'id' | 'type' | 'message' | 'createdAt'>>
	): string {
		return this.show({ message, type: 'info', ...options });
	}

	// カスタムコンテンツ用メソッド
	custom(
		children: Snippet,
		type: SnackbarItem['type'],
		options?: Partial<Omit<SnackbarItem, 'id' | 'type' | 'children' | 'createdAt'>>
	): string {
		return this.show({ children, type, ...options });
	}

	// 削除メソッド
	remove(id: string) {
		this.items.update((currentItems) => {
			const filteredItems = currentItems.filter((item) => item.id !== id);

			// キューに待機中のアイテムがあり、表示数に余裕がある場合は次を表示
			if (this.queue.length > 0 && filteredItems.length < this.config.maxVisible) {
				const nextItem = this.queue.shift()!;
				return [...filteredItems, nextItem];
			}

			return filteredItems;
		});
	}

	// 全削除メソッド
	clear() {
		this.items.set([]);
		this.queue = [];
	}

	// 位置別のアイテムを取得
	getItemsByPosition(position: 'top' | 'bottom') {
		let currentItems: SnackbarItem[] = [];
		this.items.subscribe((items) => {
			currentItems = items;
		})();

		return currentItems.filter((item) => item.position === position);
	}
}

// グローバルインスタンス
export const snackbarManager = new SnackbarManager();

// 後方互換性のため、snackbarとしてもエクスポート
export const snackbar = snackbarManager;

// デフォルトエクスポート（後方互換性のため）
export default snackbarManager;

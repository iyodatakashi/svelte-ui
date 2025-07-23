// src/lib/utils/snackbar.ts

import { writable } from 'svelte/store';
import type { Snippet } from 'svelte';

export interface SnackbarItem {
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
}

export interface SnackbarConfig {
	maxVisible?: number;
	defaultDuration?: number;
	defaultVariant?: 'filled' | 'outlined';
	defaultPosition?: 'top' | 'bottom';
}

class SnackbarManager {
	private items = writable<SnackbarItem[]>([]);
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
			const newItems = [...currentItems, item];

			// 最大表示数を超えた場合、古いものから削除
			if (newItems.length > this.config.maxVisible) {
				const itemsToRemove = newItems.slice(0, newItems.length - this.config.maxVisible);
				itemsToRemove.forEach((oldItem) => {
					this.remove(oldItem.id);
				});
				return newItems.slice(-this.config.maxVisible);
			}

			return newItems;
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
		this.items.update((currentItems) => currentItems.filter((item) => item.id !== id));
	}

	// 全削除メソッド
	clear() {
		this.items.set([]);
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
export const snackbar = new SnackbarManager();

// デフォルトエクスポート（後方互換性のため）
export default snackbar;

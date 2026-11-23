import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

// Icon関連の型定義

export type IconVariant = 'outlined' | 'rounded' | 'sharp';
export type IconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;
export type IconGrade = number;
export type IconOpticalSize = number;

export type IconProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
	// Snippet
	/** Material Symbols icon name (e.g. `"home"`, `"settings"`). */
	children: Snippet;

	// 基本プロパティ
	title?: string;
	/** Text shown when the icon font fails to load. */
	fallbackText?: string;

	// スタイル/レイアウト
	/** Icon size in px or CSS unit. @default 24 */
	size?: number | string;
	color?: string;
	customStyle?: string;

	// アイコン関連
	/** Renders the filled style. @default false */
	filled?: boolean;
	/** @default 300 */
	weight?: IconWeight;
	/** @default 0 */
	grade?: IconGrade;
	opticalSize?: IconOpticalSize;
	/** @default 'outlined' */
	variant?: IconVariant;

	// ARIA/アクセシビリティ
	ariaLabel?: string;
	/** Marks the icon as decorative (hidden from screen readers). @default true */
	decorative?: boolean;
};

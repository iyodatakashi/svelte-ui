import type {
	BivariantValueHandler,
	FocusHandler,
	KeyboardHandler,
	MouseHandler,
	PointerHandler,
	TouchHandler
} from '#lib/models/eventHandler/eventHandler.types';
import type {
	IconGrade,
	IconOpticalSize,
	IconVariant,
	IconWeight
} from '#lib/models/icon/icon.types';

export type FileUploaderProps = {
	// 基本プロパティ
	/** Supports `bind:value`. */
	value: FileList | null | undefined;
	/** Allows selecting multiple files. @default false */
	multiple?: boolean;
	/** Maximum file size in bytes. Shows an error if exceeded. */
	maxFileSize?: number;
	placeholder?: string;

	// HTML属性系
	id?: string;
	/** Accepted file types (e.g. `"image/*"`, `".pdf,.docx"`). */
	accept?: string;

	// スタイル/レイアウト
	width?: string | number;
	height?: string | number;
	rounded?: boolean;

	// アイコン系
	icon?: string;
	iconSize?: number;
	iconFilled?: boolean;
	iconWeight?: IconWeight;
	iconGrade?: IconGrade;
	iconOpticalSize?: IconOpticalSize;
	iconVariant?: IconVariant;
	removeFileAriaLabel?: string;

	// 入力イベント
	onchange?: BivariantValueHandler<FileList | null | undefined>;

	// フォーカスイベント
	onfocus?: FocusHandler;
	onblur?: FocusHandler;

	// キーボードイベント
	onkeydown?: KeyboardHandler;
	onkeyup?: KeyboardHandler;

	// マウスイベント
	onmouseenter?: MouseHandler;
	onmouseleave?: MouseHandler;

	// タッチイベント
	ontouchstart?: TouchHandler;
	ontouchend?: TouchHandler;

	// ポインターイベント
	onpointerenter?: PointerHandler;
	onpointerleave?: PointerHandler;
};

export type ImageUploaderProps = {
	// 基本プロパティ
	/** Supports `bind:value`. */
	value: FileList | null | undefined;
	/** Allows selecting multiple images. @default false */
	multiple?: boolean;
	/** Maximum file size in bytes. Shows an error if exceeded. */
	maxFileSize?: number;
	placeholder?: string;

	// HTML属性系
	id?: string;
	/** Accepted file types (e.g. `"image/*"`). */
	accept?: string;

	// スタイル/レイアウト
	width?: string | number;
	height?: string | number;
	rounded?: boolean;
	/** Preview display style. @default 'framed' */
	previewStyle?: 'plain' | 'framed';
	/** Adapts preview size to the image aspect ratio. @default false */
	previewAdaptive?: boolean;

	// アイコン系
	icon?: string;
	iconSize?: number;
	iconFilled?: boolean;
	iconWeight?: IconWeight;
	iconGrade?: IconGrade;
	iconOpticalSize?: IconOpticalSize;
	iconVariant?: IconVariant;
	removeFileAriaLabel?: string;

	// 入力イベント
	onchange?: BivariantValueHandler<FileList | null | undefined>;

	// フォーカスイベント
	onfocus?: FocusHandler;
	onblur?: FocusHandler;

	// キーボードイベント
	onkeydown?: KeyboardHandler;
	onkeyup?: KeyboardHandler;

	// マウスイベント
	onmouseenter?: MouseHandler;
	onmouseleave?: MouseHandler;

	// タッチイベント
	ontouchstart?: TouchHandler;
	ontouchend?: TouchHandler;

	// ポインターイベント
	onpointerenter?: PointerHandler;
	onpointerleave?: PointerHandler;
};

export type ImageUploaderPreviewProps = {
	// 基本プロパティ
	file: File;

	// HTML属性系
	id?: string;

	// スタイル/レイアウト
	width?: string | number;
	height?: string | number;
	previewAdaptive?: boolean;
	rounded?: boolean;
	previewStyle?: 'plain' | 'framed';

	// ARIA/アクセシビリティ
	removeFileAriaLabel?: string;

	// 入力イベント
	onRemove: () => void;
};

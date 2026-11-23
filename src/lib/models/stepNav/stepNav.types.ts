import type { ComponentSize } from '#lib/models/component/component.types';
import type {
	BivariantValueHandler,
	FocusHandler,
	KeyboardHandler,
	MouseHandler
} from '#lib/models/eventHandler/eventHandler.types';
import type {
	IconGrade,
	IconOpticalSize,
	IconVariant,
	IconWeight
} from '#lib/models/icon/icon.types';

export type StepItem = {
	/** 表示ラベル。 */
	label: string;
	/** インページ方式での識別子（value 制御時に一致判定へ使用）。省略時は配列 index の文字列（`String(index)`）がフォールバックに使われる。 */
	value?: string;
	/** URL 方式でのリンク先。指定があると URL 方式として扱われる。 */
	href?: string;
	/** ラベル下の補足説明。 */
	description?: string;
	/** 番号の代わりに表示するアイコン名（Material Symbols）。 */
	icon?: string;
	/** エラー状態。進捗軸の状態に上書きしてエラー表示する。 */
	error?: boolean;
	/** 個別無効化。 */
	disabled?: boolean;
	/** URL 方式の追加マッチパス（`matchPath` 準拠）。 */
	matchingPath?: string[];
	/** URL 方式の完全一致指定。 */
	strictMatch?: boolean;
	/** アクセシブルネーム（アイコンのみ等）。 */
	ariaLabel?: string;
};

/**
 * StepNav orientation type
 * Used by StepNav component
 */
export type StepNavOrientation = 'horizontal' | 'vertical';

export type StepNavProps = {
	// 基本プロパティ
	/** ステップ配列（正式名称）。`{ label, value?, href?, description?, icon?, error?, disabled? }[]` */
	stepItems?: StepItem[];
	/** `stepItems` のエイリアス。両方指定された場合は `stepItems` が優先。 */
	items?: StepItem[];
	/** 表示中ステップの値（インページ方式）。`bind:value` 対応。`item.value` 省略時は配列 index の文字列（'0','1',...）が暗黙の値になる。 */
	value?: string;
	/**
	 * 到達済みの最遠ステップ（進捗軸）。未指定時は表示中ステップ位置。
	 * 数値なら 0 始まりのインデックス、文字列ならアイテムのユニークキー（`value`。省略時は配列 index の文字列）で指定する。URL方式でも `value` をキーに使う。
	 * `{ step, status }` を渡すと指したステップの状態を明示できる。`status: 'done'` なら当該ステップも完了表示（進行中なし）。数値／文字列のみ指定時は `'in-progress'` 扱い。
	 */
	progress?: number | string | { step: number | string; status: 'in-progress' | 'done' };

	// URL 方式（href 使用時）
	/** 各 href のアクティブ判定に前置するパス。 */
	pathPrefix?: string;
	/** アクティブ判定をカスタムする関数。 */
	customPathMatcher?: (currentPath: string, itemHref: string, item: StepItem) => boolean;
	/** 自動検出した現在パスを上書き。 */
	currentPath?: string;

	// HTML属性
	id?: string;

	// スタイル/レイアウト
	/** @default 'horizontal' */
	orientation?: StepNavOrientation;
	/** @default 'medium' */
	size?: ComponentSize;
	/** 現在／完了ステップの強調色。テーマ色より優先。 */
	color?: string;
	/** 幅。数値は px として扱う。 */
	width?: string | number | null;
	minWidth?: string | number | null;
	maxWidth?: string | number | null;
	/** 番号の代わりに各ステップの icon を表示。 @default false */
	showIcon?: boolean;
	/** 追加インラインスタイル。 */
	customStyle?: string;

	// アイコン関連
	iconVariant?: IconVariant;
	iconWeight?: IconWeight;
	iconGrade?: IconGrade;
	iconOpticalSize?: IconOpticalSize;

	// 状態/動作
	/** インページ方式でステップのクリック遷移を許可。到達済み（progress 以下）のステップのみクリック可能。 @default false */
	clickable?: boolean;
	/** コンポーネント全体を無効化。 @default false */
	disabled?: boolean;
	/** アニメーションを抑制。 @default false */
	reducedMotion?: boolean;

	// ARIA/アクセシビリティ
	ariaLabel?: string;
	ariaLabelledby?: string;

	// イベントハンドラ
	/** 表示中ステップ変更（インページ方式）。 */
	onchange?: BivariantValueHandler<string>;
	onclick?: MouseHandler;
	onfocus?: FocusHandler;
	onblur?: FocusHandler;
	onkeydown?: KeyboardHandler;
};

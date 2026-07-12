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

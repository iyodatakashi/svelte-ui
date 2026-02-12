// コールバックハンドラ共通型定義

// DOMイベント用ハンドラ
export type DomEventHandler<E extends Event> = (event: E) => void;

export type FocusHandler = DomEventHandler<FocusEvent>;
export type KeyboardHandler = DomEventHandler<KeyboardEvent>;
export type MouseHandler = DomEventHandler<MouseEvent>;
export type TouchHandler = DomEventHandler<TouchEvent>;
export type PointerHandler = DomEventHandler<PointerEvent>;

// 値ベースのバイバリアントハンドラ
export type BivariantValueHandler<T> = {
	bivarianceHack(value: T): void;
}['bivarianceHack'];


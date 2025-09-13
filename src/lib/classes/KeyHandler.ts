type KeyCallback = (keyStr: string, event: KeyboardEvent) => void;
export class KeyHandler {
	private _isCommandPressed: boolean = false;
	private _isSpacePressed: boolean = false;
	private _isComposing: boolean = false;
	private _onKeydown: KeyCallback;
	private _onKeyup: KeyCallback;
	constructor({ onKeydown, onKeyup }: { onKeydown: KeyCallback; onKeyup: KeyCallback }) {
		this._onKeydown = onKeydown;
		this._onKeyup = onKeyup;
	}
	get isCommandPressed() {
		return this._isCommandPressed;
	}
	get isSpacePressed() {
		return this._isSpacePressed;
	}
	// 各コンポーネントのキーイベントハンドラーとして使用
	handleKeydown = (event: KeyboardEvent) => {
		this._handleKeydown(event);
	};

	handleKeyup = (event: KeyboardEvent) => {
		this._handleKeyup(event);
	};

	handleCompositionStart = (event: CompositionEvent) => {
		this._handleCompositionStart(event);
	};

	handleCompositionEnd = (event: CompositionEvent) => {
		this._handleCompositionEnd(event);
	};
	private _handleKeydown(event: KeyboardEvent) {
		const key = event.key;
		const code = event.code;
		// commandキーが押された場合の処理
		if (key === 'Meta') {
			this._isCommandPressed = true;
		}
		// spaceキーが押された場合の処理
		if (code === 'Space') {
			this._isSpacePressed = true;
		}
		// 修飾キーが入力された場合はイベントを発火させない
		if (key === 'Alt' || key === 'Control' || key === 'Shift' || key === 'Meta') {
			return;
		}
		// IME変換中の場合はキー入力を返さない
		if (this._isComposing) {
			return;
		}
		const modifiers = [];
		if (event.altKey) modifiers.push('alt');
		if (this._isCommandPressed) modifiers.push('command');
		if (event.ctrlKey) modifiers.push('ctrl');
		if (event.shiftKey) modifiers.push('shift');
		const keyStr = [...modifiers, code].join(' + ');
		this._onKeydown(keyStr, event);
	}
	private _handleKeyup(event: KeyboardEvent) {
		const key = event.key;
		// commandキーが離された場合の処理
		if (key === 'Meta') {
			this._isCommandPressed = false;
		}
		const keyStr = event.code;
		this._onKeyup(keyStr, event);
	}
	private _handleBlur() {
		this._isCommandPressed = false;
		this._isSpacePressed = false;
	}

	// IME状態を自動管理するメソッド
	private _handleCompositionStart(event: CompositionEvent) {
		this._isComposing = true;
	}

	private _handleCompositionEnd(event: CompositionEvent) {
		this._isComposing = false;
	}
}

<!-- Switch.svelte -->

<script lang="ts">
	import type { Snippet } from 'svelte';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let {
		// 基本プロパティ
		value = $bindable(false),

		// ラベル
		children,

		// サイズ
		size = 'medium',

		// 色
		color,

		// 無効状態
		disabled = false,

		// 読み取り専用
		readonly = false,

		// 必須項目
		required = false,

		// エラー状態
		error = null,

		// 成功状態
		success = null,

		// アニメーション無効化
		reducedMotion = false,

		// フォーカスイベント
		onfocus = (event: FocusEvent) => {},
		onblur = (event: FocusEvent) => {},

		// キーボードイベント
		onkeydown = (event: KeyboardEvent) => {},
		onkeyup = (event: KeyboardEvent) => {},

		// マウスイベント
		onclick = (event: MouseEvent) => {},
		onmousedown = (event: MouseEvent) => {},
		onmouseup = (event: MouseEvent) => {},
		onmouseenter = (event: MouseEvent) => {},
		onmouseleave = (event: MouseEvent) => {},
		onmouseover = (event: MouseEvent) => {},
		onmouseout = (event: MouseEvent) => {},
		oncontextmenu = (event: MouseEvent) => {},
		onauxclick = (event: MouseEvent) => {},

		// タッチイベント
		ontouchstart = (event: TouchEvent) => {},
		ontouchend = (event: TouchEvent) => {},
		ontouchmove = (event: TouchEvent) => {},
		ontouchcancel = (event: TouchEvent) => {},

		// ポインターイベント
		onpointerdown = (event: PointerEvent) => {},
		onpointerup = (event: PointerEvent) => {},
		onpointerenter = (event: PointerEvent) => {},
		onpointerleave = (event: PointerEvent) => {},
		onpointermove = (event: PointerEvent) => {},
		onpointercancel = (event: PointerEvent) => {},

		// 変更イベント
		onchange = (value: boolean) => {},

		// その他
		...restProps
	}: {
		// 基本プロパティ
		value?: boolean;

		// ラベル
		children?: Snippet;

		// サイズ
		size?: 'small' | 'medium' | 'large';

		// 色
		color?: string;

		// 無効状態
		disabled?: boolean;

		// 読み取り専用
		readonly?: boolean;

		// 必須項目
		required?: boolean;

		// エラー状態
		error?: string | null;

		// 成功状態
		success?: string | null;

		// アニメーション無効化
		reducedMotion?: boolean;

		// フォーカスイベント
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;

		// キーボードイベント
		onkeydown?: (event: KeyboardEvent) => void;
		onkeyup?: (event: KeyboardEvent) => void;

		// マウスイベント
		onclick?: (event: MouseEvent) => void;
		onmousedown?: (event: MouseEvent) => void;
		onmouseup?: (event: MouseEvent) => void;
		onmouseenter?: (event: MouseEvent) => void;
		onmouseleave?: (event: MouseEvent) => void;
		onmouseover?: (event: MouseEvent) => void;
		onmouseout?: (event: MouseEvent) => void;
		oncontextmenu?: (event: MouseEvent) => void;
		onauxclick?: (event: MouseEvent) => void;

		// タッチイベント
		ontouchstart?: (event: TouchEvent) => void;
		ontouchend?: (event: TouchEvent) => void;
		ontouchmove?: (event: TouchEvent) => void;
		ontouchcancel?: (event: TouchEvent) => void;

		// ポインターイベント
		onpointerdown?: (event: PointerEvent) => void;
		onpointerup?: (event: PointerEvent) => void;
		onpointerenter?: (event: PointerEvent) => void;
		onpointerleave?: (event: PointerEvent) => void;
		onpointermove?: (event: PointerEvent) => void;
		onpointercancel?: (event: PointerEvent) => void;

		// 変更イベント
		onchange?: (value: boolean) => void;

		// その他
		[key: string]: any;
	} = $props();

	let inputRef: HTMLInputElement | undefined = $state();
	let switchId = `switch-${Math.random().toString(36).substring(2, 15)}`;
	let errorId = `switch-error-${Math.random().toString(36).substring(2, 15)}`;

	// =========================================================================
	const isDisabled = $derived(disabled || readonly);

	// =========================================================================
	// Methods
	// =========================================================================
	const handleFocus = (event: FocusEvent) => {
		if (isDisabled) return;
		onfocus?.(event);
	};

	const handleBlur = (event: FocusEvent) => {
		if (isDisabled) return;
		onblur?.(event);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (isDisabled) return;
		onkeydown?.(event);
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			value = !value;
			onchange?.(value);
		}
	};

	const handleKeyUp = (event: KeyboardEvent) => {
		if (isDisabled) return;
		onkeyup?.(event);
	};

	const handleClick = (event: MouseEvent) => {
		if (isDisabled) return;
		onclick?.(event);
		// スイッチの状態を切り替え
		value = !value;
		onchange?.(value);
	};

	const handleMouseDown = (event: MouseEvent) => {
		if (isDisabled) return;
		onmousedown?.(event);
	};

	const handleMouseUp = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseup?.(event);
	};

	const handleMouseEnter = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseenter?.(event);
	};

	const handleMouseLeave = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseleave?.(event);
	};

	const handleMouseOver = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseover?.(event);
	};

	const handleMouseOut = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseout?.(event);
	};

	const handleContextMenu = (event: MouseEvent) => {
		if (isDisabled) return;
		oncontextmenu?.(event);
	};

	const handleAuxClick = (event: MouseEvent) => {
		if (isDisabled) return;
		onauxclick?.(event);
	};

	const handleTouchStart = (event: TouchEvent) => {
		if (isDisabled) return;
		ontouchstart?.(event);
	};

	const handleTouchEnd = (event: TouchEvent) => {
		if (isDisabled) return;
		ontouchend?.(event);
	};

	const handleTouchMove = (event: TouchEvent) => {
		if (isDisabled) return;
		ontouchmove?.(event);
	};

	const handleTouchCancel = (event: TouchEvent) => {
		if (isDisabled) return;
		ontouchcancel?.(event);
	};

	const handlePointerDown = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointerdown?.(event);
	};

	const handlePointerUp = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointerup?.(event);
	};

	const handlePointerEnter = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointerenter?.(event);
	};

	const handlePointerLeave = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointerleave?.(event);
	};

	const handlePointerMove = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointermove?.(event);
	};

	const handlePointerCancel = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointercancel?.(event);
	};

	const handleChange = (event: Event) => {
		if (isDisabled) return;
		const target = event.target as HTMLInputElement;
		value = target.checked;
		onchange?.(value);
	};
</script>

<div
	class="switch-container"
	class:switch-container--small={size === 'small'}
	class:switch-container--medium={size === 'medium'}
	class:switch-container--large={size === 'large'}
	class:switch-container--disabled={isDisabled}
	class:switch-container--error={!!error}
	class:switch-container--success={!!success}
	class:switch-container--reduced-motion={reducedMotion}
>
	<input
		bind:this={inputRef}
		bind:checked={value}
		type="checkbox"
		class="switch-input"
		{disabled}
		{readonly}
		{required}
		id={switchId}
		aria-describedby={error ? errorId : undefined}
		onchange={handleChange}
		onfocus={handleFocus}
		onblur={handleBlur}
		onkeydown={handleKeyDown}
		onkeyup={handleKeyUp}
		onclick={handleClick}
		onmousedown={handleMouseDown}
		onmouseup={handleMouseUp}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		onmouseover={handleMouseOver}
		onmouseout={handleMouseOut}
		oncontextmenu={handleContextMenu}
		onauxclick={handleAuxClick}
		ontouchstart={handleTouchStart}
		ontouchend={handleTouchEnd}
		ontouchmove={handleTouchMove}
		ontouchcancel={handleTouchCancel}
		onpointerdown={handlePointerDown}
		onpointerup={handlePointerUp}
		onpointerenter={handlePointerEnter}
		onpointerleave={handlePointerLeave}
		onpointermove={handlePointerMove}
		onpointercancel={handlePointerCancel}
		{...restProps}
	/>

	<label
		for={switchId}
		class="switch-label"
		class:switch-label--small={size === 'small'}
		class:switch-label--medium={size === 'medium'}
		class:switch-label--large={size === 'large'}
		class:switch-label--disabled={isDisabled}
		class:switch-label--checked={value}
		class:switch-label--error={!!error}
		class:switch-label--success={!!success}
		style={color ? `--switch-active-color: ${color};` : ''}
	>
		<span class="switch-track">
			<span class="switch-thumb"></span>
		</span>
		{#if children}
			<span class="switch-text">
				{@render children()}
			</span>
		{/if}
	</label>

	{#if error}
		<div id={errorId} class="switch-error" role="alert">
			{error}
		</div>
	{/if}

	{#if success}
		<div class="switch-success">
			{success}
		</div>
	{/if}
</div>

<style lang="scss">
	/* =============================================
 * 基本構造・レイアウト
 * ============================================= */
	.switch-container {
		display: inline-flex;
		align-items: center;
		gap: var(--svelte-ui-switch-gap);
		font-family: var(--svelte-ui-font-family);
		font-size: var(--svelte-ui-font-size-sm);
		line-height: var(--svelte-ui-line-height);
		color: var(--svelte-ui-text-color);
	}

	/* =============================================
 * サイズバリエーション
 * ============================================= */
	.switch-container--small {
		--switch-width: var(--svelte-ui-switch-width-sm);
		--switch-height: var(--svelte-ui-switch-height-sm);
		--switch-thumb-size: var(--svelte-ui-switch-thumb-size-sm);
		--switch-thumb-margin: var(--svelte-ui-switch-thumb-margin);
	}

	.switch-container--medium {
		--switch-width: var(--svelte-ui-switch-width);
		--switch-height: var(--svelte-ui-switch-height);
		--switch-thumb-size: var(--svelte-ui-switch-thumb-size);
		--switch-thumb-margin: var(--svelte-ui-switch-thumb-margin);
	}

	.switch-container--large {
		--switch-width: var(--svelte-ui-switch-width-lg);
		--switch-height: var(--svelte-ui-switch-height-lg);
		--switch-thumb-size: var(--svelte-ui-switch-thumb-size-lg);
		--switch-thumb-margin: var(--svelte-ui-switch-thumb-margin);
	}

	/* =============================================
 * 入力要素
 * ============================================= */
	.switch-input {
		position: absolute;
		opacity: 0;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	/* =============================================
 * ラベル
 * ============================================= */
	.switch-label {
		display: inline-flex;
		align-items: center;
		gap: var(--svelte-ui-switch-gap);
		cursor: pointer;
		user-select: none;
		transition: opacity var(--svelte-ui-transition-duration) ease;

		&:hover {
			opacity: 0.8;
		}

		&--disabled {
			cursor: not-allowed;
			opacity: 0.5;

			&:hover {
				opacity: 0.5;
			}
		}
	}

	/* =============================================
 * スイッチトラック
 * ============================================= */
	.switch-track {
		position: relative;
		width: var(--switch-width);
		height: var(--switch-height);
		background-color: var(--svelte-ui-switch-track-color);
		border-radius: calc(var(--switch-height) / 2);
		transition: background-color var(--svelte-ui-transition-duration) ease;
		flex-shrink: 0;

		.switch-label--checked & {
			background-color: var(--switch-active-color, var(--svelte-ui-switch-active-color));
		}

		.switch-label--error & {
			background-color: var(--svelte-ui-error-color);
		}

		.switch-label--success & {
			background-color: var(--svelte-ui-success-color);
		}

		.switch-label--disabled & {
			background-color: var(--svelte-ui-switch-disabled-color);
		}
	}

	/* =============================================
 * スイッチサム（丸い部分）
 * ============================================= */
	.switch-thumb {
		position: absolute;
		top: var(--switch-thumb-margin);
		left: var(--switch-thumb-margin);
		width: var(--switch-thumb-size);
		height: var(--switch-thumb-size);
		background-color: white;
		border-radius: 50%;
		transition: transform var(--svelte-ui-transition-duration) ease;

		.switch-label--checked & {
			transform: translateX(
				calc(var(--switch-width) - var(--switch-thumb-size) - var(--switch-thumb-margin) * 2)
			);
		}

		.switch-label--disabled & {
			opacity: 0.5;
		}
	}

	/* =============================================
 * テキスト
 * ============================================= */
	.switch-text {
		font-size: inherit;
		line-height: inherit;
		color: inherit;
	}

	/* =============================================
 * エラー・成功メッセージ
 * ============================================= */
	.switch-error {
		margin-top: 4px;
		font-size: var(--svelte-ui-font-size-xs);
		color: var(--svelte-ui-error-color);
	}

	.switch-success {
		margin-top: 4px;
		font-size: var(--svelte-ui-font-size-xs);
		color: var(--svelte-ui-success-color);
	}

	/* =============================================
 * アニメーション無効化
 * ============================================= */
	.switch-container--reduced-motion {
		* {
			transition: none !important;
			animation: none !important;
		}
	}

	/* =============================================
 * フォーカス状態
 * ============================================= */
	.switch-input:focus-visible + .switch-label .switch-track {
		outline: 2px solid var(--svelte-ui-focus-color);
		outline-offset: 2px;
	}

	/* =============================================
 * ホバー効果
 * ============================================= */
	@media (hover: hover) {
		.switch-label:not(.switch-label--disabled):hover .switch-track {
			transform: scale(1.05);
		}
	}
</style>

<!-- SnackbarItem.svelte -->

<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { snackbar } from '$lib/utils/snackbar.svelte';
	import type { IconVariant } from '$lib/types/icon';
	import type { SnackbarType, SnackbarVariant, SnackbarPosition } from '$lib/types/propOptions';
	import Icon from './Icon.svelte';
	import IconButton from './IconButton.svelte';
	import Button from './Button.svelte';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type SnackbarItemProps = {
		// Snippet
		children?: Snippet;

		// 基本プロパティ
		message?: string;
		type?: SnackbarType;
		actionLabel?: string;

		// HTML属性系
		id: string;

		// スタイル/レイアウト
		variant?: SnackbarVariant;
		position?: SnackbarPosition;
		color?: string;
		textColor?: string;

		// 状態/動作
		duration?: number;
		closable?: boolean;
		closeButtonAriaLabel?: string;
		iconVariant?: IconVariant;

		// イベントハンドラー
		onAction?: () => void;
	};

	let {
		// Snippet
		children,

		// 基本プロパティ
		message,
		type = 'info',
		actionLabel,

		// HTML属性系
		id,

		// スタイル/レイアウト
		variant = 'filled',
		position = 'bottom',
		iconVariant = 'outlined',
		color,
		textColor,

		// 状態/動作
		duration = 3000,
		closable = false,
		closeButtonAriaLabel = 'このメッセージを閉じる',

		// イベントハンドラー
		onAction
	}: SnackbarItemProps = $props();

	let visible = $state(true);
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	const typeIcons = {
		info: 'info',
		success: 'check_circle',
		warning: 'warning',
		error: 'error',
		default: null // アイコンなし
	};

	let snackbarRef: HTMLDivElement;

	// =========================================================================
	// Lifecycle
	// =========================================================================

	onMount(() => {
		if (duration > 0) {
			timeoutId = setTimeout(() => {
				handleClose();
			}, duration);
		}
	});

	// =========================================================================
	// Methods
	// =========================================================================
	const handleClose = () => {
		// アニメーション開始前に、他のSnackbarの位置を測定
		if (snackbarRef) {
			// 現在の要素の位置と親コンテナを取得
			const currentRect = snackbarRef.getBoundingClientRect();

			// コンテナの高さ（Snackbar本体 + gap）
			const containerHeight =
				currentRect.height +
				parseInt(
					getComputedStyle(document.documentElement)
						.getPropertyValue('--svelte-ui-snackbar-item-space')
						.replace('px', '')
				);
			const requiredMargin = -containerHeight;

			snackbarRef.style.setProperty(
				'--svelte-ui-snackbar-item-collapse-margin',
				`${requiredMargin}px`
			);

			// CSSカスタムプロパティが確実に設定されるまで少し待つ
			requestAnimationFrame(() => {
				visible = false;
			});

			// animationendイベントでSnackbar削除
			snackbarRef.addEventListener(
				'animationend',
				() => {
					snackbar.remove(id);
				},
				{ once: true }
			);
		} else {
			visible = false;
		}
	};

	const handleAction = () => {
		if (onAction) {
			onAction();
		}
		handleClose();
	};
</script>

<div
	bind:this={snackbarRef}
	class="snackbar-item snackbar-item--{position} {visible ? '' : 'snackbar-item--hidden'}"
	data-testid="snackbar-item"
>
	<div
		class="snackbar-item__content snackbar-item__content--{type} snackbar-item__content--{variant} snackbar-item__content--{position} {visible
			? 'snackbar-item__content--visible'
			: ''}"
		style="--svelte-ui-snackbar-item-custom-color: {color ??
			'unset'}; --svelte-ui-snackbar-item-custom-text-color: {textColor ?? 'unset'};"
		role={type === 'error' || type === 'warning' ? 'alert' : 'status'}
		aria-live={type === 'error' || type === 'warning' ? 'assertive' : 'polite'}
		aria-atomic="true"
		aria-hidden={!visible}
	>
		{#if typeIcons[type]}
			<div class="snackbar__icon" aria-hidden="true">
				<Icon name={typeIcons[type]} size={32}>{typeIcons[type]}</Icon>
			</div>
		{/if}

		<div class="snackbar__content">
			{#if children}
				{@render children()}
			{:else}
				<span class="snackbar-item__message">{message}</span>
			{/if}
		</div>

		{#if actionLabel && onAction}
			<Button
				variant="outlined"
				color="var(--svelte-ui-text-on-filled-color)"
				onclick={handleAction}
				aria-label="{actionLabel} - {message}"
			>
				{actionLabel}
			</Button>
		{/if}

		{#if closable}
			<div class="snackbar-item__close">
				<IconButton
					ariaLabel={closeButtonAriaLabel}
					iconFilled={true}
					{iconVariant}
					color={variant === 'filled'
						? textColor || `var(--svelte-ui-snackbar-${type}-filled-text-color)`
						: color || `var(--svelte-ui-snackbar-${type}-outlined-text-color)`}
					size={24}
					onclick={handleClose}
				>
					close
				</IconButton>
			</div>
		{/if}
	</div>
</div>

<style>
	/* アニメーション定義 */
	@keyframes slideInFromBottom {
		from {
			transform: translateY(100%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes slideOutWithCollapse {
		0% {
			opacity: 1;
			margin-bottom: 0;
		}
		100% {
			opacity: 0;
			margin-bottom: var(--svelte-ui-snackbar-item-collapse-margin);
		}
	}

	@keyframes slideOutWithCollapseTop {
		0% {
			opacity: 1;
			margin-top: 0;
		}
		100% {
			opacity: 0;
			margin-top: var(--svelte-ui-snackbar-item-collapse-margin);
		}
	}

	@keyframes slideInFromTop {
		from {
			transform: translateY(-100%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.snackbar-item--bottom {
		padding-bottom: var(--svelte-ui-snackbar-item-space);
	}

	.snackbar-item--top {
		padding-top: var(--svelte-ui-snackbar-item-space);
	}

	.snackbar-item--hidden {
		animation: slideOutWithCollapse 400ms ease-in-out forwards;
	}

	.snackbar-item--top.snackbar-item--hidden {
		animation: slideOutWithCollapseTop 400ms ease-in-out forwards;
	}

	.snackbar-item__content {
		position: relative; /* コンテナ内での通常のフローに従う */
		/* left/transformはコンテナが処理するので削除 */

		display: flex;
		align-items: center;
		gap: var(--svelte-ui-snackbar-content-gap);

		min-width: var(--svelte-ui-snackbar-min-width);
		max-width: var(--svelte-ui-snackbar-max-width);
		padding: var(--svelte-ui-snackbar-padding);

		border-radius: var(--svelte-ui-snackbar-border-radius);
		box-shadow: var(--svelte-ui-snackbar-shadow);

		font-size: var(--svelte-ui-snackbar-font-size);
		line-height: var(--svelte-ui-snackbar-line-height);
	}

	/* アニメーションクラス */
	.snackbar-item__content--bottom.snackbar-item__content--visible {
		animation: slideInFromBottom var(--svelte-ui-transition-duration, 300ms) ease-out forwards;
	}

	.snackbar-item__content--top.snackbar-item__content--visible {
		animation: slideInFromTop var(--svelte-ui-transition-duration, 300ms) ease-out forwards;
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.snackbar-item__content--visible,
		.snackbar-item--hidden {
			animation-duration: 0.01s;
		}
	}

	.snackbar-item__icon {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.snackbar-item__text {
		flex: 1;
		min-width: 0;
	}

	.snackbar-item__message {
		word-break: break-word;
	}

	.snackbar-item__close {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		margin-left: auto;
	}

	/* Type variants - filled */
	.snackbar-item__content--filled.snackbar-item__content--info {
		background-color: var(
			--svelte-ui-snackbar-item-custom-color,
			var(--svelte-ui-snackbar-info-filled-bg)
		);
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-info-filled-text-color)
		);
	}

	.snackbar-item__content--filled.snackbar-item__content--info .snackbar-item__icon {
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-info-filled-text-color)
		);
	}

	.snackbar-item__content--filled.snackbar-item__content--success {
		background-color: var(
			--svelte-ui-snackbar-item-custom-color,
			var(--svelte-ui-snackbar-success-filled-bg)
		);
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-success-filled-text-color)
		);
	}

	.snackbar-item__content--filled.snackbar-item__content--success .snackbar-item__icon {
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-success-filled-text-color)
		);
	}

	.snackbar-item__content--filled.snackbar-item__content--warning {
		background-color: var(
			--svelte-ui-snackbar-item-custom-color,
			var(--svelte-ui-snackbar-warning-filled-bg)
		);
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-warning-filled-text-color)
		);
	}

	.snackbar-item__content--filled.snackbar-item__content--warning .snackbar-item__icon {
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-warning-filled-text-color)
		);
	}

	.snackbar-item__content--filled.snackbar-item__content--error {
		background-color: var(
			--svelte-ui-snackbar-item-custom-color,
			var(--svelte-ui-snackbar-error-filled-bg)
		);
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-error-filled-text-color)
		);
	}

	.snackbar-item__content--filled.snackbar-item__content--error .snackbar-item__icon {
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-error-filled-text-color)
		);
	}

	.snackbar-item__content--filled.snackbar-item__content--default {
		background-color: var(
			--svelte-ui-snackbar-item-custom-color,
			var(--svelte-ui-snackbar-default-filled-bg)
		);
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-default-filled-text-color)
		);
	}

	.snackbar-item__content--filled.snackbar-item__content--default .snackbar-item__icon {
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-default-filled-text-color)
		);
	}

	/* Type variants - outlined */
	.snackbar-item__content--outlined.snackbar-item__content--info {
		background-color: var(
			--svelte-ui-snackbar-item-custom-color,
			var(--svelte-ui-snackbar-info-outlined-bg)
		);
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-info-outlined-text-color)
		);
		box-shadow: inset 0 0 0 1px
			var(
				--svelte-ui-snackbar-item-custom-color,
				var(--svelte-ui-snackbar-info-outlined-border-color)
			);
	}

	.snackbar-item__content--outlined.snackbar-item__content--info .snackbar-item__icon {
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-info-outlined-text-color)
		);
	}

	.snackbar-item__content--outlined.snackbar-item__content--success {
		background-color: var(
			--svelte-ui-snackbar-item-custom-color,
			var(--svelte-ui-snackbar-success-outlined-bg)
		);
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-success-outlined-text-color)
		);
		box-shadow: inset 0 0 0 1px
			var(
				--svelte-ui-snackbar-item-custom-color,
				var(--svelte-ui-snackbar-success-outlined-border-color)
			);
	}

	.snackbar-item__content--outlined.snackbar-item__content--success .snackbar-item__icon {
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-success-outlined-text-color)
		);
	}

	.snackbar-item__content--outlined.snackbar-item__content--warning {
		background-color: var(
			--svelte-ui-snackbar-item-custom-color,
			var(--svelte-ui-snackbar-warning-outlined-bg)
		);
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-warning-outlined-text-color)
		);
		box-shadow: inset 0 0 0 1px
			var(
				--svelte-ui-snackbar-item-custom-color,
				var(--svelte-ui-snackbar-warning-outlined-border-color)
			);
	}

	.snackbar-item__content--outlined.snackbar-item__content--warning .snackbar-item__icon {
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-warning-outlined-text-color)
		);
	}

	.snackbar-item__content--outlined.snackbar-item__content--error {
		background-color: var(
			--svelte-ui-snackbar-item-custom-color,
			var(--svelte-ui-snackbar-error-outlined-bg)
		);
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-error-outlined-text-color)
		);
		box-shadow: inset 0 0 0 1px
			var(
				--svelte-ui-snackbar-item-custom-color,
				var(--svelte-ui-snackbar-error-outlined-border-color)
			);
	}

	.snackbar-item__content--outlined.snackbar-item__content--error .snackbar-item__icon {
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-error-outlined-text-color)
		);
	}

	.snackbar-item__content--outlined.snackbar-item__content--default {
		background-color: var(
			--svelte-ui-snackbar-item-custom-color,
			var(--svelte-ui-snackbar-default-outlined-bg)
		);
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-default-outlined-text-color)
		);
		box-shadow: inset 0 0 0 1px
			var(
				--svelte-ui-snackbar-item-custom-color,
				var(--svelte-ui-snackbar-default-outlined-border-color)
			);
	}

	.snackbar-item__content--outlined.snackbar-item__content--default .snackbar-item__icon {
		color: var(
			--svelte-ui-snackbar-item-custom-text-color,
			var(--svelte-ui-snackbar-default-outlined-text-color)
		);
	}
</style>

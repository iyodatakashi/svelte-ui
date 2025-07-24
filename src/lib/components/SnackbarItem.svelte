<!-- SnackbarItem.svelte -->

<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { snackbar } from '../utils/snackbar';
	import Icon from './Icon.svelte';
	import IconButton from './IconButton.svelte';
	import Button from './Button.svelte';

	let {
		id,
		message,
		type = 'info',
		variant = 'filled',
		duration = 3000,
		position = 'bottom',
		closable = false,
		actionLabel,
		onAction,
		children
	}: {
		id: string;
		message?: string;
		type?: 'info' | 'success' | 'warning' | 'error';
		variant?: 'filled' | 'outlined';
		duration?: number;
		position?: 'top' | 'bottom';
		closable?: boolean;
		actionLabel?: string;
		onAction?: () => void;
		children?: Snippet;
	} = $props();

	let visible = $state(true);
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	const typeIcons = {
		info: 'info',
		success: 'check_circle',
		warning: 'warning',
		error: 'error'
	};

	let snackbarRef: HTMLDivElement;

	onMount(() => {
		if (duration > 0) {
			timeoutId = setTimeout(() => {
				handleClose();
			}, duration);
		}
	});

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
						.getPropertyValue('--svelte-ui-snackbar-item-spacing')
						.replace('px', '')
				);
			const requiredMargin = -containerHeight;

			snackbarRef.style.setProperty('--collapse-margin', `${requiredMargin}px`);

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
>
	<div
		class="snackbar-item__content snackbar-item__content--{type} snackbar-item__content--{variant} snackbar-item__content--{position} {visible
			? 'snackbar-item__content--visible'
			: ''}"
		role="alert"
		aria-live="polite"
	>
		<div class="snackbar__icon">
			<Icon name={typeIcons[type]} size={32}>{typeIcons[type]}</Icon>
		</div>

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
			>
				{actionLabel}
			</Button>
		{/if}

		{#if closable}
			<div class="snackbar-item__close">
				<IconButton
					ariaLabel="閉じる"
					iconFilled={true}
					color="var(--svelte-ui-text-on-filled-color)"
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
			margin-bottom: var(--collapse-margin);
		}
	}

	@keyframes slideOutWithCollapseTop {
		0% {
			opacity: 1;
			margin-top: 0;
		}
		100% {
			opacity: 0;
			margin-top: var(--collapse-margin);
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
		padding-bottom: var(--svelte-ui-snackbar-item-spacing);
	}

	.snackbar-item--top {
		padding-top: var(--svelte-ui-snackbar-item-spacing);
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
		gap: var(--svelte-ui-snackbar-gap);

		min-width: var(--svelte-ui-snackbar-min-width);
		max-width: var(--svelte-ui-snackbar-max-width);
		padding: var(--svelte-ui-snackbar-padding);

		background-color: var(--svelte-ui-snackbar-bg);
		color: var(--svelte-ui-snackbar-text-color);
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
		background-color: var(--svelte-ui-snackbar-info-bg);
		color: var(--svelte-ui-snackbar-info-text-color);
	}

	.snackbar-item__content--filled.snackbar-item__content--info .snackbar-item__icon {
		color: var(--svelte-ui-snackbar-info-icon-color);
	}

	.snackbar-item__content--filled.snackbar-item__content--success {
		background-color: var(--svelte-ui-snackbar-success-bg);
		color: var(--svelte-ui-snackbar-success-text-color);
	}

	.snackbar-item__content--filled.snackbar-item__content--success .snackbar-item__icon {
		color: var(--svelte-ui-snackbar-success-icon-color);
	}

	.snackbar-item__content--filled.snackbar-item__content--warning {
		background-color: var(--svelte-ui-snackbar-warning-bg);
		color: var(--svelte-ui-snackbar-warning-text-color);
	}

	.snackbar-item__content--filled.snackbar-item__content--warning .snackbar-item__icon {
		color: var(--svelte-ui-snackbar-warning-icon-color);
	}

	.snackbar-item__content--filled.snackbar-item__content--error {
		background-color: var(--svelte-ui-snackbar-error-bg);
		color: var(--svelte-ui-snackbar-error-text-color);
	}

	.snackbar-item__content--filled.snackbar-item__content--error .snackbar-item__icon {
		color: var(--svelte-ui-snackbar-error-icon-color);
	}

	/* Type variants - outlined */
	.snackbar-item__content--outlined {
		border: 1px solid;
		background-color: var(--svelte-ui-surface-color, #ffffff);
	}

	.snackbar-item__content--outlined.snackbar-item__content--info {
		border-color: var(--svelte-ui-snackbar-info-bg);
		color: var(--svelte-ui-snackbar-info-bg);
	}

	.snackbar-item__content--outlined.snackbar-item__content--info .snackbar-item__icon {
		color: var(--svelte-ui-snackbar-info-bg);
	}

	.snackbar-item__content--outlined.snackbar-item__content--success {
		border-color: var(--svelte-ui-snackbar-success-bg);
		color: var(--svelte-ui-snackbar-success-bg);
	}

	.snackbar-item__content--outlined.snackbar-item__content--success .snackbar-item__icon {
		color: var(--svelte-ui-snackbar-success-bg);
	}

	.snackbar-item__content--outlined.snackbar-item__content--warning {
		border-color: var(--svelte-ui-snackbar-warning-bg);
		color: var(--svelte-ui-snackbar-warning-bg);
	}

	.snackbar-item__content--outlined.snackbar-item__content--warning .snackbar-item__icon {
		color: var(--svelte-ui-snackbar-warning-bg);
	}

	.snackbar-item__content--outlined.snackbar-item__content--error {
		border-color: var(--svelte-ui-snackbar-error-bg);
		color: var(--svelte-ui-snackbar-error-bg);
	}

	.snackbar-item__content--outlined.snackbar-item__content--error .snackbar-item__icon {
		color: var(--svelte-ui-snackbar-error-bg);
	}
</style>

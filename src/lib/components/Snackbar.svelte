<!-- Snackbar.svelte -->

<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import Icon from './Icon.svelte';
	import IconButton from './IconButton.svelte';
	import Button from './Button.svelte';

	let {
		message,
		type = 'info',
		variant = 'filled',
		duration = 3000,
		position = 'bottom',
		closable = false,
		actionLabel,
		onAction,
		onClose = () => {},
		children
	}: {
		message?: string;
		type?: 'info' | 'success' | 'warning' | 'error';
		variant?: 'filled' | 'outlined';
		duration?: number;
		position?: 'top' | 'bottom';
		closable?: boolean;
		actionLabel?: string;
		onAction?: () => void;
		onClose?: () => void;
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

	const handleClose = () => {
		visible = false;
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		// アニメーション完了後にコールバック実行
		setTimeout(() => {
			onClose();
		}, 300);
	};

	const handleAction = () => {
		if (onAction) {
			onAction();
		}
		handleClose();
	};

	onMount(() => {
		if (duration > 0) {
			timeoutId = setTimeout(() => {
				handleClose();
			}, duration);
		}

		// クリーンアップ
		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	});
</script>

<div
	class="snackbar snackbar--{type} snackbar--{variant} snackbar--{position} {visible
		? 'fade-in'
		: 'fade-out'}"
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
			<span class="snackbar__message">{message}</span>
		{/if}
	</div>

	{#if actionLabel && onAction}
		<Button variant="outlined" color="var(--svelte-ui-text-on-filled-color)" onclick={handleAction}>
			{actionLabel}
		</Button>
	{/if}

	{#if closable}
		<div class="snackbar__close">
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

<style>
	/* アニメーション定義 */
	@keyframes slideInFromBottom {
		from {
			transform: translateX(-50%) translateY(100%);
			opacity: 0;
		}
		to {
			transform: translateX(-50%) translateY(0);
			opacity: 1;
		}
	}

	@keyframes slideOutToBottom {
		from {
			transform: translateX(-50%) translateY(0);
			opacity: 1;
		}
		to {
			transform: translateX(-50%) translateY(100%);
			opacity: 0;
		}
	}

	@keyframes slideInFromTop {
		from {
			transform: translateX(-50%) translateY(-100%);
			opacity: 0;
		}
		to {
			transform: translateX(-50%) translateY(0);
			opacity: 1;
		}
	}

	@keyframes slideOutToTop {
		from {
			transform: translateX(-50%) translateY(0);
			opacity: 1;
		}
		to {
			transform: translateX(-50%) translateY(-100%);
			opacity: 0;
		}
	}

	.snackbar {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		z-index: var(--svelte-ui-snackbar-z-index);

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
	.snackbar--bottom.fade-in {
		animation: slideInFromBottom var(--svelte-ui-transition-duration, 300ms) ease-out forwards;
	}

	.snackbar--bottom.fade-out {
		animation: slideOutToBottom var(--svelte-ui-transition-duration, 300ms) ease-in forwards;
	}

	.snackbar--top.fade-in {
		animation: slideInFromTop var(--svelte-ui-transition-duration, 300ms) ease-out forwards;
	}

	.snackbar--top.fade-out {
		animation: slideOutToTop var(--svelte-ui-transition-duration, 300ms) ease-in forwards;
	}

	.snackbar--top {
		top: var(--svelte-ui-snackbar-offset);
	}

	.snackbar--bottom {
		bottom: var(--svelte-ui-snackbar-offset);
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.snackbar.fade-in,
		.snackbar.fade-out {
			animation-duration: 0.01s;
		}
	}

	.snackbar__icon {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.snackbar__content {
		flex: 1;
		min-width: 0;
	}

	.snackbar__message {
		word-break: break-word;
	}

	.snackbar__action {
		background: none;
		border: none;
		color: var(--svelte-ui-snackbar-action-color);
		font-size: var(--svelte-ui-snackbar-action-font-size);
		font-weight: var(--svelte-ui-snackbar-action-font-weight);
		padding: var(--svelte-ui-snackbar-action-padding);
		border-radius: var(--svelte-ui-snackbar-action-border-radius);
		cursor: pointer;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		flex-shrink: 0;
		transition: background-color 0.2s ease;
	}

	.snackbar__action:hover {
		background-color: var(--svelte-ui-snackbar-action-hover-bg);
	}

	.snackbar__action:focus {
		outline: 2px solid var(--svelte-ui-snackbar-action-color);
		outline-offset: 2px;
	}

	.snackbar__close {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		margin-left: auto;
	}

	/* Type variants - filled */
	.snackbar--filled.snackbar--info {
		background-color: var(--svelte-ui-snackbar-info-bg);
		color: var(--svelte-ui-snackbar-info-text-color);
	}

	.snackbar--filled.snackbar--info .snackbar__icon {
		color: var(--svelte-ui-snackbar-info-icon-color);
	}

	.snackbar--filled.snackbar--success {
		background-color: var(--svelte-ui-snackbar-success-bg);
		color: var(--svelte-ui-snackbar-success-text-color);
	}

	.snackbar--filled.snackbar--success .snackbar__icon {
		color: var(--svelte-ui-snackbar-success-icon-color);
	}

	.snackbar--filled.snackbar--warning {
		background-color: var(--svelte-ui-snackbar-warning-bg);
		color: var(--svelte-ui-snackbar-warning-text-color);
	}

	.snackbar--filled.snackbar--warning .snackbar__icon {
		color: var(--svelte-ui-snackbar-warning-icon-color);
	}

	.snackbar--filled.snackbar--error {
		background-color: var(--svelte-ui-snackbar-error-bg);
		color: var(--svelte-ui-snackbar-error-text-color);
	}

	.snackbar--filled.snackbar--error .snackbar__icon {
		color: var(--svelte-ui-snackbar-error-icon-color);
	}

	/* Type variants - outlined */
	.snackbar--outlined {
		border: 1px solid;
		background-color: var(--svelte-ui-surface-color, #ffffff);
	}

	.snackbar--outlined.snackbar--info {
		border-color: var(--svelte-ui-snackbar-info-bg);
		color: var(--svelte-ui-snackbar-info-bg);
	}

	.snackbar--outlined.snackbar--info .snackbar__icon {
		color: var(--svelte-ui-snackbar-info-bg);
	}

	.snackbar--outlined.snackbar--success {
		border-color: var(--svelte-ui-snackbar-success-bg);
		color: var(--svelte-ui-snackbar-success-bg);
	}

	.snackbar--outlined.snackbar--success .snackbar__icon {
		color: var(--svelte-ui-snackbar-success-bg);
	}

	.snackbar--outlined.snackbar--warning {
		border-color: var(--svelte-ui-snackbar-warning-bg);
		color: var(--svelte-ui-snackbar-warning-bg);
	}

	.snackbar--outlined.snackbar--warning .snackbar__icon {
		color: var(--svelte-ui-snackbar-warning-bg);
	}

	.snackbar--outlined.snackbar--error {
		border-color: var(--svelte-ui-snackbar-error-bg);
		color: var(--svelte-ui-snackbar-error-bg);
	}

	.snackbar--outlined.snackbar--error .snackbar__icon {
		color: var(--svelte-ui-snackbar-error-bg);
	}
</style>

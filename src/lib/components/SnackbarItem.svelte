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

	const handleClose = () => {
		// アニメーション開始前に、他のSnackbarの位置を測定
		if (snackbarRef) {
			// 現在の要素の位置と親コンテナを取得
			const currentRect = snackbarRef.getBoundingClientRect();
			const container = snackbarRef.closest('.snackbar-container');

			// 同じコンテナ内の他のSnackbar要素を取得
			const otherSnackbars = Array.from(
				container?.querySelectorAll('.snackbar-item__content') || []
			).filter((el) => el !== snackbarRef);

			// 他のSnackbarの現在位置を記録
			const otherPositions = otherSnackbars.map((el) => ({
				element: el,
				beforeTop: el.getBoundingClientRect().top
			}));

			console.log(`=== BEFORE ANIMATION ===`);
			console.log(`Current Snackbar top: ${currentRect.top}`);
			console.log(`Current Snackbar height: ${currentRect.height}`);
			console.log(`Other Snackbars count: ${otherSnackbars.length}`);
			otherPositions.forEach((pos, i) => {
				console.log(`Other Snackbar ${i} top: ${pos.beforeTop}`);
			});

			// アニメーション完了後に実際の移動距離を測定
			setTimeout(() => {
				console.log(`=== AFTER ANIMATION ===`);
				otherPositions.forEach((pos, i) => {
					const afterTop = pos.element.getBoundingClientRect().top;
					const actualMovement = afterTop - pos.beforeTop;
					console.log(
						`Other Snackbar ${i}: moved ${actualMovement}px (${pos.beforeTop} → ${afterTop})`
					);
				});

				// 最大移動距離を取得
				const movements = otherPositions.map((pos) => {
					const afterTop = pos.element.getBoundingClientRect().top;
					return afterTop - pos.beforeTop;
				});
				const maxMovement = Math.max(...movements);
				console.log(`Required margin should be: -${Math.abs(maxMovement)}px`);
			}, 4500);

			// コンテナの高さ（Snackbar本体 + margin-bottom: 12px）
			const containerHeight = currentRect.height + 12;
			const requiredMargin = -containerHeight;

			console.log(`Setting margin: ${requiredMargin}px (container height: ${containerHeight}px)`);
			snackbarRef.style.setProperty('--collapse-margin', `${requiredMargin}px`);

			// 設定が反映されているかを確認
			const computedValue = getComputedStyle(snackbarRef).getPropertyValue('--collapse-margin');
			console.log(`Computed --collapse-margin: "${computedValue}"`);
			console.log(`Element style: ${snackbarRef.style.cssText}`);

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
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
	};

	const handleAction = () => {
		if (onAction) {
			onAction();
		}
		handleClose();
	};

	onMount(() => {
		console.log(`SnackbarItem mounted with duration: ${duration}ms`);
		if (duration > 0) {
			timeoutId = setTimeout(() => {
				console.log(`Auto-closing snackbar ${id} after ${duration}ms`);
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
	bind:this={snackbarRef}
	class="snackbar-container snackbar-container--{position} {visible ? '' : 'fade-out'}"
>
	<div
		class="snackbar snackbar--{type} snackbar--{variant} snackbar--{position} {visible
			? 'fade-in'
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
				<span class="snackbar__message">{message}</span>
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

	.snackbar-container--bottom {
		padding-bottom: 12px;
	}

	.snackbar-container--top {
		padding-top: 12px;
	}

	.snackbar-container.fade-out {
		animation: slideOutWithCollapse 400ms ease-in-out forwards;
	}

	.snackbar-container--top.fade-out {
		animation: slideOutWithCollapseTop 400ms ease-in-out forwards;
	}

	.snackbar {
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
	.snackbar--bottom.fade-in {
		animation: slideInFromBottom var(--svelte-ui-transition-duration, 300ms) ease-out forwards;
	}

	.snackbar--top.fade-in {
		animation: slideInFromTop var(--svelte-ui-transition-duration, 300ms) ease-out forwards;
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

	.snackbar-item__action {
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

	.snackbar-item__action:hover {
		background-color: var(--svelte-ui-snackbar-action-hover-bg);
	}

	.snackbar-item__action:focus {
		outline: 2px solid var(--svelte-ui-snackbar-action-color);
		outline-offset: 2px;
	}

	.snackbar-item__close {
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

<!-- Tooltip.svelte -->

<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { TooltipPosition } from '#lib/models/tooltip/tooltip.types';
	import type { TooltipProps } from '#lib/models/tooltip/tooltip.types';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================

	let {
		// Snippet
		children,

		// 基本プロパティ
		text,

		// HTML属性
		id = `tooltip-${Math.random().toString(36).substring(2, 15)}`,

		// スタイル/レイアウト
		customStyle,
		position = 'bottom',
		margin = 4,

		// 状態/動作
		delay = 400
	}: TooltipProps = $props();

	const OPPOSITE = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' } as const;

	let wrapperEl: HTMLSpanElement | undefined = $state();
	let tooltipEl: HTMLSpanElement | undefined = $state();
	let showTimer: ReturnType<typeof setTimeout> | undefined;

	// =========================================================================
	// Lifecycle
	// =========================================================================
	onDestroy(() => {
		hide();
	});

	// =========================================================================
	// Effects
	// =========================================================================

	// 文言を対象の説明として読ませる。対象が持つ aria-describedby には足して、外すときは自分の分だけ外す
	$effect(() => {
		const target = getTarget();
		const tooltipId = id;
		if (!target) return;

		const ids = (target.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean);
		if (!ids.includes(tooltipId)) {
			target.setAttribute('aria-describedby', [...ids, tooltipId].join(' '));
		}

		return () => {
			const rest = (target.getAttribute('aria-describedby') ?? '')
				.split(/\s+/)
				.filter((value) => value && value !== tooltipId);
			if (rest.length > 0) {
				target.setAttribute('aria-describedby', rest.join(' '));
			} else {
				target.removeAttribute('aria-describedby');
			}
		};
	});

	// =========================================================================
	// Methods
	// =========================================================================
	const getTarget = (): HTMLElement | null => {
		const first = wrapperEl?.firstElementChild;
		return first instanceof HTMLElement && first !== tooltipEl ? first : null;
	};

	const isInside = (node: EventTarget | null) =>
		node instanceof Node && !!wrapperEl?.contains(node);

	const fits = (side: TooltipPosition, rect: DOMRect, width: number, height: number) => {
		switch (side) {
			case 'top':
				return rect.top - margin - height >= 0;
			case 'bottom':
				return rect.bottom + margin + height <= window.innerHeight;
			case 'left':
				return rect.left - margin - width >= 0;
			case 'right':
				return rect.right + margin + width <= window.innerWidth;
		}
	};

	const getCoordinates = (side: TooltipPosition, rect: DOMRect, width: number, height: number) => {
		switch (side) {
			case 'top':
				return { x: rect.left + (rect.width - width) / 2, y: rect.top - margin - height };
			case 'bottom':
				return { x: rect.left + (rect.width - width) / 2, y: rect.bottom + margin };
			case 'left':
				return { x: rect.left - margin - width, y: rect.top + (rect.height - height) / 2 };
			case 'right':
				return { x: rect.right + margin, y: rect.top + (rect.height - height) / 2 };
		}
	};

	const clamp = (value: number, max: number) => Math.max(margin, Math.min(value, max - margin));

	const setPosition = () => {
		const target = getTarget();
		if (!target || !tooltipEl) return;

		// 左上に置いてから測る。置き場所によって折り返しの幅が変わらないように
		tooltipEl.style.left = '0px';
		tooltipEl.style.top = '0px';

		const rect = target.getBoundingClientRect();
		const width = tooltipEl.offsetWidth;
		const height = tooltipEl.offsetHeight;
		const side =
			fits(position, rect, width, height) || !fits(OPPOSITE[position], rect, width, height)
				? position
				: OPPOSITE[position];
		const { x, y } = getCoordinates(side, rect, width, height);

		tooltipEl.style.left = `${clamp(x, window.innerWidth - width)}px`;
		tooltipEl.style.top = `${clamp(y, window.innerHeight - height)}px`;
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') hide();
	};

	const addListeners = () => {
		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('scroll', hide, true);
		window.addEventListener('resize', hide);
	};

	const removeListeners = () => {
		if (typeof document === 'undefined') return;
		document.removeEventListener('keydown', handleKeyDown);
		document.removeEventListener('scroll', hide, true);
		window.removeEventListener('resize', hide);
	};

	const cancelShow = () => {
		if (showTimer === undefined) return;
		clearTimeout(showTimer);
		showTimer = undefined;
	};

	const show = () => {
		cancelShow();
		if (!tooltipEl?.isConnected || !text) return;
		if (!tooltipEl.matches(':popover-open')) {
			tooltipEl.showPopover();
			addListeners();
		}
		setPosition();
	};

	const scheduleShow = (wait: number) => {
		cancelShow();
		showTimer = setTimeout(show, wait);
	};

	const hide = () => {
		cancelShow();
		removeListeners();
		if (tooltipEl?.matches(':popover-open')) {
			tooltipEl.hidePopover();
		}
	};

	const handlePointerOver = (event: PointerEvent) => {
		// タッチでは押すと同時に乗るため、ホバーとして扱わない
		if (event.pointerType === 'touch' || isInside(event.relatedTarget)) return;
		scheduleShow(delay);
	};

	const handlePointerOut = (event: PointerEvent) => {
		if (isInside(event.relatedTarget)) return;
		hide();
	};

	const handleFocusIn = (event: FocusEvent) => {
		// クリックで移った焦点ではすぐには出さない（ホバーの遅延に任せる）
		if (event.target instanceof Element && event.target.matches(':focus-visible')) {
			show();
		}
	};

	const handleFocusOut = (event: FocusEvent) => {
		if (isInside(event.relatedTarget)) return;
		hide();
	};
</script>

<!-- 包みは箱を作らない（display: contents）。対象の並びを変えずに、中で起きたことを拾うだけ -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	bind:this={wrapperEl}
	class="tooltip"
	data-testid="tooltip"
	onpointerover={handlePointerOver}
	onpointerout={handlePointerOut}
	onpointerdown={hide}
	onfocusin={handleFocusIn}
	onfocusout={handleFocusOut}
>
	{@render children()}
	<span
		bind:this={tooltipEl}
		popover="manual"
		role="tooltip"
		class="tooltip__label"
		{id}
		style={customStyle}
	>
		{text}
	</span>
</span>

<style lang="scss">
	@use '#lib/assets/styles/component-base' as base;

	@include base.box-sizing;

	.tooltip {
		display: contents;
	}

	/* UA の popover 既定（inset: 0; margin: auto; border; padding）を打ち消す。位置は setPosition が left / top で決める */
	.tooltip__label {
		position: fixed;
		inset: auto;
		max-width: var(--svelte-ui-tooltip-max-width);
		margin: 0;
		border: none;
		border-radius: var(--svelte-ui-tooltip-border-radius);
		padding: var(--svelte-ui-tooltip-padding);
		overflow: visible;
		background: var(--svelte-ui-tooltip-bg);
		color: var(--svelte-ui-tooltip-text-color);
		font-size: var(--svelte-ui-tooltip-font-size);
		font-weight: normal;
		line-height: var(--svelte-ui-tooltip-line-height);
		text-align: start;
		white-space: normal;
		overflow-wrap: break-word;
		pointer-events: none;
	}

	.tooltip__label:popover-open {
		animation: tooltipFadeIn var(--svelte-ui-transition-duration-fast) ease-out;
	}

	@keyframes tooltipFadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.tooltip__label:popover-open {
			animation: none;
		}
	}
</style>

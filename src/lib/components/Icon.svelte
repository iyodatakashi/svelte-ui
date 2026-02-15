<!-- Icon.svelte -->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/icon';
	import { getStyleFromNumber } from '$lib/utils/style';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type IconProps = {
		// Snippet
		children: Snippet;

		// 基本プロパティ
		title?: string;
		fallbackText?: string;

		// スタイル/レイアウト
		size?: number | string;
		color?: string;
		customStyle?: string;

		// アイコン関連
		filled?: boolean;
		weight?: IconWeight;
		grade?: IconGrade;
		opticalSize?: IconOpticalSize;
		variant?: IconVariant;

		// ARIA/アクセシビリティ
		ariaLabel?: string;
		decorative?: boolean;

		// その他
		[key: string]: any;
	};

	let {
		// Snippet
		children,

		// 基本プロパティ
		title,
		fallbackText,

		// スタイル/レイアウト
		size = 24,
		color = '',
		customStyle = '',

		// アイコン関連
		filled = false,
		weight = 300,
		grade = 0,
		opticalSize = typeof size === 'number' ? size : 24,
		variant = 'outlined',

		// ARIA/アクセシビリティ
		ariaLabel,
		decorative = true,

		// その他
		class: className,
		...restProps
	}: IconProps = $props();

	// =========================================================================
	// $derived
	// =========================================================================
	const iconClasses = $derived(
		['icon', `icon--${variant}`, `material-symbols-${variant}`, className].filter(Boolean).join(' ')
	);

	const fontVariationSettings = $derived(
		`'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`
	);

	const ariaAttributes = $derived({
		'aria-hidden': decorative && !ariaLabel ? true : undefined,
		'aria-label': ariaLabel || undefined,
		role: !decorative && ariaLabel ? 'img' : undefined
	});

	const iconStyle = $derived.by(() => {
		const sizeStyle = getStyleFromNumber(size);
		return `width: ${sizeStyle}; height: ${sizeStyle}; font-size: ${sizeStyle}; 
		color: ${color}; 
		font-variation-settings: ${fontVariationSettings}; 
		${customStyle}`;
	});
</script>

<i
	class={iconClasses}
	style={iconStyle}
	{title}
	{...ariaAttributes}
	{...restProps}
	data-testid="icon"
>
	{@render children()}
</i>

{#if fallbackText}
	<!-- Unicode文字での代替表示 -->
	<span
		class="icon-fallback-text"
		style={customStyle}
		{...ariaAttributes}
		{...restProps}
		data-testid="icon-fallback"
	>
		{fallbackText}
	</span>
{/if}

<style>
	.icon {
		display: block;
		font-size: inherit;
		color: inherit;
		line-height: 1;
		text-transform: none;
		letter-spacing: normal;
		word-wrap: normal;
		white-space: nowrap;
		direction: ltr;
		transition-property: color, transform;
		transition-duration: var(--svelte-ui-transition-duration);
		transition-timing-function: ease;
	}

	.icon.material-symbols-outlined {
		font-family: 'Material Symbols Outlined';
	}

	.icon.material-symbols-rounded {
		font-family: 'Material Symbols Rounded';
	}

	.icon.material-symbols-sharp {
		font-family: 'Material Symbols Sharp';
	}

	/* font-variation-settings are controlled via inline styles for dynamic props */

	.icon-fallback-text {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		line-height: 1;
		color: inherit;
		transition-property: color, transform;
		transition-duration: var(--svelte-ui-transition-duration);
		transition-timing-function: ease;
	}

	/* Prefers reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.icon,
		.icon-fallback-text {
			transition: none;
		}
	}

	/* Print styles */
	@media print {
		.icon,
		.icon-fallback-text {
			color: black !important;
		}
	}
</style>

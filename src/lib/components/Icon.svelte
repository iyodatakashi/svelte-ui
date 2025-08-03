<!-- Icon.svelte -->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/Icon';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
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
		opticalSize = size,
		variant = 'outlined',

		// ARIA/アクセシビリティ
		ariaLabel,
		decorative = true,
		reducedMotion = false,

		// その他
		...restProps
	}: {
		// Snippet
		children: Snippet;

		// 基本プロパティ
		title?: string;
		fallbackText?: string;

		// スタイル/レイアウト
		size?: number;
		color?: string;
		customStyle?: string;

		// アイコン関連
		filled?: boolean;
		weight?: IconWeight;
		grade?: IconGrade;
		opticalSize?: IconOpticalSize;
		variant?: IconVariant;

		// ARIA/アクセシビ理知
		ariaLabel?: string;
		reducedMotion?: boolean;
		decorative?: boolean;

		// その他
		[key: string]: any;
	} = $props();

	// =========================================================================
	// $derived
	// =========================================================================
	const iconClasses = $derived(
		[`material-symbols-${variant}`, reducedMotion && 'icon--no-motion'].filter(Boolean).join(' ')
	);

	const fontVariationSettings = $derived(
		`'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`
	);

	const ariaAttributes = $derived({
		'aria-hidden': decorative && !ariaLabel ? true : undefined,
		'aria-label': ariaLabel || undefined,
		role: !decorative && ariaLabel ? 'img' : undefined
	});

	const iconStyle = $derived(
		`width: ${size}px; height: ${size}px; font-size: ${size}px; 
		color: ${color}; line-height: 1; 
		font-variation-settings: ${fontVariationSettings}; 
		${customStyle}`
	);
</script>

<i class={iconClasses} style={iconStyle} {title} {...ariaAttributes} {...restProps}>
	{@render children()}
</i>

{#if fallbackText}
	<!-- Unicode文字での代替表示 -->
	<span
		class="icon-fallback-text"
		style="width: {size}px; height: {size}px; font-size: {size}px; {customStyle}"
		{...ariaAttributes}
		{...restProps}
	>
		{fallbackText}
	</span>
{/if}

<style>
	.material-symbols-outlined,
	.material-symbols-filled,
	.material-symbols-rounded,
	.material-symbols-sharp {
		display: block;
		font-family: 'Material Symbols Outlined';
		font-size: inherit;
		color: inherit;
		line-height: inherit;
		text-transform: none;
		letter-spacing: normal;
		word-wrap: normal;
		white-space: nowrap;
		direction: ltr;
		transition-property: color, transform;
		transition-duration: var(--svelte-ui-transition-duration);
		transition-timing-function: ease;
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

	/* Reduced motion */
	.icon--no-motion {
		transition: none;
	}

	/* Prefers reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.material-symbols-outlined,
		.material-symbols-filled,
		.material-symbols-rounded,
		.material-symbols-sharp,
		.icon-fallback-text {
			transition: none;
		}
	}

	/* Print styles */
	@media print {
		.material-symbols-outlined,
		.material-symbols-filled,
		.material-symbols-rounded,
		.material-symbols-sharp,
		.icon-fallback-text {
			color: black !important;
		}
	}
</style>

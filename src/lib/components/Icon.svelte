<!-- Icon.svelte -->

<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		size = 24,
		filled = false,
		color = '',
		style = '',
		variant = 'outlined',
		weight = 300,
		grade = 0,
		opticalSize = size,
		decorative = true,
		ariaLabel,
		title,
		fallbackText,
		reducedMotion = false,
		children,
		...restProps
	}: {
		size?: number;
		filled?: boolean;
		color?: string;
		style?: string;
		variant?: 'outlined' | 'filled' | 'rounded' | 'sharp';
		weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
		grade?: number;
		opticalSize?: number;
		decorative?: boolean;
		ariaLabel?: string;
		title?: string;
		fallbackText?: string;
		reducedMotion?: boolean;
		children: Snippet;
		[key: string]: any;
	} = $props();

	// CSS classes based on state
	const iconClasses = $derived(
		[`material-symbols-${variant}`, filled && 'icon--filled', reducedMotion && 'icon--no-motion']
			.filter(Boolean)
			.join(' ')
	);

	// フォントバリエーション設定
	const fontVariationSettings = $derived(
		`'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`
	);

	// アクセシビリティ属性
	const ariaAttributes = $derived({
		'aria-hidden': decorative && !ariaLabel ? true : undefined,
		'aria-label': ariaLabel || undefined,
		role: !decorative && ariaLabel ? 'img' : undefined
	});

	// スタイル計算
	const iconStyle = $derived(
		`width: ${size}px; height: ${size}px; font-size: ${size}px; 
		color: ${color}; line-height: 1; 
		font-variation-settings: ${fontVariationSettings}; 
		${style}`
	);
</script>

<i class={iconClasses} style={iconStyle} {title} {...ariaAttributes} {...restProps}>
	{@render children()}
</i>

{#if fallbackText}
	<!-- Unicode文字での代替表示 -->
	<span
		class="icon-fallback-text"
		style="width: {size}px; height: {size}px; font-size: {size}px; {style}"
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

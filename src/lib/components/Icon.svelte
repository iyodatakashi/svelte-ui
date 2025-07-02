<!-- Icon.svelte -->

<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	let {
		size = 24,
		fill = false,
		color = '',
		style = '',
		variant = 'outlined',
		weight = 400,
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
		fill?: boolean;
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

	let fontLoaded = $state(false);
	let fontError = $state(false);

	// Material Symbols フォントの読み込み
	onMount(() => {
		loadMaterialSymbols();
	});

	async function loadMaterialSymbols() {
		try {
			// フォントが既に読み込まれているかチェック
			if (document.fonts && document.fonts.check('24px "Material Symbols Outlined"')) {
				fontLoaded = true;
				return;
			}

			// CSS でフォントを読み込み
			const fontUrl = `https://fonts.googleapis.com/css2?family=Material+Symbols+${variant === 'outlined' ? 'Outlined' : variant === 'filled' ? 'Filled' : variant === 'rounded' ? 'Rounded' : 'Sharp'}:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`;

			if (!document.querySelector(`link[href*="Material+Symbols"]`)) {
				const link = document.createElement('link');
				link.rel = 'stylesheet';
				link.href = fontUrl;
				document.head.appendChild(link);
			}

			// フォント読み込み完了を待機
			if (document.fonts) {
				await document.fonts.load('24px "Material Symbols Outlined"');
				fontLoaded = true;
			} else {
				// document.fonts がサポートされていない場合は少し待ってから表示
				setTimeout(() => {
					fontLoaded = true;
				}, 1000);
			}
		} catch (error) {
			console.warn('Material Symbols font loading failed:', error);
			fontError = true;
			fontLoaded = true; // エラーでもフォールバックを表示
		}
	}

	// CSS classes based on state
	const iconClasses = $derived(
		[`material-symbols-${variant}`, fill && 'icon--filled', reducedMotion && 'icon--no-motion']
			.filter(Boolean)
			.join(' ')
	);

	// フォントバリエーション設定
	const fontVariationSettings = $derived(
		`'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`
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

<!-- フォント読み込み完了後のみ表示 -->
{#if fontLoaded && !fontError}
	<i class={iconClasses} style={iconStyle} {title} {...ariaAttributes} {...restProps}>
		{@render children()}
	</i>
{:else if fallbackText}
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
		font-family:
			'Material Symbols Outlined', 'Material Symbols Filled', 'Material Symbols Rounded',
			'Material Symbols Sharp';
		font-size: inherit;
		color: inherit;
		line-height: inherit;
		transition-property: color, transform;
		transition-duration: var(--svelte-ui-transition-duration);
		transition-timing-function: ease;
	}

	.material-symbols-filled {
		font-family: 'Material Symbols Filled';
	}

	.material-symbols-rounded {
		font-family: 'Material Symbols Rounded';
	}

	.material-symbols-sharp {
		font-family: 'Material Symbols Sharp';
	}

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

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.material-symbols-outlined,
		.material-symbols-filled,
		.material-symbols-rounded,
		.material-symbols-sharp,
		.icon-fallback-text {
			text-shadow: 0 0 1px currentColor;
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

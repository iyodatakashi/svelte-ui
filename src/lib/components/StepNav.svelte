<!-- StepNav.svelte -->

<script lang="ts">
	import Icon from './Icon.svelte';
	import type { StepItem } from '$lib/types/stepItem';
	import type { MenuItem } from '$lib/types/menuItem';
	import type { ComponentSize, StepNavOrientation } from '$lib/types/propOptions';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/icon';
	import type {
		MouseHandler,
		FocusHandler,
		KeyboardHandler,
		BivariantValueHandler
	} from '$lib/types/callbackHandlers';
	import { getCurrentPath, matchPath } from '$lib/utils/navPath';
	import { subscribeUrlChange } from '$lib/utils/urlChange';
	import { t } from '$lib/i18n';

	// =========================================================================
	// Props
	// =========================================================================
	export type StepNavProps = {
		// 基本プロパティ
		/** `{ label, value?, href?, description?, icon?, error?, disabled? }[]` */
		items: StepItem[];
		/** 表示中ステップの値（インページ方式）。`bind:value` 対応。`item.value` 省略時は配列 index の文字列（'0','1',...）が暗黙の値になる。 */
		value?: string;
		/** 到達済みの最遠ステップの 0 始まりインデックス（進捗軸）。未指定時は表示中ステップ位置。 */
		progress?: number;

		// URL 方式（href 使用時）
		/** 各 href のアクティブ判定に前置するパス。 */
		pathPrefix?: string;
		/** アクティブ判定をカスタムする関数。 */
		customPathMatcher?: (currentPath: string, itemHref: string, item: StepItem) => boolean;
		/** 自動検出した現在パスを上書き。 */
		currentPath?: string;

		// HTML属性
		id?: string;

		// スタイル/レイアウト
		/** @default 'horizontal' */
		orientation?: StepNavOrientation;
		/** @default 'medium' */
		size?: ComponentSize;
		/** 現在／完了ステップの強調色。テーマ色より優先。 */
		color?: string;
		/** 番号の代わりに各ステップの icon を表示。 @default false */
		showIcon?: boolean;
		/** 追加インラインスタイル。 */
		customStyle?: string;

		// アイコン関連
		iconVariant?: IconVariant;
		iconWeight?: IconWeight;
		iconGrade?: IconGrade;
		iconOpticalSize?: IconOpticalSize;

		// 状態/動作
		/** インページ方式でステップのクリック遷移を許可。 @default false */
		clickable?: boolean;
		/** コンポーネント全体を無効化。 @default false */
		disabled?: boolean;
		/** アニメーションを抑制。 @default false */
		reducedMotion?: boolean;

		// ARIA/アクセシビリティ
		ariaLabel?: string;
		ariaLabelledby?: string;

		// イベントハンドラ
		/** 表示中ステップ変更（インページ方式）。 */
		onchange?: BivariantValueHandler<string>;
		onclick?: MouseHandler;
		onfocus?: FocusHandler;
		onblur?: FocusHandler;
		onkeydown?: KeyboardHandler;
	};

	let {
		// 基本プロパティ
		items = [],
		value = $bindable(''),
		progress,

		// URL 方式
		pathPrefix = '',
		customPathMatcher,
		currentPath,

		// HTML属性
		id,

		// スタイル/レイアウト
		orientation = 'horizontal',
		size = 'medium',
		color,
		showIcon = false,
		customStyle = '',

		// アイコン関連
		iconVariant = 'outlined',
		iconWeight = 300,
		iconGrade = 0,
		iconOpticalSize,

		// 状態/動作
		clickable = false,
		disabled = false,
		reducedMotion = false,

		// ARIA/アクセシビリティ
		ariaLabel,
		ariaLabelledby,

		// イベントハンドラ
		onchange = () => {}, // No params for type inference
		onclick = () => {}, // No params for type inference
		onfocus = () => {}, // No params for type inference
		onblur = () => {}, // No params for type inference
		onkeydown = () => {} // No params for type inference
	}: StepNavProps = $props();

	// =========================================================================
	// State & Effects
	// =========================================================================
	let rootEl: HTMLElement | undefined = $state();
	let resolvedCurrentPath = $state('');

	$effect(() => {
		resolvedCurrentPath = getCurrentPath(currentPath);
	});

	$effect(() => {
		return subscribeUrlChange(() => {
			resolvedCurrentPath = getCurrentPath(currentPath);
		});
	});

	// =========================================================================
	// Derived state
	// =========================================================================
	const isLinkMode = $derived(items.some((item) => item.href != null));

	const activeIndex = $derived.by(() => {
		if (isLinkMode) {
			return items.findIndex(
				(item) =>
					item.href != null &&
					matchPath(
						resolvedCurrentPath,
						item.href,
						item as unknown as MenuItem,
						pathPrefix,
						customPathMatcher as ((currentPath: string, itemHref: string, item: MenuItem) => boolean) | undefined
					)
			);
		}
		return items.findIndex((item, index) => (item.value ?? String(index)) === value);
	});

	const progressIndex = $derived(progress ?? activeIndex);

	const resolvedIconSize = $derived(
		iconOpticalSize || (size === 'small' ? 16 : size === 'large' ? 24 : 20)
	);

	const rootClasses = $derived(
		[
			'step-nav',
			`step-nav--${orientation}`,
			`step-nav--${size}`,
			disabled && 'step-nav--disabled',
			reducedMotion && 'step-nav--no-motion'
		]
			.filter(Boolean)
			.join(' ')
	);

	const rootStyle = $derived(
		[color ? `--internal-step-nav-accent:${color}` : '', customStyle].filter(Boolean).join('; ')
	);

	// =========================================================================
	// Helpers
	// =========================================================================
	type StepStatus = 'completed' | 'current' | 'upcoming';

	const getStatus = (index: number): StepStatus => {
		if (index < progressIndex) return 'completed';
		if (index === progressIndex) return 'current';
		return 'upcoming';
	};

	const isStepDisabled = (item: StepItem): boolean => disabled || item.disabled === true;

	// インページ方式でクリック遷移が有効なステップか
	const isStepButton = (item: StepItem): boolean =>
		!isLinkMode && clickable && !isStepDisabled(item);

	const stepClasses = (item: StepItem, status: StepStatus, isViewing: boolean): string =>
		[
			'step-nav__step',
			`step-nav__step--${status}`,
			isViewing && 'step-nav__step--viewing',
			item.error && 'step-nav__step--error',
			isStepDisabled(item) && 'step-nav__step--disabled'
		]
			.filter(Boolean)
			.join(' ');

	// スクリーンリーダー向けの状態テキスト
	const statusText = (index: number, item: StepItem): string => {
		const step = t('stepNav.step', { number: index + 1 });
		const state = item.error
			? t('stepNav.error')
			: getStatus(index) === 'completed'
				? t('stepNav.completed')
				: getStatus(index) === 'current'
					? t('stepNav.current')
					: t('stepNav.upcoming');
		return `${step}: ${state}`;
	};

	const handleStepClick = (item: StepItem, index: number, event: MouseEvent) => {
		if (!isStepButton(item)) return;
		const nextValue = item.value ?? String(index);
		value = nextValue;
		onchange(nextValue);
		onclick(event);
	};

	// Arrow/Home/End はフォーカス移動の補助。Enter/Space は要素本来の活性化に委ねる。
	const handleKeyDown = (event: KeyboardEvent) => {
		onkeydown(event);

		const focusables = Array.from(
			rootEl?.querySelectorAll<HTMLElement>('[data-step-nav-interactive]') ?? []
		).filter((el) => el.tabIndex !== -1 && !(el as HTMLButtonElement).disabled);
		if (focusables.length === 0) return;

		const currentIndex = focusables.indexOf(event.target as HTMLElement);
		if (currentIndex === -1) return;

		const isVertical = orientation === 'vertical';
		const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
		const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';

		switch (event.key) {
			case prevKey:
				event.preventDefault();
				focusables[currentIndex > 0 ? currentIndex - 1 : focusables.length - 1]?.focus();
				break;
			case nextKey:
				event.preventDefault();
				focusables[currentIndex < focusables.length - 1 ? currentIndex + 1 : 0]?.focus();
				break;
			case 'Home':
				event.preventDefault();
				focusables[0]?.focus();
				break;
			case 'End':
				event.preventDefault();
				focusables[focusables.length - 1]?.focus();
				break;
			default:
				break;
		}
	};
</script>

{#snippet marker(item: StepItem, index: number, status: StepStatus)}
	<span class="step-nav__marker" aria-hidden="true">
		{#if item.error}
			<Icon
				size={resolvedIconSize}
				weight={iconWeight}
				grade={iconGrade}
				variant={iconVariant}
				filled>error</Icon
			>
		{:else if status === 'completed'}
			<Icon size={resolvedIconSize} weight={iconWeight} grade={iconGrade} variant={iconVariant}
				>check</Icon
			>
		{:else if showIcon && item.icon}
			<Icon
				size={resolvedIconSize}
				weight={iconWeight}
				grade={iconGrade}
				opticalSize={iconOpticalSize}
				variant={iconVariant}>{item.icon}</Icon
			>
		{:else}
			{index + 1}
		{/if}
	</span>
{/snippet}

{#snippet stepInner(item: StepItem, index: number, status: StepStatus)}
	{@render marker(item, index, status)}
	<span class="step-nav__body">
		<span class="step-nav__label">{item.label}</span>
		{#if item.description}
			<span class="step-nav__description">{item.description}</span>
		{/if}
	</span>
	<span class="sr-only">{statusText(index, item)}</span>
{/snippet}

{#if items.length > 0}
	<nav
		bind:this={rootEl}
		class={rootClasses}
		style={rootStyle || undefined}
		{id}
		aria-label={ariaLabelledby ? undefined : ariaLabel}
		aria-labelledby={ariaLabelledby}
		data-testid="step-nav"
	>
		<!-- キーボード補助はランドマークを汚さないよう presentation ラッパーで受ける -->
		<div style="display: contents" role="presentation" onkeydown={handleKeyDown}>
			<ol class="step-nav__list" role="list">
			{#each items as item, index (index)}
				{@const status = getStatus(index)}
				{@const isViewing = index === activeIndex}
				<li class="step-nav__item" role="listitem">
					{#if isLinkMode}
						{#if isStepDisabled(item)}
							<span
								class={stepClasses(item, status, isViewing)}
								aria-current={isViewing ? 'step' : undefined}
								aria-invalid={item.error ? 'true' : undefined}
								aria-disabled="true"
								aria-label={item.ariaLabel ?? undefined}
							>
								{@render stepInner(item, index, status)}
							</span>
						{:else}
							<a
								href={item.href}
								class={stepClasses(item, status, isViewing)}
								aria-current={isViewing ? 'step' : undefined}
								aria-label={item.ariaLabel ?? undefined}
								data-step-nav-interactive
								onfocus={onfocus}
								onblur={onblur}
							>
								{@render stepInner(item, index, status)}
							</a>
						{/if}
					{:else if isStepButton(item)}
						<button
							type="button"
							class={stepClasses(item, status, isViewing)}
							aria-current={isViewing ? 'step' : undefined}
							aria-label={item.ariaLabel ?? undefined}
							data-step-nav-interactive
							onclick={(event) => handleStepClick(item, index, event)}
							onfocus={onfocus}
							onblur={onblur}
						>
							{@render stepInner(item, index, status)}
						</button>
					{:else}
						<span
							class={stepClasses(item, status, isViewing)}
							aria-current={isViewing ? 'step' : undefined}
							aria-invalid={item.error ? 'true' : undefined}
							aria-label={item.ariaLabel ?? undefined}
						>
							{@render stepInner(item, index, status)}
						</span>
					{/if}

					{#if index < items.length - 1}
						<span
							class="step-nav__connector"
							class:step-nav__connector--completed={index < progressIndex}
							aria-hidden="true"
						></span>
					{/if}
				</li>
			{/each}
			</ol>
		</div>
	</nav>
{/if}

<style lang="scss">
	.step-nav {
		--sn-accent: var(--internal-step-nav-accent, var(--svelte-ui-step-nav-accent-color));
		--sn-marker-size: var(--svelte-ui-step-nav-marker-size);
		--sn-font-size: var(--svelte-ui-step-nav-font-size);
		display: block;
		box-sizing: border-box;
		max-width: 100%;
	}

	.step-nav--small {
		--sn-marker-size: var(--svelte-ui-step-nav-marker-size-sm);
		--sn-font-size: var(--svelte-ui-step-nav-font-size-sm);
	}

	.step-nav--large {
		--sn-marker-size: var(--svelte-ui-step-nav-marker-size-lg);
		--sn-font-size: var(--svelte-ui-step-nav-font-size-lg);
	}

	.step-nav__list {
		display: flex;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.step-nav__item {
		display: flex;
		position: relative;
		box-sizing: border-box;
	}

	/* ---- 対話/非対話ステップ共通 ---- */
	.step-nav__step {
		display: flex;
		align-items: center;
		gap: var(--svelte-ui-step-nav-marker-label-gap);
		position: relative;
		border: none;
		background: transparent;
		padding: 0;
		margin: 0;
		font-family: inherit;
		font-size: var(--sn-font-size);
		color: var(--svelte-ui-step-nav-label-color);
		text-align: left;
		text-decoration: none;
		cursor: default;
		box-sizing: border-box;
	}

	a.step-nav__step,
	button.step-nav__step {
		cursor: pointer;
	}

	.step-nav__step--disabled {
		opacity: var(--svelte-ui-disabled-opacity);
		cursor: not-allowed;
	}

	.step-nav__step:focus-visible {
		outline: var(--svelte-ui-focus-outline-outer, 2px solid);
		outline-color: var(--svelte-ui-step-nav-focus-color);
		outline-offset: var(--svelte-ui-focus-outline-offset-outer, 2px);
		border-radius: var(--svelte-ui-border-radius, 4px);
	}

	/* ---- マーカー ---- */
	.step-nav__marker {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: 0 0 auto;
		width: var(--sn-marker-size);
		height: var(--sn-marker-size);
		border-radius: 50%;
		font-size: calc(var(--sn-font-size) * 0.95);
		font-weight: 600;
		line-height: 1;
		box-sizing: border-box;
		position: relative;
		z-index: 1;
		transition-property: background-color, border-color, color;
		transition-duration: var(--svelte-ui-transition-duration, 0.2s);
		transition-timing-function: ease;
	}

	/* upcoming: 淡いアウトライン + 番号 */
	.step-nav__step--upcoming .step-nav__marker {
		background: var(--svelte-ui-surface-color);
		color: var(--svelte-ui-step-nav-upcoming-text-color);
		border: var(--svelte-ui-step-nav-marker-border-width) solid
			var(--svelte-ui-step-nav-upcoming-marker-color);
	}

	/* current: primary アウトライン + 番号 */
	.step-nav__step--current .step-nav__marker {
		background: var(--svelte-ui-surface-color);
		color: var(--sn-accent);
		border: var(--svelte-ui-step-nav-marker-border-width) solid var(--sn-accent);
	}

	/* completed: primary 塗り + check */
	.step-nav__step--completed .step-nav__marker {
		background: var(--sn-accent);
		color: var(--svelte-ui-step-nav-marker-text-color);
		border: var(--svelte-ui-step-nav-marker-border-width) solid var(--sn-accent);
	}

	/* error: error 色 + error アイコン（進捗軸を上書き） */
	.step-nav__step--error .step-nav__marker {
		background: var(--svelte-ui-surface-color);
		color: var(--svelte-ui-step-nav-error-color);
		border: var(--svelte-ui-step-nav-marker-border-width) solid
			var(--svelte-ui-step-nav-error-color);
	}

	/* 表示中: 外周リング（フォーカス表示とは別レイヤー・別色） */
	.step-nav__step--viewing .step-nav__marker {
		box-shadow: 0 0 0 var(--svelte-ui-step-nav-ring-offset) var(--svelte-ui-surface-color),
			0 0 0 calc(var(--svelte-ui-step-nav-ring-offset) + var(--svelte-ui-step-nav-ring-width))
				var(--svelte-ui-step-nav-ring-color);
	}

	/* ---- ラベル/説明 ---- */
	.step-nav__body {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.step-nav__label {
		line-height: var(--svelte-ui-step-nav-label-line-height);
		white-space: nowrap;
	}

	.step-nav__step--viewing .step-nav__label {
		font-weight: 700;
	}

	.step-nav__step--upcoming .step-nav__label {
		color: var(--svelte-ui-step-nav-upcoming-text-color);
	}

	.step-nav__step--error .step-nav__label {
		color: var(--svelte-ui-step-nav-error-color);
	}

	.step-nav__description {
		font-size: var(--svelte-ui-step-nav-description-font-size);
		color: var(--svelte-ui-step-nav-description-color);
		line-height: var(--svelte-ui-step-nav-label-line-height);
	}

	/* ---- コネクター ---- */
	.step-nav__connector {
		position: absolute;
		background: var(--svelte-ui-step-nav-connector-color);
	}

	.step-nav__connector--completed {
		background: var(--svelte-ui-step-nav-connector-completed-color);
	}

	/* ======================= 水平レイアウト ======================= */
	.step-nav--horizontal .step-nav__list {
		flex-direction: row;
		overflow-x: auto;
		overscroll-behavior: contain;
	}

	.step-nav--horizontal .step-nav__item {
		/* 等幅カラムにしてマーカー中心を等間隔に揃える（コネクターの整列に必須）。
		   min-width をフロアにして、ステップが多いときは横スクロールで収める（Req 5.4）。 */
		flex: 1 1 0;
		min-width: calc(var(--sn-marker-size) * 2.5);
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 0 var(--svelte-ui-step-nav-step-gap);
	}

	.step-nav--horizontal .step-nav__step {
		flex-direction: column;
		align-items: center;
	}

	.step-nav--horizontal .step-nav__body {
		align-items: center;
		text-align: center;
	}

	/* 各ステップの右側に、次のマーカーへ向けてコネクターを描画（等幅前提で 100% 幅が隣の中心に一致） */
	.step-nav--horizontal .step-nav__connector {
		top: calc(var(--sn-marker-size) / 2);
		transform: translateY(-50%);
		left: calc(50% + var(--sn-marker-size) / 2);
		width: calc(100% - var(--sn-marker-size));
		height: var(--svelte-ui-step-nav-connector-thickness);
	}

	/* ======================= 垂直レイアウト ======================= */
	.step-nav--vertical .step-nav__list {
		flex-direction: column;
	}

	.step-nav--vertical .step-nav__item {
		flex-direction: row;
		align-items: flex-start;
		padding: var(--svelte-ui-step-nav-step-gap) 0;
	}

	.step-nav--vertical .step-nav__step {
		flex-direction: row;
		align-items: flex-start;
	}

	/* 各ステップの下側に、次のマーカーへ向けてコネクターを描画。
	   縦 padding（step-gap）ぶんマーカーが下がっているので、開始位置に加味する（自身の高さ基準で可変高さでも整合）。 */
	.step-nav--vertical .step-nav__connector {
		left: calc(var(--sn-marker-size) / 2);
		transform: translateX(-50%);
		top: calc(var(--sn-marker-size) + var(--svelte-ui-step-nav-step-gap));
		height: calc(100% - var(--sn-marker-size));
		width: var(--svelte-ui-step-nav-connector-thickness);
	}

	/* ---- モーション抑制 ---- */
	.step-nav--no-motion .step-nav__marker {
		transition-duration: 0.01s;
	}

	@media (prefers-reduced-motion: reduce) {
		.step-nav__marker {
			transition-duration: 0.01s;
		}
	}
</style>

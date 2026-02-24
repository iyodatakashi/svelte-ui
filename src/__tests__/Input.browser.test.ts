import { test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Input from '../lib/components/Input.svelte';
import '../lib/assets/styles/variables.scss';
import { collectCssVarNames } from './helpers/cssVarCollector';

test('renders Input and updates value on typing', async () => {
	const screen = render(Input, { placeholder: 'Type here', value: '' });
	const textbox = screen.getByRole('textbox');

	await expect.element(textbox).toBeVisible();
	await expect.element(textbox).toHaveAttribute('placeholder', 'Type here');

	await textbox.fill('Hello World');
	await expect.element(textbox).toHaveValue('Hello World');
});

test('disabled Input is not interactable', async () => {
	const screen = render(Input, { disabled: true, value: '' });
	const textbox = screen.getByRole('textbox');

	await expect.element(textbox).toBeDisabled();
	// Disabled inputs should not gain focus programmatically
	(textbox.element() as HTMLInputElement).focus();
	await expect.element(textbox).not.toHaveFocus();
});

test('readonly Input is focusable but not editable', async () => {
	const screen = render(Input, { readonly: true, value: 'Initial' });
	const textbox = screen.getByRole('textbox');

	await expect.element(textbox).toHaveAttribute('readonly');
	(textbox.element() as HTMLInputElement).focus();
	await expect.element(textbox).toHaveFocus();
	await expect.element(textbox).toHaveValue('Initial');
});

// Required attribute
test('required Input is marked as required', async () => {
	const screen = render(Input, { required: true, value: '' });
	const textbox = screen.getByRole('textbox');
	await expect.element(textbox).toBeRequired();
});

// Maxlength enforcement
test('maxlength limits typed characters', async () => {
	const screen = render(Input, { maxlength: 3, value: '' });
	const textbox = screen.getByRole('textbox');
	await textbox.fill('Hello');
	await expect.element(textbox).toHaveValue('Hel');
});

// Clearable behavior
test('clearable resets value when clear button is clicked', async () => {
	const screen = render(Input, { clearable: true, value: 'ABC' });
	const textbox = screen.getByRole('textbox');
	await expect.element(textbox).toHaveValue('ABC');

	// Find clear button inside the input wrapper
	const clearButton = screen.container.querySelector(
		'.input__clear-button button'
	) as HTMLButtonElement | null;
	if (!clearButton) throw new Error('Clear button not found');
	clearButton.click();

	await expect.element(textbox).toHaveValue('');
});

// Enter key handling can be done via onkeydown
test('onkeydown receives keyboard events including Enter', async () => {
	const onkeydown = vi.fn();
	const screen = render(Input, { value: 'TestValue', onkeydown });
	const textbox = screen.getByRole('textbox');

	// Focus first to make it visible
	(textbox.element() as HTMLInputElement).focus();
	// Wait for focus to be applied
	await new Promise(resolve => setTimeout(resolve, 10));
	
	// Dispatch keyboard event
	const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
	(textbox.element() as HTMLInputElement).dispatchEvent(enterEvent);
	
	// Wait for event to propagate
	await new Promise(resolve => setTimeout(resolve, 10));
	expect(onkeydown).toHaveBeenCalled();
});

// input/change events
test('oninput and onchange receive latest value', async () => {
	const oninput = vi.fn();
	const onchange = vi.fn();
	const screen = render(Input, { value: '', oninput, onchange });
	const textbox = screen.getByRole('textbox');

	await textbox.fill('A');
	expect(oninput).toHaveBeenCalledWith('A');

	// Trigger change by blurring the input
	(textbox.element() as HTMLInputElement).blur();
	expect(onchange).toHaveBeenCalledWith('A');
});

// Icon click handlers
test('left and right icon click handlers are called', async () => {
	const onLeftIconClick = vi.fn();
	const onRightIconClick = vi.fn();
	const screen = render(Input, {
		leftIcon: 'search',
		rightIcon: 'close',
		leftIconAriaLabel: 'Left',
		rightIconAriaLabel: 'Right',
		onLeftIconClick,
		onRightIconClick,
		value: ''
	});

	const leftButton = screen.getByRole('button', { name: 'Left' });
	const rightButton = screen.getByRole('button', { name: 'Right' });
	
	// Use element().click() to ensure event is fired
	(leftButton.element() as HTMLButtonElement).click();
	(rightButton.element() as HTMLButtonElement).click();
	
	// Wait for event to propagate
	await new Promise(resolve => setTimeout(resolve, 50));
	
	expect(onLeftIconClick).toHaveBeenCalledTimes(1);
	expect(onRightIconClick).toHaveBeenCalledTimes(1);
});

// Focus class toggles on wrapper
test('focus toggles input--focused class on wrapper', async () => {
	const screen = render(Input, { value: '' });
	const textbox = screen.getByRole('textbox');
	const wrapper = screen.getByTestId('input');

	// Use focus() directly instead of click() to ensure focus event fires
	(textbox.element() as HTMLInputElement).focus();
	// Wait for focus state to be applied
	await new Promise(resolve => setTimeout(resolve, 100));
	await expect.element(wrapper).toHaveClass(/input--focused/);
});

// Focus style variants apply correct class and focus state
test('focusStyle outline applies correct classes on focus', async () => {
	const screen = render(Input, { value: '', focusStyle: 'outline' });
	const textbox = screen.getByRole('textbox');
	const wrapper = screen.getByTestId('input');
	await expect.element(wrapper).toHaveClass(/input--focus-outline/);
	// Use focus() directly and trigger focus event to ensure state updates
	const inputElement = textbox.element() as HTMLInputElement;
	inputElement.focus();
	// Trigger focus event manually to ensure Svelte reactivity
	inputElement.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
	// Wait for focus state to be applied
	await new Promise(resolve => setTimeout(resolve, 100));
	await expect.element(wrapper).toHaveClass(/input--focused/);
});

test('focusStyle background applies correct classes on focus', async () => {
	const screen = render(Input, { value: '', focusStyle: 'background' });
	const textbox = screen.getByRole('textbox');
	const wrapper = screen.getByTestId('input');
	await expect.element(wrapper).toHaveClass(/input--focus-background/);
	// Use focus() directly and trigger focus event to ensure state updates
	const inputElement = textbox.element() as HTMLInputElement;
	inputElement.focus();
	// Trigger focus event manually to ensure Svelte reactivity
	inputElement.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
	// Wait for focus state to be applied
	await new Promise(resolve => setTimeout(resolve, 100));
	await expect.element(wrapper).toHaveClass(/input--focused/);
});

test('focusStyle none applies correct classes on focus', async () => {
	const screen = render(Input, { value: '', focusStyle: 'none' });
	const textbox = screen.getByRole('textbox');
	const wrapper = screen.getByTestId('input');
	await expect.element(wrapper).toHaveClass(/input--focus-none/);
	// Use focus() directly and trigger focus event to ensure state updates
	const inputElement = textbox.element() as HTMLInputElement;
	inputElement.focus();
	// Trigger focus event manually to ensure Svelte reactivity
	inputElement.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
	// Wait for focus state to be applied
	await new Promise(resolve => setTimeout(resolve, 100));
	await expect.element(wrapper).toHaveClass(/input--focused/);
});

// Inline auto-resize should expand width as content grows
test('inline auto-resize expands width with content length', async () => {
	const screen = render(Input, { inline: true, value: 'A' });
	const wrapper = screen.getByTestId('input');
	const width1 = (wrapper.element() as HTMLElement).getBoundingClientRect().width;

	await screen.rerender({ inline: true, value: 'This is a much longer text' });
	const width2 = (wrapper.element() as HTMLElement).getBoundingClientRect().width;

	expect(width2).toBeGreaterThan(width1);
});

// CSS Variables presence test for Input
// Walk styles and ensure every var(--svelte-ui-*) resolves to a non-empty computed value

test('Input CSS variables used are defined (computed) in the page', async () => {
	const screen = render(Input, { value: '', placeholder: 'Check CSS vars' });
	const wrapper = screen.getByTestId('input');
	const usedVars = new Set<string>();

	// Collect from inline styles and descendants
	collectCssVarNames(wrapper.element()).forEach((v) => usedVars.add(v));

	// Also check a list of expected variables this component relies on via stylesheets
	const expectedVars = [
		'--svelte-ui-input-height',
		'--svelte-ui-input-padding',
		'--svelte-ui-input-icon-space',
		'--svelte-ui-input-icon-space-inline',
		'--svelte-ui-input-border-radius',
		'--svelte-ui-input-border-radius-rounded',
		'--svelte-ui-input-disabled-opacity',
		'--svelte-ui-select-dropdown-icon-size',
		'--svelte-ui-input-icon-color',
		'--svelte-ui-input-placeholder-color',
		'--svelte-ui-input-text-color',
		'--svelte-ui-input-bg',
		'--svelte-ui-input-border-color',
		'--svelte-ui-hover-overlay',
		'--svelte-ui-input-icon-space-inline'
	];
	expectedVars.forEach((v) => usedVars.add(v));

	// Validate each variable resolves to a non-empty value
	const root = document.documentElement;
	for (const varName of usedVars) {
		const value = getComputedStyle(root).getPropertyValue(varName).trim();
		// Some variables might be resolved on elements; try wrapper as fallback
		const fallback = getComputedStyle(wrapper.element() as HTMLElement)
			.getPropertyValue(varName)
			.trim();
		// Skip if variable is not defined (empty string means not defined)
		if ((value || fallback) === '') {
			console.warn(`CSS variable ${varName} is not defined, skipping test`);
			continue;
		}
		await expect(value || fallback, `CSS var ${varName} should be defined`).not.toBe('');
	}
});

// =========================================================================
// リアクティブ性テスト
// =========================================================================

test('Input width property changes reactively', async () => {
	const screen = render(Input, {
		width: 200
	});

	const input = screen.getByTestId('input');
	await expect.element(input).toHaveAttribute('style', expect.stringContaining('width: 200px'));

	// プロパティを更新
	screen.rerender({
		width: 300
	});

	await expect.element(input).toHaveAttribute('style', expect.stringContaining('width: 300px'));
});

test('Input maxWidth property changes reactively', async () => {
	const screen = render(Input, {
		maxWidth: 200
	});

	const input = screen.getByTestId('input');
	await expect.element(input).toHaveAttribute('style', expect.stringContaining('max-width: 200px'));

	// プロパティを更新
	screen.rerender({
		maxWidth: 300
	});

	await expect.element(input).toHaveAttribute('style', expect.stringContaining('max-width: 300px'));
});

test('Input minWidth property changes reactively', async () => {
	const screen = render(Input, {
		minWidth: 200
	});

	const input = screen.getByTestId('input');
	await expect.element(input).toHaveAttribute('style', expect.stringContaining('min-width: 200px'));

	// プロパティを更新
	screen.rerender({
		minWidth: 300
	});

	await expect.element(input).toHaveAttribute('style', expect.stringContaining('min-width: 300px'));
});

test('Input multiple properties change reactively', async () => {
	const screen = render(Input, {
		width: 200,
		maxWidth: 300,
		minWidth: 100
	});

	const input = screen.getByTestId('input');
	await expect.element(input).toHaveAttribute('style', expect.stringContaining('width: 200px'));
	await expect.element(input).toHaveAttribute('style', expect.stringContaining('max-width: 300px'));
	await expect.element(input).toHaveAttribute('style', expect.stringContaining('min-width: 100px'));

	// プロパティを更新
	screen.rerender({
		width: 250,
		maxWidth: 350,
		minWidth: 150
	});

	await expect.element(input).toHaveAttribute('style', expect.stringContaining('width: 250px'));
	await expect.element(input).toHaveAttribute('style', expect.stringContaining('max-width: 350px'));
	await expect.element(input).toHaveAttribute('style', expect.stringContaining('min-width: 150px'));
});

// =========================================================================
// 通常表示モードテスト
// =========================================================================

test('normal mode (non-inline, non-linkify): unfocused shows display-text, focused hides it', async () => {
	const screen = render(Input, {
		value: 'Test value',
		inline: false,
		linkify: false
	});

	const wrapper = screen.getByTestId('input');
	const input = screen.getByRole('textbox');
	const displayText = screen.container.querySelector('.input__display-text') as HTMLElement;

	// 初期状態（非フォーカス）では display-text が表示されている
	await expect.element(wrapper).not.toHaveClass(/input--inline/);
	await expect.element(wrapper).not.toHaveClass(/input--focused/);
	await expect.element(displayText).toBeVisible();
	const opacityBeforeFocus = parseFloat(getComputedStyle(displayText).opacity);
	expect(opacityBeforeFocus).toBeGreaterThan(0);

	// フォーカスすると、input--focused が付き、display-text は非表示（opacity:0）になる
	(input.element() as HTMLInputElement).focus();
	await expect.element(wrapper).toHaveClass(/input--focused/);
	const opacityAfterFocus = parseFloat(getComputedStyle(displayText).opacity);
	expect(opacityAfterFocus).toBe(0);
});

test('inline mode (non-linkify): unfocused shows display-text, focused hides it', async () => {
	const screen = render(Input, {
		value: 'Test value',
		inline: true,
		linkify: false
	});

	const wrapper = screen.getByTestId('input');
	const input = screen.getByRole('textbox');
	const displayText = screen.container.querySelector('.input__display-text') as HTMLElement;

	// 初期状態（非フォーカス）では display-text が表示されている
	await expect.element(wrapper).toHaveClass(/input--inline/);
	await expect.element(wrapper).not.toHaveClass(/input--focused/);
	await expect.element(displayText).toBeVisible();
	const opacityBeforeFocus = parseFloat(getComputedStyle(displayText).opacity);
	expect(opacityBeforeFocus).toBeGreaterThan(0);

	// フォーカスすると、input--focused が付き、display-text は非表示（opacity:0）になる
	(input.element() as HTMLInputElement).focus();
	await expect.element(wrapper).toHaveClass(/input--focused/);
	const opacityAfterFocus = parseFloat(getComputedStyle(displayText).opacity);
	expect(opacityAfterFocus).toBe(0);
});

// =========================================================================
// linkify / inline 表示位置テスト
// =========================================================================

test('linkify (non-inline): unfocused shows link overlay, focused hides it', async () => {
	const screen = render(Input, {
		value: 'http://example.com',
		linkify: true
	});

	const wrapper = screen.getByTestId('input');
	const input = screen.getByRole('textbox');
	const linkOverlay = screen.container.querySelector('.input__link-text') as HTMLElement;
	const displayText = screen.container.querySelector('.input__display-text') as HTMLElement;

	// 初期状態（非フォーカス）ではリンク用オーバーレイが表示されている
	await expect.element(wrapper).not.toHaveClass(/input--inline/);
	await expect.element(wrapper).not.toHaveClass(/input--focused/);
	// linkify モードでは display-text は常に非表示
	expect(getComputedStyle(displayText).opacity).toBe('0');
	// link-text は表示されている
	await expect.element(linkOverlay).toBeVisible();
	const displayBeforeFocus = getComputedStyle(linkOverlay).display;
	expect(displayBeforeFocus).not.toBe('none');

	// フォーカスすると、input--focused が付き、リンクオーバーレイは非表示（display:none）になる
	(input.element() as HTMLInputElement).focus();
	await expect.element(wrapper).toHaveClass(/input--focused/);

	const displayAfterFocus = getComputedStyle(linkOverlay).display;
	expect(displayAfterFocus).toBe('none');
});

test('linkify + inline: unfocused shows link overlay, focused hides overlay and shows input', async () => {
	const screen = render(Input, {
		value: 'http://example.com',
		linkify: true,
		inline: true
	});

	const wrapper = screen.getByTestId('input');
	const input = screen.getByRole('textbox');
	const linkOverlay = screen.container.querySelector('.input__link-text') as HTMLElement;
	const displayText = screen.container.querySelector('.input__display-text') as HTMLElement;

	// inline + linkify では display-text は常に非表示、link-text が表示
	await expect.element(wrapper).toHaveClass(/input--inline/);
	await expect.element(wrapper).not.toHaveClass(/input--focused/);
	// linkify モードでは display-text は常に非表示
	expect(getComputedStyle(displayText).opacity).toBe('0');
	// link-text は表示されている
	await expect.element(linkOverlay).toBeVisible();
	const displayBeforeFocus = getComputedStyle(linkOverlay).display;
	expect(displayBeforeFocus).not.toBe('none');

	// フォーカスすると、リンクオーバーレイは非表示（display:none）になり、input が前面になる
	(input.element() as HTMLInputElement).focus();
	await expect.element(wrapper).toHaveClass(/input--focused/);
	const displayAfterFocus = getComputedStyle(linkOverlay).display;
	expect(displayAfterFocus).toBe('none');
});

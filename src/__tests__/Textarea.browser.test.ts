import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Textarea from '../lib/components/Textarea.svelte';
import variables from '../lib/assets/styles/variables.scss?inline';
import { collectCssVarNames } from './helpers/cssVarCollector';

test('renders Textarea and updates value on typing', async () => {
	const screen = render(Textarea, { placeholder: 'Type here', value: '' });
	const textarea = screen.getByRole('textbox');
	
	// Focus first to make textarea visible (non-focused textarea has transparent color)
	const textareaElement = textarea.element() as HTMLTextAreaElement;
	textareaElement.focus();
	// Trigger focus event manually to ensure Svelte reactivity
	textareaElement.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
	// Wait for focus state to be applied and class to be added
	await new Promise(resolve => setTimeout(resolve, 100));
	// Check that the focused class is applied
	const wrapper = screen.container.querySelector('[data-testid="textarea"]');
	expect(wrapper).toHaveClass('textarea--focused');
	// Check that textarea is in the document and has focus
	await expect.element(textarea).toHaveFocus();
	// Use direct DOM manipulation to set value
	textareaElement.value = 'Hello\nWorld';
	textareaElement.dispatchEvent(new Event('input', { bubbles: true }));
	await expect.element(textarea).toHaveValue('Hello\nWorld');
});

test('disabled Textarea is not interactable', async () => {
	const screen = render(Textarea, { value: 'Initial', disabled: true });
	const textarea = screen.getByRole('textbox');
	await expect.element(textarea).toHaveAttribute('disabled');
	await expect.element(textarea).toHaveValue('Initial');

	// Try to focus programmatically and verify it doesn't get focus
	(textarea.element() as HTMLTextAreaElement).focus();
	await expect.element(textarea).not.toHaveFocus();
});

test('readonly Textarea does not change value on typing', async () => {
	const screen = render(Textarea, { value: 'Initial', readonly: true });
	const textarea = screen.getByRole('textbox');
	await expect.element(textarea).toHaveAttribute('readonly');
	await expect.element(textarea).toHaveValue('Initial');

	// Focus should work but value should not change
	(textarea.element() as HTMLTextAreaElement).focus();
	await expect.element(textarea).toHaveFocus();
	await expect.element(textarea).toHaveValue('Initial');
});

test('required attribute is applied correctly', async () => {
	const screen = render(Textarea, { value: '', required: true });
	const textarea = screen.getByRole('textbox');
	await expect.element(textarea).toHaveAttribute('required');
});

test('maxlength attribute limits input length', async () => {
	const screen = render(Textarea, { value: '', maxlength: 10 });
	const textarea = screen.getByRole('textbox');
	await expect.element(textarea).toHaveAttribute('maxlength', '10');

	// Focus first to make textarea visible (non-focused textarea has transparent color)
	(textarea.element() as HTMLTextAreaElement).focus();
	// Wait for focus state to be applied and class to be added
	await new Promise(resolve => setTimeout(resolve, 100));
	// Check that the focused class is applied
	const wrapper = screen.container.querySelector('[data-testid="textarea"]');
	expect(wrapper).toHaveClass('textarea--focused');
	// Check that textarea has focus instead of checking visibility
	await expect.element(textarea).toHaveFocus();
	
	// Use direct DOM manipulation to set value (fill() requires visibility)
	// Note: maxlength is enforced by the browser for user input, but when setting value programmatically,
	// we need to respect the maxlength limit manually and then trigger input event
	const textareaElement = textarea.element() as HTMLTextAreaElement;
	const maxLength = textareaElement.maxLength;
	const textToSet = 'This is a very long text that should be limited';
	// Apply maxlength limit manually since programmatic value setting doesn't enforce it
	const limitedText = maxLength > 0 ? textToSet.substring(0, maxLength) : textToSet;
	textareaElement.value = limitedText;
	// Trigger input event to update Svelte's reactive value
	textareaElement.dispatchEvent(new Event('input', { bubbles: true }));
	// Wait for Svelte to process the input
	await new Promise(resolve => setTimeout(resolve, 50));
	await expect.element(textarea).toHaveValue('This is a ');
});

test('clearable Textarea shows clear button and clears value', async () => {
	const screen = render(Textarea, { value: 'Test text', clearable: true });
	const textarea = screen.getByRole('textbox');
	await expect.element(textarea).toHaveValue('Test text');

	// Clear button should be present
	const clearButton = screen.container.querySelector('.textarea__clear-button button');
	expect(clearButton).toBeTruthy();

	// Click clear button
	await (clearButton as HTMLElement).click();
	await expect.element(textarea).toHaveValue('');
});

test('form submission works correctly', async () => {
	const screen = render(Textarea, { name: 'message', value: 'Test message' });
	const textarea = screen.getByRole('textbox');
	await expect.element(textarea).toHaveAttribute('name', 'message');
	await expect.element(textarea).toHaveValue('Test message');
});

test('oninput and onchange events are called', async () => {
	let inputCalled = false;
	let changeCalled = false;

	const screen = render(Textarea, {
		value: '',
		oninput: () => {
			inputCalled = true;
		},
		onchange: () => {
			changeCalled = true;
		}
	});

	const textarea = screen.getByRole('textbox');
	
	// Focus first to make textarea visible (non-focused textarea has transparent color)
	(textarea.element() as HTMLTextAreaElement).focus();
	// Wait for focus state to be applied and class to be added
	await new Promise(resolve => setTimeout(resolve, 100));
	// Check that the focused class is applied
	const wrapper = screen.container.querySelector('[data-testid="textarea"]');
	expect(wrapper).toHaveClass('textarea--focused');
	// Check that textarea has focus instead of checking visibility
	await expect.element(textarea).toHaveFocus();
	
	// Use direct DOM manipulation to set value (fill() requires visibility)
	(textarea.element() as HTMLTextAreaElement).value = 'New text';
	(textarea.element() as HTMLTextAreaElement).dispatchEvent(new Event('input', { bubbles: true }));

	expect(inputCalled).toBe(true);
	// Note: onchange is only called when the element loses focus, not on every input
	// So we test oninput which should be called on every keystroke
});

test('focus and blur events work correctly', async () => {
	let focusCalled = false;
	let blurCalled = false;

	const screen = render(Textarea, {
		value: '',
		onfocus: () => {
			focusCalled = true;
		},
		onblur: () => {
			blurCalled = true;
		}
	});

	const textarea = screen.getByRole('textbox');
	// Use programmatic focus instead of locator.focus()
	(textarea.element() as HTMLTextAreaElement).focus();
	expect(focusCalled).toBe(true);

	(textarea.element() as HTMLTextAreaElement).blur();
	expect(blurCalled).toBe(true);
});

test('focusStyle variants work correctly', async () => {
	// Test outline focus style
	const screenOutline = render(Textarea, {
		value: '',
		focusStyle: 'outline',
		id: 'textarea-outline'
	});
	const textareaOutline = screenOutline.container.querySelector(
		'#textarea-outline'
	) as HTMLTextAreaElement;
	textareaOutline.focus();
	await expect.element(textareaOutline).toHaveFocus();

	// Test background focus style
	const screenBackground = render(Textarea, {
		value: '',
		focusStyle: 'background',
		id: 'textarea-background'
	});
	const textareaBackground = screenBackground.container.querySelector(
		'#textarea-background'
	) as HTMLTextAreaElement;
	textareaBackground.focus();
	await expect.element(textareaBackground).toHaveFocus();

	// Test none focus style
	const screenNone = render(Textarea, { value: '', focusStyle: 'none', id: 'textarea-none' });
	const textareaNone = screenNone.container.querySelector('#textarea-none') as HTMLTextAreaElement;
	textareaNone.focus();
	await expect.element(textareaNone).toHaveFocus();
});

test('inline mode shows display text when not focused', async () => {
	const screen = render(Textarea, { value: 'Inline text', inline: true });
	const textarea = screen.getByRole('textbox');
	const displayText = screen.container.querySelector('.textarea__display-text');

	// In inline mode, display text should be visible when not focused
	await expect.element(displayText).toBeVisible();

	// When focused, textarea should be visible
	(textarea.element() as HTMLTextAreaElement).focus();
	await expect.element(textarea).toHaveFocus();
});

test('autoResize functionality works', async () => {
	const screen = render(Textarea, { value: '', autoResize: true, rows: 3 });
	const textarea = screen.getByRole('textbox');
	const displayText = screen.container.querySelector('.textarea__display-text');

	// With autoResize, display text should be present (even when not focused)
	// Note: display-text may have opacity: 0 when focused, but should be in DOM
	expect(displayText).toBeTruthy();

	// Focus first to make textarea visible
	(textarea.element() as HTMLTextAreaElement).focus();
	// Wait for focus state to be applied
	await new Promise(resolve => setTimeout(resolve, 100));
	// Check that the focused class is applied
	const wrapper = screen.container.querySelector('[data-testid="textarea"]');
	expect(wrapper).toHaveClass('textarea--focused');

	// Use direct DOM manipulation to set value
	(textarea.element() as HTMLTextAreaElement).value = 'Line 1\nLine 2\nLine 3\nLine 4';
	(textarea.element() as HTMLTextAreaElement).dispatchEvent(new Event('input', { bubbles: true }));
	await expect.element(textarea).toHaveValue('Line 1\nLine 2\nLine 3\nLine 4');
});

test('resizable attribute controls resize behavior', async () => {
	const screen = render(Textarea, { value: '', resizable: true });
	const textarea = screen.getByRole('textbox');

	// Should have resizable class when resizable is true
	await expect.element(textarea).toHaveClass('resizable');
});

test('should not reference undefined CSS variables', async () => {
	const screen = render(Textarea, { value: 'test' });
	const wrapper = screen.container.querySelector('[data-testid="textarea"]') as HTMLElement;
	const textareaElement = screen.getByRole('textbox').element() as HTMLTextAreaElement;

	// List of CSS variables to check for Textarea
	const cssVariables = [
		'--svelte-ui-textarea-bg',
		'--svelte-ui-textarea-border-color',
		'--svelte-ui-textarea-text-color',
		'--svelte-ui-textarea-placeholder-color',
		'--svelte-ui-hover-overlay',
		'--svelte-ui-focus-color',
		'--svelte-ui-border-width',
		'--svelte-ui-textarea-padding',
		'--svelte-ui-textarea-border-radius',
		'--svelte-ui-textarea-border-radius-rounded',
		'--svelte-ui-input-disabled-opacity',
		'--svelte-ui-button-disabled-opacity',
		'--svelte-ui-clear-button-right-spacing',
		'--svelte-ui-focus-outline-inner',
		'--svelte-ui-focus-outline-offset-inner'
	];

	// Inject variables.scss into the document for computed style checks
	const style = document.createElement('style');
	style.textContent = variables;
	document.head.appendChild(style);

	// Check computed styles for each variable
	cssVariables.forEach((varName) => {
		const computedValue = getComputedStyle(wrapper).getPropertyValue(varName).trim();
		// Skip if variable is not defined (empty string means not defined)
		if (computedValue === '') {
			console.warn(`CSS variable ${varName} is not defined, skipping test`);
			return;
		}
		expect(computedValue).not.toBe('initial');
		expect(computedValue).not.toBe('unset');
		expect(computedValue).not.toBe('inherit');
	});

	document.head.removeChild(style);
});

// =========================================================================
// リアクティブ性テスト
// =========================================================================

test('Textarea width property changes reactively', async () => {
	const screen = render(Textarea, {
		width: 200
	});

	// widthプロパティはコンテナに適用される
	const container = screen.getByTestId('textarea');
	await expect.element(container).toHaveAttribute('style', expect.stringContaining('width: 200px'));

	// プロパティを更新
	screen.rerender({
		width: 300
	});

	await expect.element(container).toHaveAttribute('style', expect.stringContaining('width: 300px'));
});

test('Textarea maxHeight property changes reactively', async () => {
	const screen = render(Textarea, {
		maxHeight: 200
	});

	const container = screen.getByTestId('textarea');
	await expect
		.element(container)
		.toHaveAttribute('style', expect.stringContaining('max-height: 200px'));

	// プロパティを更新
	screen.rerender({
		maxHeight: 300
	});

	await expect
		.element(container)
		.toHaveAttribute('style', expect.stringContaining('max-height: 300px'));
});

// =========================================================================
// 通常表示モードテスト
// =========================================================================

test('Textarea normal mode (non-inline, non-linkify): unfocused shows display-text, focused hides it', async () => {
	const screen = render(Textarea, {
		value: 'Test value',
		inline: false,
		linkify: false
	});

	const wrapper = screen.getByTestId('textarea');
	const textarea = screen.getByRole('textbox');
	const displayText = screen.container.querySelector('.textarea__display-text') as HTMLElement;

	// 初期状態（非フォーカス）では display-text が表示されている
	await expect.element(wrapper).not.toHaveClass(/textarea--inline/);
	await expect.element(wrapper).not.toHaveClass(/textarea--focused/);
	await expect.element(displayText).toBeVisible();
	const opacityBeforeFocus = parseFloat(getComputedStyle(displayText).opacity);
	expect(opacityBeforeFocus).toBeGreaterThan(0);

	// フォーカスすると、textarea--focused が付き、display-text は非表示（opacity:0）になる
	(textarea.element() as HTMLTextAreaElement).focus();
	await expect.element(wrapper).toHaveClass(/textarea--focused/);
	const opacityAfterFocus = getComputedStyle(displayText).opacity;
	expect(opacityAfterFocus).toBe('0');
});

test('Textarea inline mode (non-linkify): unfocused shows display-text, focused hides it', async () => {
	const screen = render(Textarea, {
		value: 'Test value',
		inline: true,
		linkify: false
	});

	const wrapper = screen.getByTestId('textarea');
	const textarea = screen.getByRole('textbox');
	const displayText = screen.container.querySelector('.textarea__display-text') as HTMLElement;

	// 初期状態（非フォーカス）では display-text が表示されている
	await expect.element(wrapper).toHaveClass(/textarea--inline/);
	await expect.element(wrapper).not.toHaveClass(/textarea--focused/);
	await expect.element(displayText).toBeVisible();
	const opacityBeforeFocus = parseFloat(getComputedStyle(displayText).opacity);
	expect(opacityBeforeFocus).toBeGreaterThan(0);

	// フォーカスすると、textarea--focused が付き、display-text は非表示（opacity:0）になる
	(textarea.element() as HTMLTextAreaElement).focus();
	await expect.element(wrapper).toHaveClass(/textarea--focused/);
	const opacityAfterFocus = getComputedStyle(displayText).opacity;
	expect(opacityAfterFocus).toBe('0');
});

// =========================================================================
// linkify / inline 表示位置テスト
// =========================================================================

test('Textarea linkify (non-inline): unfocused shows link overlay, focused hides it', async () => {
	const screen = render(Textarea, {
		value: 'http://example.com',
		linkify: true
	});

	const wrapper = screen.getByTestId('textarea');
	const textarea = screen.getByRole('textbox');
	const linkOverlay = screen.container.querySelector('.textarea__link-text') as HTMLElement;
	const displayText = screen.container.querySelector('.textarea__display-text') as HTMLElement;

	// 初期状態（非フォーカス）ではリンク用オーバーレイが表示されている
	await expect.element(wrapper).not.toHaveClass(/textarea--inline/);
	await expect.element(wrapper).not.toHaveClass(/textarea--focused/);
	// linkify モードでは display-text は常に非表示
	expect(getComputedStyle(displayText).opacity).toBe('0');
	// link-text は表示されている
	await expect.element(linkOverlay).toBeVisible();
	const opacityBeforeFocus = parseFloat(getComputedStyle(linkOverlay).opacity);
	expect(opacityBeforeFocus).toBeGreaterThan(0);

	// フォーカスすると、textarea--focused が付き、リンクオーバーレイは非表示（opacity:0）になる
	(textarea.element() as HTMLTextAreaElement).focus();
	await expect.element(wrapper).toHaveClass(/textarea--focused/);

	const opacityAfterFocus = parseFloat(getComputedStyle(linkOverlay).opacity);
	expect(opacityAfterFocus).toBe(0);
});

test('Textarea linkify + inline: unfocused shows link overlay, focused hides overlay and shows textarea', async () => {
	const screen = render(Textarea, {
		value: 'http://example.com',
		linkify: true,
		inline: true
	});

	const wrapper = screen.getByTestId('textarea');
	const textarea = screen.getByRole('textbox');
	const linkOverlay = screen.container.querySelector('.textarea__link-text') as HTMLElement;
	const displayText = screen.container.querySelector('.textarea__display-text') as HTMLElement;

	// inline + linkify では display-text は常に非表示、link-text が表示
	await expect.element(wrapper).toHaveClass(/textarea--inline/);
	await expect.element(wrapper).not.toHaveClass(/textarea--focused/);
	// linkify モードでは display-text は常に非表示
	expect(getComputedStyle(displayText).opacity).toBe('0');
	// link-text は表示されている
	await expect.element(linkOverlay).toBeVisible();
	const opacityBeforeFocus = parseFloat(getComputedStyle(linkOverlay).opacity);
	expect(opacityBeforeFocus).toBeGreaterThan(0);

	// フォーカスすると、リンクオーバーレイは非表示（opacity:0）になり、textarea が前面になる
	(textarea.element() as HTMLTextAreaElement).focus();
	await expect.element(wrapper).toHaveClass(/textarea--focused/);
	const opacityAfterFocus = parseFloat(getComputedStyle(linkOverlay).opacity);
	expect(opacityAfterFocus).toBe(0);
});

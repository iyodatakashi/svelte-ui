import { test, expect, beforeEach, afterEach } from 'vitest';
import variables from '../lib/assets/styles/variables.scss?inline';

let styleEl: HTMLStyleElement;

const read = (el: Element, name: string) =>
	getComputedStyle(el).getPropertyValue(name).trim();

beforeEach(() => {
	styleEl = document.createElement('style');
	styleEl.textContent = variables;
	document.head.appendChild(styleEl);
});

afterEach(() => {
	document.head.removeChild(styleEl);
	document.documentElement.removeAttribute('style');
});

test('text-subtle-color は text-weak-color のエイリアスとして同じ値を返す', () => {
	const root = document.documentElement;
	const weak = read(root, '--svelte-ui-text-weak-color');

	expect(weak).not.toBe('');
	expect(read(root, '--svelte-ui-text-subtle-color')).toBe(weak);
});

test('text-inverse-subtle-color は text-inverse-weak-color のエイリアスとして同じ値を返す', () => {
	const root = document.documentElement;
	const weak = read(root, '--svelte-ui-text-inverse-weak-color');

	expect(weak).not.toBe('');
	expect(read(root, '--svelte-ui-text-inverse-subtle-color')).toBe(weak);
});

test('weak を上書きすると subtle も追従する', () => {
	const root = document.documentElement;
	root.style.setProperty('--svelte-ui-text-weak-color', 'rgb(1, 2, 3)');

	expect(read(root, '--svelte-ui-text-subtle-color')).toBe('rgb(1, 2, 3)');
});

test('subtle を直接上書きしても従来どおり効く', () => {
	const root = document.documentElement;
	root.style.setProperty('--svelte-ui-text-subtle-color', 'rgb(4, 5, 6)');

	expect(read(root, '--svelte-ui-text-subtle-color')).toBe('rgb(4, 5, 6)');
	expect(read(root, '--svelte-ui-text-weak-color')).not.toBe('rgb(4, 5, 6)');
});

test('ダークテーマでも weak / subtle が同じ値になり、ライトテーマとは異なる', () => {
	const lightValue = read(document.documentElement, '--svelte-ui-text-weak-color');

	const dark = document.createElement('div');
	dark.setAttribute('data-theme', 'dark');
	document.body.appendChild(dark);

	const weak = read(dark, '--svelte-ui-text-weak-color');
	expect(weak).not.toBe(lightValue);
	expect(read(dark, '--svelte-ui-text-subtle-color')).toBe(weak);
	expect(read(dark, '--svelte-ui-text-inverse-subtle-color')).toBe(
		read(dark, '--svelte-ui-text-inverse-weak-color')
	);

	document.body.removeChild(dark);
});

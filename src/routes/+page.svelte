<script>
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Select from '$lib/components/Select.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Radio from '$lib/components/Radio.svelte';

	let theme = $state('light');

	const toggleTheme = () => {
		theme = theme === 'light' ? 'dark' : 'light';
		if (typeof document !== 'undefined') {
			document.body.setAttribute('data-theme', theme);
		}
	};

	onMount(() => {
		if (typeof document !== 'undefined') {
			document.body.setAttribute('data-theme', theme);
		}
	});

	const selectOptions = [
		{ value: 'option1', label: 'オプション 1' },
		{ value: 'option2', label: 'オプション 2' },
		{ value: 'option3', label: 'オプション 3' }
	];

	let inputValue = $state('テスト入力');
	let selectValue = $state('');
	let checkboxValue = $state(false);
	let radioValue = $state('');
</script>

<div
	class="page-container"
	style="background: {theme === 'dark' ? '#232220' : '#fafafa'}; min-height: 100vh; padding: 20px;"
>
	<div class="content" style="max-width: 800px; margin: 0 auto;">
		<h1 style="color: var(--svelte-ui-text); margin-bottom: 20px;">
			テーマカラーテスト - {theme === 'light' ? 'ライト' : 'ダーク'}テーマ
		</h1>

		<div style="margin-bottom: 30px;">
			<Button onclick={toggleTheme}>
				{theme === 'light' ? 'ダーク' : 'ライト'}テーマに切り替え
			</Button>
		</div>

		<div class="test-section">
			<h2 style="color: var(--svelte-ui-text); margin-bottom: 15px;">テキスト色テスト</h2>

			<p style="color: var(--svelte-ui-text); margin-bottom: 10px;">
				メインテキスト色 (--svelte-ui-text)
			</p>

			<p style="color: var(--svelte-ui-text-subtle); margin-bottom: 10px;">
				サブテキスト色 (--svelte-ui-text-subtle)
			</p>

			<p style="color: var(--svelte-ui-text-placeholder); margin-bottom: 20px;">
				プレースホルダー色 (--svelte-ui-text-placeholder)
			</p>
		</div>

		<div class="test-section">
			<h2 style="color: var(--svelte-ui-text); margin-bottom: 15px;">コンポーネントテスト</h2>

			<div style="margin-bottom: 15px;">
				<label style="color: var(--svelte-ui-text); display: block; margin-bottom: 5px;">
					Input:
				</label>
				<Input bind:value={inputValue} placeholder="プレースホルダーテキスト" />
			</div>

			<div style="margin-bottom: 15px;">
				<label style="color: var(--svelte-ui-text); display: block; margin-bottom: 5px;">
					Select:
				</label>
				<Select
					bind:value={selectValue}
					options={selectOptions}
					placeholder="オプションを選択してください"
				/>
			</div>

			<div style="margin-bottom: 15px;">
				<Checkbox bind:value={checkboxValue}>チェックボックスのテキスト</Checkbox>
			</div>

			<div style="margin-bottom: 15px;">
				<Radio name="test-radio" bind:currentValue={radioValue} value="radio1">
					ラジオボタンのテキスト 1
				</Radio>
				<Radio name="test-radio" bind:currentValue={radioValue} value="radio2">
					ラジオボタンのテキスト 2
				</Radio>
			</div>

			<div style="margin-bottom: 15px;">
				<Button variant="filled">フィルドボタン</Button>
				<Button variant="outlined">アウトラインボタン</Button>
				<Button variant="text">テキストボタン</Button>
			</div>
		</div>

		<div
			class="debug-info"
			style="margin-top: 30px; padding: 15px; border: 1px solid var(--svelte-ui-border-color); border-radius: 8px;"
		>
			<h3 style="color: var(--svelte-ui-text); margin-bottom: 10px;">デバッグ情報</h3>
			<div style="font-family: monospace; font-size: 0.9em;">
				<div style="color: var(--svelte-ui-text-subtle);">現在のテーマ: {theme}</div>
				<div style="color: var(--svelte-ui-text-subtle);">body[data-theme]: {theme}</div>
			</div>
		</div>
	</div>
</div>

<style>
	.test-section {
		margin-bottom: 30px;
		padding: 20px;
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: 8px;
	}
</style>

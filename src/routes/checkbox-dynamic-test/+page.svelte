<script lang="ts">
	import CheckboxGroup from '$lib/components/CheckboxGroup.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { Option, OptionValue } from '$lib/types/options';

	// シナリオ1: options が後から動的にセットされる
	let options1: Option[] = $state([]);
	let value1: OptionValue[] = $state([]);

	const loadOptions1 = () => {
		// 非同期フェッチを想定した遅延セット
		setTimeout(() => {
			options1 = [
				{ label: 'Apple', value: 'apple' },
				{ label: 'Banana', value: 'banana' },
				{ label: 'Cherry', value: 'cherry' }
			];
		}, 500);
	};

	// シナリオ2: options と value が同時に後からセットされる
	let options2: Option[] = $state([]);
	let value2: OptionValue[] = $state([]);

	const loadOptions2 = () => {
		setTimeout(() => {
			options2 = [
				{ label: 'Red', value: 'red' },
				{ label: 'Green', value: 'green' },
				{ label: 'Blue', value: 'blue' }
			];
			value2 = ['red', 'blue']; // 初期チェック状態も同時にセット
		}, 500);
	};

	// シナリオ3: value が外部からリセットされる
	let options3: Option[] = $state([
		{ label: 'Option A', value: 'a' },
		{ label: 'Option B', value: 'b' },
		{ label: 'Option C', value: 'c' }
	]);
	let value3: OptionValue[] = $state(['a', 'b']);

	const resetValue3 = () => {
		value3 = [];
	};

	const setAllValue3 = () => {
		value3 = ['a', 'b', 'c'];
	};
</script>

<div class="page">
	<h1>CheckboxGroup 動的テスト</h1>

	<!-- シナリオ1 -->
	<section>
		<h2>シナリオ1: options が後からセットされる</h2>
		<p>ボタンを押すと 500ms 後に options がセットされます。チェックボックスが表示されることを確認してください。</p>
		<Button onclick={loadOptions1}>options をロード</Button>
		<div class="result">
			<CheckboxGroup bind:value={value1} options={options1} />
			<p>value: {JSON.stringify(value1)}</p>
		</div>
	</section>

	<!-- シナリオ2 -->
	<section>
		<h2>シナリオ2: options と value が同時にセットされる</h2>
		<p>ボタンを押すと 500ms 後に options と value が同時にセットされます。Red と Blue が初期チェック済みになることを確認してください。</p>
		<Button onclick={loadOptions2}>options + value をロード</Button>
		<div class="result">
			<CheckboxGroup bind:value={value2} options={options2} />
			<p>value: {JSON.stringify(value2)}</p>
		</div>
	</section>

	<!-- シナリオ3 -->
	<section>
		<h2>シナリオ3: value が外部からリセット・全選択される</h2>
		<p>A と B が初期チェック済みです。ボタンで value を外部からリセット・全選択できることを確認してください。</p>
		<div class="buttons">
			<Button onclick={resetValue3}>全解除</Button>
			<Button onclick={setAllValue3}>全選択</Button>
		</div>
		<div class="result">
			<CheckboxGroup bind:value={value3} options={options3} />
			<p>value: {JSON.stringify(value3)}</p>
		</div>
	</section>
</div>

<style>
	.page {
		padding: 32px;
		max-width: 600px;
		display: flex;
		flex-direction: column;
		gap: 48px;
	}

	h1 {
		font-size: 24px;
		font-weight: bold;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	h2 {
		font-size: 18px;
		font-weight: bold;
	}

	p {
		color: #666;
		font-size: 14px;
	}

	.buttons {
		display: flex;
		gap: 8px;
	}

	.result {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 16px;
		border: 1px solid #ddd;
		border-radius: 8px;
	}
</style>

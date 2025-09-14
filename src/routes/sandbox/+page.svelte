<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import Radio from '$lib/components/Radio.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Switch from '$lib/components/Switch.svelte';
	import Button from '$lib/components/Button.svelte';
	import Select from '$lib/components/Select.svelte';
	import Combobox from '$lib/components/Combobox.svelte';
	import ColorPicker from '$lib/components/ColorPicker.svelte';
	import Skeleton from '$lib/components/skeleton/Skeleton.svelte';
	let value: string = $state('');
	let value2: string = $state('');
	let checked: boolean = $state(false);
	let color: string = $state('');
	const options = [
		{ value: 'hoge', label: 'ほげ' },
		{ value: 'fuga', label: 'ふが' }
	];

	const handleChange = (newValue: string) => {
		console.log(newValue);
	};
</script>

<div class="container">
	<label for="input1">インプット1</label>
	<Input id="input1" inline bind:value minWidth={300} width="50%" onsubmit={handleChange} />
	<Textarea id="textarea1" bind:value={value2} maxHeight={120} onsubmit={handleChange} />
	<Select bind:value {options} />
	<Combobox bind:value {options} onchange={handleChange} />
	<ColorPicker bind:value={color} rounded clearable />
	<div class="textarea">
		<label for="textarea2">textarea</label>
		<Textarea id="textarea2" bind:value={value2} maxHeight={120} onsubmit={handleChange} />
		<label for="radio1">radio1</label>
		<Radio id="radio1" name="hoge" value="hoge" bind:currentValue={value} onsubmit={handleChange}
			>hoge</Radio
		>
		<label for="radio2">radio2</label>
		<Radio id="radio2" name="hoge" value="fuga" bind:currentValue={value} onsubmit={handleChange}
			>fuga</Radio
		>

		<label for="checkbox">checkbox</label>
		<Checkbox id="checkbox" bind:value={checked}>ちぇき</Checkbox>

		<label for="switch">switch</label>
		<Switch id="switch" bind:value={checked}>すいっち</Switch>

		<div class="button">
			<Button variant="filled" icon="add" rounded>完了</Button>
		</div>
	</div>

	<br />
	<Skeleton
		patterns={[
			{ type: 'avatar', showName: true },
			{
				type: 'article-list',
				lines: 3,
				thumbnailConfig: { width: 300, aspectRatio: '16/9' }
			}
		]}
	/>
</div>

<style>
	.container {
		padding: 32px;
		width: 100%;
	}

	.textarea {
		padding: 16px;
		border: solid 1px var(--svelte-ui-border-color);
		position: relative;
	}

	.button {
		position: relative;
		top: 0px;
	}
</style>

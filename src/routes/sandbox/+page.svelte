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
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
	import Datepicker from '$lib/components/Datepicker.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import Drawer from '$lib/components/Drawer.svelte';
	import Skeleton from '$lib/components/skeleton/Skeleton.svelte';
	import type { SvelteComponent } from 'svelte';
	import Fab from '$lib/components/Fab.svelte';
	import FileUploader from '$lib/components/FileUploader.svelte';
	import ImageUploader from '$lib/components/ImageUploader.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import CheckboxGroup from '$lib/components/CheckboxGroup.svelte';
	import RadioGroup from '$lib/components/RadioGroup.svelte';

	let value: string = $state('');
	let value2: string = $state('');
	let comboboxValue: string = $state('');
	let checked: boolean = $state(false);
	let color: string = $state('');
	let sliderValue: number = $state(150);
	let dialogRef: SvelteComponent | undefined = $state();
	let confirmDialogRef: SvelteComponent | undefined = $state();
	let drawerRef: SvelteComponent | undefined = $state();
	let date: Date = $state(new Date());
	let range: { start: Date; end: Date } = $state({
		start: new Date(),
		end: new Date('2025-11-28')
	});
	let fileList: FileList | undefined = $state();
	let multiSelectValues: string[] = $state([]);

	const options = [
		{ value: 'hoge', label: 'ほげほげ' },
		{ value: 'fuga', label: 'ふがほほがえあが' },
		{ value: 'hoge1', label: 'ほげ' },
		{ value: 'fuga1', label: 'ふが' },
		{ value: 'hoge2', label: 'ほげ' },
		{ value: 'fuga2', label: 'ふが' },
		{ value: 'hoge3', label: 'ほげ' },
		{ value: 'fuga3', label: 'ふが' }
	];

	const comboboxOptions = ['ほげ', 'ふが'];

	const handleChange = (newValue?: Date) => {
		console.log(newValue);
	};

	const handleInputChange = () => {
		console.log('Input changed:', value);
	};

	const handleChangeFileList = (newValue: FileList) => {
		console.log(newValue);
	};

	const open = () => {
		drawerRef?.open();
	};

	const handleConfirm = () => {
		console.log('Confirm');
	};
</script>

<div class="container" data-theme="light">
	<Fab icon="add" variant="glass" shadow position="center" onclick={open}>ほげ</Fab>
	<div class="container-inner">
		<Slider width={300} min={100} max={300} bind:value={sliderValue}></Slider>
		<Button onclick={open}>オープン</Button>
		<label for="input1">インプット1</label>
		<Input
			id="input1"
			clearable
			bind:value
			minWidth={300}
			width="50%"
			linkify
			onkeydown={(e) => {
				if (e.key === 'Enter') handleInputChange();
			}}
			onclick={handleInputChange}
		/>
		<Textarea id="textarea1" bind:value={value2} linkify clearable onsubmit={handleChange} />
		<Select bind:value {options} />
		<Combobox bind:value={comboboxValue} options={comboboxOptions} onchange={handleChange} />
		<ColorPicker bind:value={color} rounded clearable />

		<ConfirmDialog
			bind:this={confirmDialogRef}
			title="いいの？"
			confirmLabel="はい"
			cancelLabel="いやん"
			onConfirm={handleConfirm}
		/>
		<Dialog bind:this={dialogRef} title="タイトル" scrollable
			>ほげ
			{#snippet footer()}
				<Button color="var(--svelte-ui-text-color)">キャンセル</Button>
				<Button variant="filled" minWidth="120px">OK</Button>
			{/snippet}
		</Dialog>
		<Drawer bind:this={drawerRef} position="left" title="ちあて" scrollable={false}>ほげ</Drawer>

		<Datepicker
			bind:value={range}
			locale="ja"
			onchange={handleChange}
			mode="range"
			hasIcon
			minDate={new Date('2025-10-01')}
			maxDate={new Date('2025-12-30')}
			iconFilled
		/>

		<FileUploader bind:value={fileList} multiple onchange={handleChangeFileList} />

		<div class="textarea">
			<label for="textarea2">textarea</label>
			<Textarea id="textarea2" bind:value={value2} maxHeight={120} onsubmit={handleChange} />
			<label for="radio1">radio1</label>
			<Radio
				id="radio1"
				name="hoge"
				value="hoge"
				size="large"
				bind:currentValue={value}
				onsubmit={handleChange}>hoge</Radio
			>
			<label for="radio2">radio2</label>
			<Radio
				id="radio2"
				name="hoge"
				value="fuga"
				size="small"
				bind:currentValue={value}
				onsubmit={handleChange}>fuga</Radio
			>

			<label for="checkbox">checkbox</label>
			<Checkbox id="checkbox" bind:value={checked}>チェックボックス</Checkbox>

			Radioグループ
			<RadioGroup
				bind:value
				{options}
				direction="horizontal"
				gap="0 32px"
				minOptionWidth="120px"
				wrap
				onchange={() => {
					console.log($state.snapshot(value));
				}}
			/>

			Checkboxグループ
			<CheckboxGroup
				bind:value={multiSelectValues}
				{options}
				direction="horizontal"
				gap="8px 32px"
				minOptionWidth="120px"
				wrap
				onchange={() => {
					console.log($state.snapshot(multiSelectValues));
				}}
			/>

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
</div>

<style>
	.container {
		width: 100%;
	}

	.container-inner {
		padding: 32px;
		background: var(--svelte-ui-surface-color);
		color: var(--svelte-ui-text-color);
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

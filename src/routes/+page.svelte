<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Select from '$lib/components/Select.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Radio from '$lib/components/Radio.svelte';
	import Combobox from '$lib/components/Combobox.svelte';
	import PopupMenuButton from '$lib/components/PopupMenuButton.svelte';
	import PopupMenu from '$lib/components/PopupMenu.svelte';
	import Popup from '$lib/components/Popup.svelte';
	import type { MenuItem } from '$lib/types/MenuItem';

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
	let comboboxValue = $state('');

	// Popup menu items
	const menuItems: (MenuItem | 'separator')[] = [
		{
			title: 'Edit',
			icon: 'edit',
			callback: () => alert('Edit clicked')
		},
		{
			title: 'Copy',
			icon: 'content_copy',
			callback: () => alert('Copy clicked')
		},
		'separator',
		{
			title: 'Delete',
			icon: 'delete',
			callback: () => alert('Delete clicked')
		}
	];

	// Popup demo
	let popupAnchorRef: HTMLElement = $state();
	let popupMenuRef: any = $state();
	let popupRef: any = $state();

	const openPopup = () => {
		popupRef?.open();
	};

	const openPopupMenu = () => {
		popupMenuRef?.open();
	};
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
				<label
					for="input-demo"
					style="color: var(--svelte-ui-text); display: block; margin-bottom: 5px;"
				>
					Input:
				</label>
				<Input id="input-demo" bind:value={inputValue} placeholder="プレースホルダーテキスト" />
			</div>

			<div style="margin-bottom: 15px;">
				<label
					for="select-demo"
					style="color: var(--svelte-ui-text); display: block; margin-bottom: 5px;"
				>
					Select:
				</label>
				<Select
					id="select-demo"
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

			<!-- Popup Components Test -->
			<div style="margin-bottom: 15px;">
				<h3 style="color: var(--svelte-ui-text); margin-bottom: 10px;">Popup Components</h3>

				<div style="display: flex; gap: 16px; align-items: flex-start; margin-bottom: 20px;">
					<!-- PopupMenuButton -->
					<div>
						<p style="color: var(--svelte-ui-text); margin-bottom: 8px;">PopupMenuButton:</p>
						<PopupMenuButton {menuItems} />
					</div>

					<!-- Custom PopupMenu -->
					<div>
						<p style="color: var(--svelte-ui-text); margin-bottom: 8px;">PopupMenu:</p>
						<button
							bind:this={popupAnchorRef}
							onclick={openPopupMenu}
							style="padding: 8px 16px; background: var(--svelte-ui-primary-color); color: white; border: none; border-radius: 4px; cursor: pointer;"
						>
							Open Menu
						</button>
						<PopupMenu bind:this={popupMenuRef} anchorElement={popupAnchorRef} {menuItems} />
					</div>

					<!-- Basic Popup -->
					<div>
						<p style="color: var(--svelte-ui-text); margin-bottom: 8px;">Basic Popup:</p>
						<button
							onclick={openPopup}
							style="padding: 8px 16px; background: var(--svelte-ui-primary-color); color: white; border: none; border-radius: 4px; cursor: pointer;"
						>
							Open Popup
						</button>
						<Popup bind:this={popupRef} anchorElement={popupAnchorRef}>
							<div
								style="padding: 16px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); min-width: 200px;"
							>
								<h4 style="margin: 0 0 8px 0; color: var(--svelte-ui-text);">Custom Popup</h4>
								<p style="margin: 0; color: var(--svelte-ui-text-subtle);">
									This is a custom popup with your own content.
								</p>
								<button
									onclick={() => popupRef?.close()}
									style="margin-top: 8px; padding: 4px 8px; background: var(--svelte-ui-primary-color); color: white; border: none; border-radius: 2px; cursor: pointer;"
								>
									Close
								</button>
							</div>
						</Popup>
					</div>
				</div>
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

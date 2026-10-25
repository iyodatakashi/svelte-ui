<script lang="ts">
	import { onMount } from 'svelte';
	import Popup from '$lib/components/Popup.svelte';
	import Button from '$lib/components/Button.svelte';
	import Select from '$lib/components/Select.svelte';
	import PopupMenuButton from '$lib/components/PopupMenuButton.svelte';
	import Datepicker from '$lib/components/Datepicker.svelte';
	import { isMobileDevice } from '$lib/utils/mobile';

	let isMobile = $state(false);
	let anchorEl: HTMLDivElement | undefined = $state();
	let popupRef: Popup | undefined = $state();
	let selectValue = $state('a');
	let dateValue: Date | null = $state(null);

	const options = Array.from({ length: 8 }, (_, i) => ({
		value: String.fromCharCode(97 + i),
		label: `選択肢 ${i + 1}`
	}));
	const menuItems = [{ label: '編集' }, { label: '複製' }, { label: '削除' }];

	onMount(() => {
		isMobile = isMobileDevice();
	});
</script>

<svelte:head>
	<title>ボトムシート確認</title>
</svelte:head>

<div class="page">
	<h1>ボトムシート確認</h1>
	<p class="status" class:status--ok={isMobile}>
		モバイル判定: <strong
			>{isMobile ? 'モバイル（ボトムシートで開きます）' : 'PC（ボトムシートになりません）'}</strong
		>
	</p>
	{#if !isMobile}
		<p>
			DevTools のデバイスツールバー（Cmd+Shift+M）で iPhone
			などを選び、ページを再読み込みしてください。
		</p>
	{/if}

	<section>
		<h2>Popup</h2>
		<div bind:this={anchorEl} class="anchor">
			<Button variant="filled" onclick={() => popupRef?.toggle()}>Popup を開く</Button>
		</div>
		<Popup bind:this={popupRef} anchorElement={anchorEl} mobileFullscreen>
			<div class="sheet">
				{#each Array.from({ length: 6 }) as _, i}
					<p>シートの中身 {i + 1}</p>
				{/each}
				<Button onclick={() => popupRef?.close()}>閉じる</Button>
			</div>
		</Popup>
	</section>

	<section>
		<h2>Select</h2>
		<Select bind:value={selectValue} {options} mobileFullscreen />
	</section>

	<section>
		<h2>PopupMenuButton</h2>
		<PopupMenuButton {menuItems} mobileFullscreen>メニュー</PopupMenuButton>
	</section>

	<section>
		<h2>Datepicker</h2>
		<Datepicker bind:value={dateValue} mobileFullscreen />
	</section>

	<p>下にスクロールしてから開くと、背面のスクロール位置の挙動も確認できます。</p>
	{#each Array.from({ length: 40 }) as _, i}
		<p class="filler">ページの内容 {i + 1}</p>
	{/each}

	<section>
		<h2>ページ下部の Select</h2>
		<Select bind:value={selectValue} {options} mobileFullscreen />
	</section>
</div>

<style>
	.page {
		padding: 16px;
		max-width: 640px;
		margin: 0 auto;
	}

	section {
		margin-block: 24px;
	}

	.status {
		padding: 8px 12px;
		border-radius: 8px;
		background: #fde8e8;
	}

	.status--ok {
		background: #e3f6e8;
	}

	.anchor {
		width: fit-content;
	}

	.sheet {
		padding: 16px;
	}

	.filler {
		padding-block: 8px;
		border-bottom: 1px solid #eee;
	}
</style>

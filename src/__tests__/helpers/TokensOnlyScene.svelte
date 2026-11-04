<!-- TokensOnlyScene.svelte - styles/tokens だけで部品の見た目が変わらないことを確かめるための場面 -->
<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '../../lib/components/Button.svelte';
	import Input from '../../lib/components/Input.svelte';
	import Dialog from '../../lib/components/Dialog.svelte';
	import Popup from '../../lib/components/Popup.svelte';
	import PopupMenu from '../../lib/components/PopupMenu.svelte';

	let { scene }: { scene: 'button' | 'input' | 'dialog' | 'popup' | 'popupmenu' } = $props();

	let dialogRef: ReturnType<typeof Dialog> | undefined = $state();
	let popupRef: ReturnType<typeof Popup> | undefined = $state();
	let popupMenuRef: ReturnType<typeof PopupMenu> | undefined = $state();
	let anchorEl: HTMLSpanElement | undefined = $state();

	onMount(() => {
		dialogRef?.open();
		popupRef?.open();
		popupMenuRef?.open();
	});
</script>

<span bind:this={anchorEl}>anchor</span>

{#if scene === 'button'}
	<Button variant="filled">Filled</Button>
	<Button variant="ghost">Ghost</Button>
	<Button variant="filled" disabled>Disabled</Button>
{:else if scene === 'input'}
	<Input value="" placeholder="Empty" />
	<Input value="Value" />
	<Input value="Disabled" disabled />
{:else if scene === 'dialog'}
	<Dialog bind:this={dialogRef} title="Title" description="Description">
		Body
		{#snippet footer()}
			<Button variant="ghost">Cancel</Button>
			<Button variant="filled">OK</Button>
		{/snippet}
	</Dialog>
{:else if scene === 'popup'}
	<Popup bind:this={popupRef} anchorElement={anchorEl}>Popup content</Popup>
{:else if scene === 'popupmenu'}
	<PopupMenu
		bind:this={popupMenuRef}
		anchorElement={anchorEl}
		menuItems={[
			{ label: 'First' },
			{ label: 'Second' },
			'separator',
			{ label: 'Disabled', disabled: true }
		]}
	/>
{/if}

<script lang="ts">
	import Button from './Button.svelte';
	let { files = $bindable(), accept = '' }: { files: FileList | undefined; accept: string } =
		$props();
	let dropAreaRef: HTMLButtonElement;
	let fileInputRef: HTMLInputElement;
	let isHover: boolean = $state(false);
	const handleClick = () => {
		fileInputRef?.click();
	};
	export const reset = () => {
		if (fileInputRef) {
			fileInputRef.value = '';
		}
	};
</script>

<button
	bind:this={dropAreaRef}
	class="file-upload"
	class:hover={isHover}
	onclick={handleClick}
	ondragover={(event) => {
		event.stopPropagation();
		event.preventDefault();
		isHover = true;
	}}
	ondragleave={(event) => {
		event.stopPropagation();
		event.preventDefault();
		isHover = false;
	}}
	ondrop={(event) => {
		event.stopPropagation();
		event.preventDefault();
		isHover = false;
		const fileList = event.dataTransfer?.files;
		if (typeof fileList !== 'undefined') {
			files = fileList;
		}
	}}
>
	<p class="file-upload-text">ファイルをドラッグ＆ドロップ</p>
	<div class="file-select-button-block">
		<Button variant="outlined">またはファイルを選択</Button>
	</div>
	{#if files && files.length > 0}
		<ul class="file-list">
			{#each files as file}
				<li>{file.name}</li>
			{/each}
		</ul>
	{/if}
	<input
		bind:this={fileInputRef}
		{accept}
		class="upload-file-input"
		id="file-upload"
		type="file"
		bind:files
	/>
</button>

<style>
	.file-upload {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 16px;
		width: 100%;
		min-height: 100px;
		padding: 16px;
		background-color: var(--base-50-transparent);
		border: dashed 1px var(--svelte-ui-border-color);
		border-radius: 4px;
	}
	.hover {
		background-color: var(--base-100-transparent);
	}
	.file-upload-text {
		color: var(--text-light);
	}
	.upload-file-input {
		display: none;
	}
</style>

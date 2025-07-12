<script lang="ts">
	import { Button, FileUploader } from '$lib/index.js';

	let files: FileList | undefined = $state();
	let imageFiles: FileList | undefined = $state();
	let singleFile: FileList | undefined = $state();
	let fileUploadRef: { reset: () => void };

	const handleReset = () => {
		fileUploadRef?.reset();
	};

	const formatFileSize = (bytes: number): string => {
		if (bytes < 1024) return bytes + ' B';
		if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
		return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
	};
</script>

<svelte:head>
	<title>FileUploader Test</title>
</svelte:head>

<div class="container">
	<h1>FileUploader Component Test</h1>
	<p>様々なパターンでFileUploaderコンポーネントをテストしてください。</p>

	<div class="test-section">
		<h2>基本的な使用例</h2>
		<FileUploader bind:files bind:this={fileUploadRef} accept="" />
		<div class="controls">
			<Button onclick={handleReset}>リセット</Button>
		</div>
		{#if files && files.length > 0}
			<div class="file-display">
				<h3>選択されたファイル:</h3>
				<ul>
					{#each files as file}
						<li>{file.name} ({formatFileSize(file.size)})</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>

	<div class="test-section">
		<h2>画像のみ</h2>
		<FileUploader bind:files={imageFiles} accept=".jpg,.jpeg,.png,.gif,.webp" />
		{#if imageFiles && imageFiles.length > 0}
			<div class="file-display">
				<h3>選択された画像:</h3>
				<ul>
					{#each imageFiles as file}
						<li>{file.name} ({formatFileSize(file.size)})</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>

	<div class="test-section">
		<h2>ドキュメントのみ</h2>
		<FileUploader bind:files={singleFile} accept=".pdf,.doc,.docx,.txt" />
		{#if singleFile && singleFile.length > 0}
			<div class="file-display">
				<h3>選択されたファイル:</h3>
				<ul>
					{#each singleFile as file}
						<li>{file.name} ({formatFileSize(file.size)})</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>

	<div class="test-section">
		<h2>アクセシビリティテスト</h2>
		<p>キーボードナビゲーションをテストしてください：</p>
		<ul>
			<li>Tabキーでフォーカス移動</li>
			<li>EnterキーまたはSpaceキーでファイル選択ダイアログを開く</li>
			<li>スクリーンリーダーでaria-labelが読み上げられることを確認</li>
		</ul>
	</div>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: var(--svelte-ui-spacing-lg);
	}

	.test-section {
		margin-bottom: var(--svelte-ui-spacing-xl);
		padding: var(--svelte-ui-spacing-lg);
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: var(--svelte-ui-border-radius);
		background-color: var(--svelte-ui-surface-color);
	}

	.test-section h2 {
		margin-top: 0;
		margin-bottom: var(--svelte-ui-spacing-md);
		color: var(--svelte-ui-on-surface-color);
	}

	.controls {
		margin-top: var(--svelte-ui-spacing-md);
	}

	.file-display {
		margin-top: var(--svelte-ui-spacing-md);
		padding: var(--svelte-ui-spacing-sm);
		background-color: var(--svelte-ui-surface-variant-color);
		border-radius: var(--svelte-ui-border-radius-sm);
	}

	.file-display h3 {
		margin-top: 0;
		margin-bottom: var(--svelte-ui-spacing-sm);
		color: var(--svelte-ui-on-surface-variant-color);
	}

	.file-display ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.file-display li {
		padding: var(--svelte-ui-spacing-xs);
		background-color: var(--svelte-ui-surface-color);
		border-radius: var(--svelte-ui-border-radius-xs);
		margin-bottom: var(--svelte-ui-spacing-xs);
		color: var(--svelte-ui-on-surface-color);
	}

	.file-display li:last-child {
		margin-bottom: 0;
	}

	h1 {
		color: var(--svelte-ui-on-surface-color);
	}

	p {
		color: var(--svelte-ui-on-surface-color);
	}

	ul {
		color: var(--svelte-ui-on-surface-color);
	}
</style>

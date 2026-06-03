<script lang="ts">
	import Textarea from '$lib/components/Textarea.svelte';

	const longText = `1行目: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
2行目: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
3行目: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
4行目: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
5行目: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui.
6行目: Officia deserunt mollit anim id est laborum et dolorum fuga.
7行目: Et harum quidem rerum facilis est et expedita distinctio.
8行目: Nam libero tempore, cum soluta nobis est eligendi optio cumque.
9行目: Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus.
10行目: Quis autem vel eum iure reprehenderit qui in ea voluptate velit.`;

	let value1 = $state(longText);
	let value2 = $state(longText);
	let value3 = $state(longText);
	let value4 = $state(longText);
	let value5 = $state(longText);
</script>

<svelte:head>
	<title>Textarea 高さ制限テスト</title>
</svelte:head>

<main>
	<h1>Textarea 高さ制限テスト</h1>
	<p class="description">
		親コンテナの高さが制限された場合の Textarea の動作確認。<br />
		<code>display-text</code>（非フォーカス時）と <code>textarea</code>（フォーカス時）の両方がスクロール可能か検証する。
	</p>

	<div class="cases">
		<!-- ケース1: overflow: hidden + 固定高さ -->
		<section>
			<h2>ケース 1: 親に <code>height: 150px; overflow: hidden</code></h2>
			<p class="note">クリップされた分は見えないが、フォーカスするとtextareaがスクロール可能になるはず。display-text もスクロール可能か確認。</p>
			<div class="parent parent--overflow-hidden">
				<Textarea bind:value={value1} />
			</div>
		</section>

		<!-- ケース2: overflow: auto + 固定高さ（親がスクロール） -->
		<section>
			<h2>ケース 2: 親に <code>height: 150px; overflow: auto</code></h2>
			<p class="note">親がスクロールする。Textareaコンテナが親からはみ出して親をスクロールさせる。</p>
			<div class="parent parent--overflow-auto">
				<Textarea bind:value={value2} />
			</div>
		</section>

		<!-- ケース3: fullHeight=true -->
		<section>
			<h2>ケース 3: <code>fullHeight=true</code>（親に <code>height: 150px</code>）</h2>
			<p class="note">Textareaが親の高さを埋める。display-text がコンテナを超えずスクロールするか確認。</p>
			<div class="parent parent--overflow-hidden">
				<Textarea bind:value={value3} fullHeight />
			</div>
		</section>

		<!-- ケース4: maxHeight prop -->
		<section>
			<h2>ケース 4: <code>maxHeight=150</code></h2>
			<p class="note">maxHeight propで高さを制限。display-text と textarea 両方がスクロール可能か確認。</p>
			<div class="parent">
				<Textarea bind:value={value4} maxHeight={150} />
			</div>
		</section>

		<!-- ケース5: autoResize=false + 固定高さ -->
		<section>
			<h2>ケース 5: <code>autoResize=false</code>（親に <code>height: 150px; overflow: hidden</code>）</h2>
			<p class="note">autoResize無効。syncSizeFromTextareaにより高さが同期される。</p>
			<div class="parent parent--overflow-hidden">
				<Textarea bind:value={value5} autoResize={false} />
			</div>
		</section>
	</div>
</main>

<style>
	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.description {
		color: #555;
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.cases {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	section {
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 1.25rem;
	}

	h2 {
		font-size: 1rem;
		margin: 0 0 0.5rem 0;
	}

	.note {
		font-size: 0.85rem;
		color: #666;
		margin: 0 0 1rem 0;
	}

	code {
		background: #f0f0f0;
		padding: 0.1em 0.3em;
		border-radius: 3px;
		font-size: 0.9em;
	}

	/* 親コンテナのスタイル */
	.parent {
		background: #fafafa;
		border-radius: 4px;
	}

	.parent--overflow-hidden {
		height: 150px;
		overflow: hidden;
	}

	.parent--overflow-auto {
		height: 150px;
		overflow: auto;
	}
</style>

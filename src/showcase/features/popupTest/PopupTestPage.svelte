<script lang="ts">
	import Popup from '#lib/sharedComponents/Popup.svelte';

	let anchorElement1: HTMLElement;
	let anchorElement2: HTMLElement;
	let anchorElement3: HTMLElement;
	let anchorElement4: HTMLElement;
	let anchorElement5: HTMLElement;
	let anchorElement6: HTMLElement;
	let popupRef1: any;
	let popupRef2: any;
	let popupRef3: any;
	let popupRef4: any;
	let popupRef5: any;
	let popupRef6: any;

	const generateContent = (count: number) => {
		return Array.from({ length: count }, (_, i) => `コンテンツ ${i + 1}`);
	};

	const pageContent = generateContent(50);
	const scrollableContent = generateContent(30);
</script>

<svelte:head>
	<title>Popup スクロールテスト</title>
</svelte:head>

<div class="test-container">
	<h1>Popup スクロール動作テスト</h1>

	<div class="test-description">
		<p>このページでは、Popupコンポーネントのスクロール時の動作を確認できます。</p>
		<p>以下のケースをテストしてください：</p>
		<ul>
			<li>✅ ページ全体のスクロール時にPopupが閉じる</li>
			<li>✅ anchorElementの親要素のスクロール時にPopupが閉じる</li>
			<li>🔍 関係ない要素のスクロール時はPopupが閉じない</li>
			<li>🔍 Popup内でスクロールした時はPopupが閉じない</li>
		</ul>
	</div>

	<!-- テストケース1: ページ全体のスクロール -->
	<div class="test-case">
		<h2>テストケース1: ページ全体のスクロール</h2>
		<p>このボタンをクリックしてPopupを開き、ページをスクロールしてください。</p>
		<button
			bind:this={anchorElement1}
			onclick={() => popupRef1?.toggle()}
			class="test-button test-button--filled"
		>
			ページスクロールテスト用Popup
		</button>

		<Popup bind:this={popupRef1} anchorElement={anchorElement1} position="bottom-center">
			<div class="popup-content">
				<h3>ページスクロールテスト</h3>
				<p>このPopupが開いた状態でページをスクロールしてください。</p>
				<p>スクロールするとPopupが自動的に閉じるはずです。</p>
				<button onclick={() => popupRef1?.close()} class="test-button test-button--text"
					>閉じる</button
				>
			</div>
		</Popup>
	</div>

	<!-- 大量のコンテンツでページスクロールを発生させる -->
	<div class="page-content">
		<h3>ページコンテンツ（スクロール用）</h3>
		{#each pageContent as content}
			<div class="content-item">{content}</div>
		{/each}
	</div>

	<!-- テストケース2: anchorElementの親要素のスクロール -->
	<div class="test-case">
		<h2>テストケース2: anchorElementの親要素のスクロール</h2>
		<p>このボタンをクリックしてPopupを開き、下のスクロールボックス内をスクロールしてください。</p>
		<p>
			<strong>注意:</strong> ボタンはスクロールボックス内にあるので、スクロールするとPopupが閉じます。
		</p>

		<div class="scrollable-container">
			<h4>スクロールボックス（anchorElementの親要素）</h4>
			<button
				bind:this={anchorElement2}
				onclick={() => popupRef2?.toggle()}
				class="test-button test-button--outlined"
			>
				親要素スクロールテスト用Popup
			</button>

			<Popup bind:this={popupRef2} anchorElement={anchorElement2} position="top-center">
				<div class="popup-content">
					<h3>親要素スクロールテスト</h3>
					<p>
						このPopupが開いた状態で、ボタンの親要素（スクロールボックス）内をスクロールしてください。
					</p>
					<p>スクロールするとPopupが自動的に閉じるはずです。</p>
					<button onclick={() => popupRef2?.close()} class="test-button test-button--text"
						>閉じる</button
					>
				</div>
			</Popup>

			{#each scrollableContent as content}
				<div class="scrollable-item">{content}</div>
			{/each}
		</div>
	</div>

	<!-- テストケース3: 関係ない要素のスクロール -->
	<div class="test-case">
		<h2>テストケース3: 関係ない要素のスクロール</h2>
		<p>このボタンをクリックしてPopupを開き、下のスクロールボックス内をスクロールしてください。</p>
		<p>
			<strong>期待される動作:</strong> ボタンと関係ない要素なので、スクロールしてもPopupは閉じません。
		</p>
		<button
			bind:this={anchorElement3}
			onclick={() => popupRef3?.toggle()}
			class="test-button test-button--outlined"
		>
			関係ない要素スクロールテスト用Popup
		</button>

		<Popup bind:this={popupRef3} anchorElement={anchorElement3} position="bottom-left">
			<div class="popup-content">
				<h3>関係ない要素スクロールテスト</h3>
				<p>このPopupが開いた状態で、下のスクロールボックス内をスクロールしてください。</p>
				<p>
					<strong>注意:</strong> ボタンとは関係ない要素なので、スクロールしてもPopupは閉じません。
				</p>
				<button onclick={() => popupRef3?.close()} class="test-button test-button--text"
					>閉じる</button
				>
			</div>
		</Popup>

		<div class="scrollable-container">
			<h4>関係ない要素のスクロールボックス</h4>
			{#each scrollableContent as content}
				<div class="scrollable-item">{content}</div>
			{/each}
		</div>
	</div>

	<!-- テストケース4: Popup内でのスクロール -->
	<div class="test-case">
		<h2>テストケース4: Popup内でのスクロール</h2>
		<p>
			このボタンをクリックしてPopupを開き、<strong>Popup内のコンテンツをスクロール</strong
			>してください。
		</p>
		<p>
			<strong>期待される動作:</strong> Popup内でスクロールしても、Popupは閉じずに開いたままになる。
		</p>
		<button
			bind:this={anchorElement4}
			onclick={() => popupRef4?.toggle()}
			class="test-button test-button--filled"
		>
			Popup内スクロールテスト用Popup
		</button>

		<Popup bind:this={popupRef4} anchorElement={anchorElement4} position="bottom-center">
			<div class="popup-content popup-content--scrollable">
				<h3>Popup内スクロールテスト</h3>
				<p>このPopup内で下にスクロールしてください。</p>
				<p><strong>注意:</strong> Popup内でスクロールしてもPopupは閉じてはいけません。</p>

				<div class="popup-scroll-area">
					<h4>スクロール可能な長いコンテンツ</h4>
					{#each Array.from({ length: 20 }, (_, i) => `Popup内コンテンツ ${i + 1}`) as content}
						<div class="popup-content-item">{content}</div>
					{/each}
				</div>

				<div class="popup-scroll-list">
					<h4>スクロール可能なリスト</h4>
					<div class="scrollable-list">
						{#each Array.from({ length: 15 }, (_, i) => `リスト項目 ${i + 1}`) as item}
							<div class="list-item">{item}</div>
						{/each}
					</div>
				</div>

				<div class="popup-textarea">
					<h4>テキストエリア</h4>
					<textarea
						placeholder="このテキストエリア内でスクロールしてもPopupは閉じません"
						rows="6"
						class="popup-textarea-input"
						>これは長いテキストのサンプルです。
						このテキストエリアでは複数行の入力が可能で、内容が多くなるとスクロールが発生します。
						テキストエリア内でスクロールしても、Popupは閉じずに開いたままになるはずです。
						この動作を確認するために、実際にテキストエリア内でスクロールしてみてください。
						マウスホイールを使用したり、スクロールバーを操作したりして、Popupが不適切に閉じないことを確認してください。</textarea
					>
				</div>

				<div class="popup-actions">
					<button onclick={() => popupRef4?.close()} class="test-button test-button--text"
						>閉じる</button
					>
				</div>
			</div>
		</Popup>
	</div>

	<!-- テストケース5: 複数のスクロールコンテナ -->
	<div class="test-case">
		<h2>テストケース5: 複数のスクロールコンテナ</h2>
		<p>このボタンをクリックしてPopupを開き、左右のスクロールボックス内をスクロールしてください。</p>
		<p>
			<strong>期待される動作:</strong> ボタンと関係ない要素なので、スクロールしてもPopupは閉じません。
		</p>
		<button
			bind:this={anchorElement5}
			onclick={() => popupRef5?.toggle()}
			class="test-button test-button--filled"
		>
			複数スクロールコンテナテスト用Popup
		</button>

		<Popup bind:this={popupRef5} anchorElement={anchorElement5} position="bottom-center">
			<div class="popup-content">
				<h3>複数スクロールコンテナテスト</h3>
				<p>このPopupが開いた状態で左右のスクロールボックス内をスクロールしてください。</p>
				<p>
					<strong>注意:</strong> 左右のボックスはボタンと関係ない要素なので、スクロールしてもPopupは閉じません。
				</p>
				<button onclick={() => popupRef5?.close()} class="test-button test-button--text"
					>閉じる</button
				>
			</div>
		</Popup>

		<div class="dual-scroll-container">
			<div class="scrollable-container small">
				<h4>左スクロールボックス（関係ない要素）</h4>
				{#each scrollableContent.slice(0, 15) as content}
					<div class="scrollable-item">{content}</div>
				{/each}
			</div>

			<div class="scrollable-container small">
				<h4>右スクロールボックス（関係ない要素）</h4>
				{#each scrollableContent.slice(15) as content}
					<div class="scrollable-item">{content}</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- テストケース6: anchorElementの親要素のスクロール（複雑なケース） -->
	<div class="test-case">
		<h2>テストケース6: anchorElementの親要素のスクロール（複雑なケース）</h2>
		<p>このボタンをクリックしてPopupを開き、各スクロールボックス内をスクロールしてください。</p>
		<p>
			<strong>期待される動作:</strong> ボタンを含む左のボックスではPopupが閉じ、右のボックスではPopupが閉じない。
		</p>

		<div class="dual-scroll-container">
			<div class="scrollable-container small">
				<h4>左スクロールボックス（anchorElementの親要素）</h4>
				<button
					bind:this={anchorElement6}
					onclick={() => popupRef6?.toggle()}
					class="test-button test-button--outlined"
				>
					複雑なケーステスト用Popup
				</button>

				<Popup bind:this={popupRef6} anchorElement={anchorElement6} position="right-center">
					<div class="popup-content">
						<h3>複雑なケーステスト</h3>
						<p>左のボックス内をスクロール → Popupが閉じる</p>
						<p>右のボックス内をスクロール → Popupが閉じない</p>
						<button onclick={() => popupRef6?.close()} class="test-button test-button--text"
							>閉じる</button
						>
					</div>
				</Popup>

				{#each scrollableContent.slice(0, 15) as content}
					<div class="scrollable-item">{content}</div>
				{/each}
			</div>

			<div class="scrollable-container small">
				<h4>右スクロールボックス（関係ない要素）</h4>
				{#each scrollableContent.slice(15) as content}
					<div class="scrollable-item">{content}</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- 追加のページコンテンツ -->
	<div class="page-content">
		<h3>追加のページコンテンツ</h3>
		{#each pageContent.slice(0, 20) as content}
			<div class="content-item">{content}</div>
		{/each}
	</div>
</div>

<style>
	.test-container {
		padding: 20px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.test-description {
		background: #f5f5f5;
		padding: 20px;
		border-radius: 8px;
		margin-bottom: 30px;
	}

	.test-description ul {
		margin: 10px 0;
		padding-left: 20px;
	}

	.test-case {
		margin: 40px 0;
		padding: 20px;
		border: 2px solid #e0e0e0;
		border-radius: 8px;
		background: #fafafa;
	}

	.test-case h2 {
		margin-top: 0;
		color: #333;
	}

	.page-content {
		margin: 30px 0;
	}

	.content-item {
		padding: 10px 0;
		border-bottom: 1px solid #eee;
	}

	.scrollable-container {
		height: 300px;
		overflow-y: scroll;
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 10px;
		margin: 10px 0;
		background: white;
	}

	.scrollable-container.small {
		height: 200px;
	}

	.scrollable-item {
		padding: 8px 0;
		border-bottom: 1px solid #f0f0f0;
	}

	.dual-scroll-container {
		display: flex;
		gap: 20px;
	}

	.dual-scroll-container .scrollable-container {
		flex: 1;
	}

	.popup-content {
		padding: 20px;
		min-width: 300px;
	}

	.popup-content h3 {
		margin-top: 0;
		margin-bottom: 10px;
	}

	.popup-content p {
		margin: 10px 0;
		line-height: 1.5;
	}

	/* Popup内スクロールテスト用スタイル */
	.popup-content--scrollable {
		max-height: 600px;
		overflow-y: auto;
		max-width: 450px;
	}

	.popup-scroll-area {
		margin: 20px 0;
		padding: 10px;
		background: #f9f9f9;
		border-radius: 4px;
	}

	.popup-content-item {
		padding: 8px 0;
		border-bottom: 1px solid #eee;
	}

	.popup-scroll-list {
		margin: 20px 0;
	}

	.scrollable-list {
		max-height: 150px;
		overflow-y: auto;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 10px;
		background: white;
	}

	.list-item {
		padding: 8px 0;
		border-bottom: 1px solid #f0f0f0;
	}

	.list-item:last-child {
		border-bottom: none;
	}

	.popup-textarea {
		margin: 20px 0;
	}

	.popup-textarea-input {
		width: 100%;
		min-height: 120px;
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-family: inherit;
		font-size: 14px;
		resize: vertical;
		box-sizing: border-box;
	}

	.popup-actions {
		margin-top: 20px;
		padding-top: 20px;
		border-top: 1px solid #eee;
		text-align: right;
	}

	h1,
	h2,
	h3,
	h4 {
		color: #333;
	}

	h1 {
		text-align: center;
		margin-bottom: 20px;
	}

	/* カスタムボタンスタイル */
	.test-button {
		padding: 10px 20px;
		border-radius: 6px;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		border: 1px solid transparent;
		background: transparent;
		color: #333;
		margin: 5px;
	}

	.test-button:hover {
		opacity: 0.8;
	}

	.test-button--filled {
		background: #007bff;
		color: white;
		border-color: #007bff;
	}

	.test-button--outlined {
		background: transparent;
		color: #007bff;
		border-color: #007bff;
	}

	.test-button--text {
		background: transparent;
		color: #007bff;
		border-color: transparent;
	}

	.test-button--text:hover {
		background: rgba(0, 123, 255, 0.1);
	}

	@media (max-width: 768px) {
		.dual-scroll-container {
			flex-direction: column;
		}

		.test-container {
			padding: 10px;
		}
	}
</style>

<script lang="ts">
	import Fab from '$lib/components/Fab.svelte';
	import Button from '$lib/components/Button.svelte';
	import Tab from '$lib/components/Tab.svelte';
	import type { MenuItem } from '$lib/types/MenuItem';

	const tabItems: MenuItem[] = [
		{
			title: 'Home',
			href: '/',
			icon: 'home'
		},
		{
			title: 'About',
			href: '/about',
			icon: 'info'
		},
		{
			title: 'Services',
			href: '/services',
			icon: 'business'
		},
		{
			title: 'Contact',
			href: '/contact',
			icon: 'contact_mail'
		},
		{
			title: 'Products',
			href: '/products',
			icon: 'inventory_2',
			strictMatch: false
		}
	];
</script>

<svelte:head>
	<title>Fab Component Test - SvelteKit UI Library</title>
	<meta name="description" content="Testing Fab Component" />
</svelte:head>

<Tab {tabItems} ariaLabel="Main navigation" />

<main>
	<div class="container">
		<h1>Fab Component Test</h1>
		<p>ここでFabコンポーネントのアイコンの配置とサイズを確認してください。</p>

		<div class="test-section">
			<h2>アイコンの配置確認</h2>
			<p>通常のボタンと比較してアイコンが中央に配置されているか確認してください。</p>

			<div class="comparison-container">
				<div class="comparison-item">
					<h3>通常のボタン (参考)</h3>
					<button class="reference-button">
						<i class="material-symbols-outlined">add</i>
					</button>
				</div>

				<div class="comparison-item">
					<h3>Buttonコンポーネント (参考)</h3>
					<Button
						variant="filled"
						icon="add"
						customStyle="width: 56px; height: 56px; border-radius: 50%; padding: 0;"
					>
						<span class="sr-only">Reference Button</span>
					</Button>
				</div>
			</div>
		</div>

		<div class="test-section">
			<h2>実際のFabコンポーネント</h2>
			<p>下記のFabコンポーネントのアイコンが中央に配置されているか確認してください。</p>

			<div class="inline-fab-container">
				<div class="fab-demo">
					<h3>Filled Variant</h3>
					<Fab icon="add" position="center" variant="filled" color="#6750a4" />
				</div>

				<div class="fab-demo">
					<h3>Outlined Variant</h3>
					<Fab icon="edit" position="center" variant="outlined" />
				</div>

				<div class="fab-demo">
					<h3>Text Variant</h3>
					<Fab icon="favorite" position="center" variant="text" />
				</div>
			</div>
		</div>

		<div class="test-section">
			<h2>さまざまなアイコン</h2>
			<p>異なるアイコンでも正しく中央に配置されているか確認してください。</p>

			<div class="icon-test-grid">
				<div class="icon-test-item">
					<Fab icon="home" position="center" variant="filled" />
					<p>home</p>
				</div>
				<div class="icon-test-item">
					<Fab icon="search" position="center" variant="filled" />
					<p>search</p>
				</div>
				<div class="icon-test-item">
					<Fab icon="settings" position="center" variant="filled" />
					<p>settings</p>
				</div>
				<div class="icon-test-item">
					<Fab icon="person" position="center" variant="filled" />
					<p>person</p>
				</div>
			</div>
		</div>

		<div class="test-section">
			<h2>ラベル付きFab</h2>
			<p>ラベルがある場合のアイコンの配置も確認してください。</p>

			<div class="labeled-fab-container">
				<Fab icon="add" position="center" variant="filled">Add Item</Fab>
			</div>
		</div>

		<div class="test-section">
			<h2>シャドウテスト</h2>
			<p>シャドウの有無とhover時のシャドウの変化を確認してください。</p>

			<div class="shadow-test-container">
				<div class="shadow-test-item">
					<h3>シャドウあり（デフォルト）</h3>
					<Fab icon="add" position="center" variant="filled" shadow={true} />
					<p>hover時にシャドウがスムーズに変化します</p>
				</div>

				<div class="shadow-test-item">
					<h3>シャドウなし</h3>
					<Fab icon="add" position="center" variant="filled" shadow={false} />
					<p>フラットなデザインです</p>
				</div>

				<div class="shadow-test-item">
					<h3>Outlined + シャドウあり</h3>
					<Fab icon="edit" position="center" variant="outlined" shadow={true} />
					<p>アウトライン付きでもシャドウが適用されます</p>
				</div>

				<div class="shadow-test-item">
					<h3>Outlined + シャドウなし</h3>
					<Fab icon="edit" position="center" variant="outlined" shadow={false} />
					<p>アウトラインのみのフラットなデザインです</p>
				</div>
			</div>
		</div>

		<div class="test-section">
			<h2>ローディング状態テスト</h2>
			<p>ローディング中のLoadingSpinnerの表示とラベルの動作を確認してください。</p>

			<div class="shadow-test-container">
				<div class="shadow-test-item">
					<h3>アイコンのみ + ローディング</h3>
					<Fab icon="add" position="center" variant="filled" loading={true} />
					<p>LoadingSpinnerが24pxサイズで表示されます</p>
				</div>

				<div class="shadow-test-item">
					<h3>ラベル付き + ローディング</h3>
					<Fab icon="download" position="center" variant="filled" loading={true}>Downloading</Fab>
					<p>ラベルが透明になり、スピナーが表示されます</p>
				</div>

				<div class="shadow-test-item">
					<h3>Outlined + ローディング</h3>
					<Fab icon="upload" position="center" variant="outlined" loading={true} />
					<p>アウトライン付きでもローディングが動作します</p>
				</div>

				<div class="shadow-test-item">
					<h3>通常状態（比較用）</h3>
					<Fab icon="add" position="center" variant="filled" loading={false} />
					<p>通常状態と比較してください</p>
				</div>
			</div>
		</div>

		<div class="instructions">
			<h2>確認ポイント</h2>
			<ul>
				<li>アイコンが正確に中央に配置されている</li>
				<li>アイコンサイズが24pxで適切に表示されている</li>
				<li>アイコンのみのFabは正円形 (56px × 56px) になっている</li>
				<li>ラベル付きFabは適切な幅で表示されている</li>
				<li>参考用のボタンと比較してアイコンの位置が同じである</li>
				<li><strong>シャドウありのFabでhover時にシャドウがスムーズに変化する</strong></li>
				<li><strong>シャドウなしのFabはフラットなデザインである</strong></li>
				<li><strong>ローディング中は24pxのLoadingSpinnerが正しく表示される</strong></li>
				<li><strong>ローディング中はラベルが透明になり、クリックが無効化される</strong></li>
				<li><strong>ローディング中はcursor: waitになる</strong></li>
			</ul>
		</div>
	</div>
</main>

<!-- Fixed position Fabs -->
<Fab icon="add" position="left" variant="filled" color="#6750a4" />
<Fab icon="edit" position="right" variant="outlined" />

<style>
	main {
		padding: 20px;
		min-height: 100vh;
		padding-bottom: 120px; /* Space for fixed FABs */
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
	}

	.test-section {
		margin-bottom: 40px;
		padding: 20px;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		background: #fafafa;
	}

	.comparison-container {
		display: flex;
		gap: 40px;
		margin-top: 20px;
	}

	.comparison-item {
		text-align: center;
	}

	.reference-button {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: #6750a4;
		color: white;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		font-family: 'Material Symbols Outlined';
	}

	/* Material Symbols フォントを読み込み */
	@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

	.inline-fab-container {
		display: flex;
		gap: 40px;
		margin-top: 20px;
	}

	.fab-demo {
		text-align: center;
		position: relative;
		height: 120px;
	}

	.fab-demo h3 {
		margin-bottom: 20px;
	}

	.icon-test-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		gap: 20px;
		margin-top: 20px;
	}

	.icon-test-item {
		text-align: center;
		position: relative;
		height: 100px;
	}

	.icon-test-item p {
		margin-top: 10px;
		font-size: 14px;
	}

	.labeled-fab-container {
		text-align: center;
		margin-top: 20px;
		position: relative;
		height: 80px;
	}

	.shadow-test-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 30px;
		margin-top: 20px;
	}

	.shadow-test-item {
		text-align: center;
		padding: 20px;
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		position: relative;
		height: 120px;
	}

	.shadow-test-item h3 {
		margin: 0 0 20px 0;
		font-size: 16px;
		color: #333;
	}

	.shadow-test-item p {
		margin: 20px 0 0 0;
		font-size: 14px;
		color: #666;
	}

	.instructions {
		background: #e8f4f8;
		padding: 20px;
		border-radius: 8px;
		margin-top: 40px;
	}

	.instructions ul {
		margin-left: 20px;
	}

	.instructions li {
		margin-bottom: 8px;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>

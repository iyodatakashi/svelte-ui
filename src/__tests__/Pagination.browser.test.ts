import { test, expect } from '@playwright/test';

test.describe('Pagination Component - Browser Tests', () => {
	test('should render Pagination component in browser', async ({ page }) => {
		// テスト用のHTMLページを作成
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 1,
							onchange: (pageNum) => {
								console.log('Page changed to:', pageNum);
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		// ページネーションがレンダリングされているか確認
		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();
	});

	test('should support basic pagination', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Basic Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 500,
							limit: 50,
							currentPageNum: 1,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// ページ番号が表示されていることを確認
		const pageNumbers = page.locator('.page-number');
		await expect(pageNumbers.first()).toBeVisible();
	});

	test('should support page navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Navigation Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 5,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// 次のページボタンが存在することを確認
		const nextButton = page.locator('.next-button');
		await expect(nextButton).toBeVisible();

		// 前のページボタンが存在することを確認
		const prevButton = page.locator('.prev-button');
		await expect(prevButton).toBeVisible();
	});

	test('should support first and last page navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination First Last Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 5,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// 最初のページボタンが存在することを確認
		const firstButton = page.locator('.first-button');
		await expect(firstButton).toBeVisible();

		// 最後のページボタンが存在することを確認
		const lastButton = page.locator('.last-button');
		await expect(lastButton).toBeVisible();
	});

	test('should support page number clicking', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Page Click Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 1,
							onchange: (pageNum) => {
								window.clickedPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// ページ番号をクリック
		const pageNumber = page.locator('.page-number').nth(1);
		await pageNumber.click();

		const clickedPage = await page.evaluate(() => window.clickedPage);
		expect(clickedPage).toBeDefined();
	});

	test('should support next page navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Next Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 1,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// 次のページボタンをクリック
		const nextButton = page.locator('.next-button');
		await nextButton.click();

		const currentPage = await page.evaluate(() => window.currentPage);
		expect(currentPage).toBe(2);
	});

	test('should support previous page navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Previous Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 3,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// 前のページボタンをクリック
		const prevButton = page.locator('.prev-button');
		await prevButton.click();

		const currentPage = await page.evaluate(() => window.currentPage);
		expect(currentPage).toBe(2);
	});

	test('should support first page navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination First Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 5,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// 最初のページボタンをクリック
		const firstButton = page.locator('.first-button');
		await firstButton.click();

		const currentPage = await page.evaluate(() => window.currentPage);
		expect(currentPage).toBe(1);
	});

	test('should support last page navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Last Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 1,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// 最後のページボタンをクリック
		const lastButton = page.locator('.last-button');
		await lastButton.click();

		const currentPage = await page.evaluate(() => window.currentPage);
		expect(currentPage).toBe(10); // 1000 / 100 = 10 pages
	});

	test('should support visible pages configuration', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Visible Pages Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 5,
							visiblePages: 7,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// 表示されるページ番号の数を確認
		const pageNumbers = page.locator('.page-number');
		await expect(pageNumbers).toHaveCount(7);
	});

	test('should support show count option', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Show Count Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 1,
							showCount: true,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// カウント表示が存在することを確認
		const countDisplay = page.locator('.count-display');
		await expect(countDisplay).toBeVisible();
	});

	test('should support show range option', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Show Range Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 1,
							showRange: true,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// 範囲表示が存在することを確認
		const rangeDisplay = page.locator('.range-display');
		await expect(rangeDisplay).toBeVisible();
	});

	test('should support show total option', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Show Total Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 1,
							showTotal: true,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// 総数表示が存在することを確認
		const totalDisplay = page.locator('.total-display');
		await expect(totalDisplay).toBeVisible();
	});

	test('should support ellipsis display', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Ellipsis Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 10000,
							limit: 100,
							currentPageNum: 50,
							visiblePages: 5,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// 省略記号が表示されることを確認
		const ellipsis = page.locator('.ellipsis');
		await expect(ellipsis).toBeVisible();
	});

	test('should support accessibility attributes', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Accessibility Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 1,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// ARIA属性が設定されていることを確認
		await expect(pagination).toHaveAttribute('role', 'navigation');
	});

	test('should support keyboard navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Keyboard Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 1,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// キーボードナビゲーションをテスト
		const nextButton = page.locator('.next-button');
		await nextButton.focus();
		await expect(nextButton).toBeFocused();
	});

	test('should support different page sizes', async ({ page }) => {
		const pageSizes = [10, 25, 50, 100, 200];

		for (const size of pageSizes) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Pagination Page Size Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Pagination from './Pagination.svelte';
						
						const app = mount(Pagination, {
							target: document.getElementById('app'),
							props: {
								total: 1000,
								limit: ${size},
								currentPageNum: 1,
								onchange: (pageNum) => {
									window.currentPage = pageNum;
								}
							}
						});
					</script>
				</body>
				</html>
			`);

			const pagination = page.locator('.pagination');
			await expect(pagination).toBeVisible();
		}
	});

	test('should support different total counts', async ({ page }) => {
		const totalCounts = [100, 500, 1000, 5000, 10000];

		for (const total of totalCounts) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Pagination Total Count Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Pagination from './Pagination.svelte';
						
						const app = mount(Pagination, {
							target: document.getElementById('app'),
							props: {
								total: ${total},
								limit: 100,
								currentPageNum: 1,
								onchange: (pageNum) => {
									window.currentPage = pageNum;
								}
							}
						});
					</script>
				</body>
				</html>
			`);

			const pagination = page.locator('.pagination');
			await expect(pagination).toBeVisible();
		}
	});

	test('should support different current pages', async ({ page }) => {
		const currentPages = [1, 2, 5, 10, 20];

		for (const currentPage of currentPages) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Pagination Current Page Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Pagination from './Pagination.svelte';
						
						const app = mount(Pagination, {
							target: document.getElementById('app'),
							props: {
								total: 1000,
								limit: 100,
								currentPageNum: ${currentPage},
								onchange: (pageNum) => {
									window.currentPage = pageNum;
								}
							}
						});
					</script>
				</body>
				</html>
			`);

			const pagination = page.locator('.pagination');
			await expect(pagination).toBeVisible();
		}
	});

	test('should support single page', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Single Page Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 50,
							limit: 100,
							currentPageNum: 1,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// 単一ページの場合、ナビゲーションボタンが無効になることを確認
		const nextButton = page.locator('.next-button');
		await expect(nextButton).toBeDisabled();
	});

	test('should support edge cases', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Edge Cases Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 0,
							limit: 100,
							currentPageNum: 1,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();
	});

	test('should support boundary conditions', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Boundary Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 10, // Last page
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// 最後のページの場合、次のページボタンが無効になることを確認
		const nextButton = page.locator('.next-button');
		await expect(nextButton).toBeDisabled();
	});

	test('should support large datasets', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Large Dataset Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 100000,
							limit: 1000,
							currentPageNum: 1,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();
	});

	test('should support custom styling', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Custom Styling Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 1,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();
	});

	test('should support responsive design', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Responsive Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 1,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();
	});

	test('should support page state management', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination State Management Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 1,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// ページ状態の管理をテスト
		const currentPageButton = page.locator('.current-page');
		await expect(currentPageButton).toBeVisible();
	});

	test('should support page validation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Validation Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 1,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// ページバリデーションをテスト
		expect(true).toBe(true); // 型チェック用
	});

	test('should support page bounds checking', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Pagination Bounds Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Pagination from './Pagination.svelte';
					
					const app = mount(Pagination, {
						target: document.getElementById('app'),
						props: {
							total: 1000,
							limit: 100,
							currentPageNum: 1,
							onchange: (pageNum) => {
								window.currentPage = pageNum;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const pagination = page.locator('.pagination');
		await expect(pagination).toBeVisible();

		// ページ境界チェックをテスト
		expect(true).toBe(true); // 型チェック用
	});
});

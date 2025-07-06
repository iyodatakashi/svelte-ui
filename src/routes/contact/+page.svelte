<script>
	import Tab from '$lib/components/Tab.svelte';

	const tabItems = [
		{
			title: 'Home',
			href: '/',
			icon: 'home',
			strictMatch: true
		},
		{
			title: 'About',
			href: '/about',
			icon: 'info',
			strictMatch: true
		},
		{
			title: 'Services',
			href: '/services',
			icon: 'build',
			strictMatch: true
		},
		{
			title: 'Contact',
			href: '/contact',
			icon: 'mail',
			strictMatch: true
		},
		{
			title: 'Accessibility Test',
			href: '/accessibility-test',
			icon: 'accessibility',
			strictMatch: true
		}
	];
</script>

<svelte:head>
	<title>Contact - Tab Component Test</title>
</svelte:head>

<div class="container">
	<div class="tab-container">
		<Tab {tabItems} ariaLabel="Main navigation" />
	</div>

	<main>
		<h1>Contact Page</h1>
		<p>This is the Contact page. The "Contact" tab should be highlighted.</p>

		<div class="contact-content">
			<div class="contact-info">
				<h2>Get in Touch</h2>
				<div class="contact-item">
					<strong>📧 Email:</strong>
					<span>contact@example.com</span>
				</div>
				<div class="contact-item">
					<strong>📞 Phone:</strong>
					<span>+1 (555) 123-4567</span>
				</div>
				<div class="contact-item">
					<strong>🌐 Website:</strong>
					<span>www.example.com</span>
				</div>
			</div>

			<div class="keyboard-test">
				<h2>Keyboard Navigation Test</h2>
				<p>Try these keyboard shortcuts with the tabs above:</p>
				<ul>
					<li><kbd>Tab</kbd> - Focus on the first tab</li>
					<li><kbd>←</kbd> <kbd>→</kbd> - Navigate between tabs</li>
					<li><kbd>Home</kbd> - Go to first tab</li>
					<li><kbd>End</kbd> - Go to last tab</li>
					<li><kbd>Enter</kbd> or <kbd>Space</kbd> - Activate focused tab</li>
				</ul>
			</div>
		</div>
	</main>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
	}

	.tab-container {
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		margin-bottom: 2rem;
		height: 60px;
	}

	.contact-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-top: 2rem;
	}

	.contact-info,
	.keyboard-test {
		background: white;
		padding: 1.5rem;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.contact-info h2,
	.keyboard-test h2 {
		margin-top: 0;
		color: #2d3748;
	}

	.contact-item {
		display: flex;
		gap: 1rem;
		padding: 0.5rem 0;
		border-bottom: 1px solid #e2e8f0;
	}

	.contact-item:last-child {
		border-bottom: none;
	}

	.keyboard-test ul {
		list-style: none;
		padding: 0;
	}

	.keyboard-test li {
		padding: 0.5rem 0;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	kbd {
		background: #f1f1f1;
		border: 1px solid #ccc;
		border-radius: 3px;
		padding: 0.2rem 0.4rem;
		font-size: 0.9rem;
		font-family: monospace;
	}

	@media (max-width: 768px) {
		.contact-content {
			grid-template-columns: 1fr;
		}
	}
</style>

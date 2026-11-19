<script>
	import { page } from '$app/state';
	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/study', label: 'Study' },
		{ href: '/starred-content', label: 'Starred content' }
	];
</script>

<header>
	<a class="brand" href="/">Beauty in the Eye of the Beholder</a>
	<nav aria-label="Main">
		<ul>
			{#each links as link (link.href)}
				<li>
					<a href={link.href} aria-current={page.url.pathname === link.href ? 'page' : undefined}>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 0.75rem 1.5rem;
		width: min(100% - 2rem, 60rem);
		margin: 1rem auto 0;
		padding: 0.9rem 1.5rem;
		background: var(--surface);
		border-radius: var(--radius);
		box-shadow: var(--raised);
	}
	.brand {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text);
		text-decoration: none;
	}
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	nav a {
		display: block;
		padding: 0.4rem 1rem;
		font-weight: 600;
		color: var(--text);
		text-decoration: none;
		border-radius: 999px;
		transition: box-shadow 0.2s ease;
	}
	nav a:hover,
	nav a[aria-current='page'] {
		color: var(--accent-strong);
		box-shadow: var(--pressed);
	}
</style>

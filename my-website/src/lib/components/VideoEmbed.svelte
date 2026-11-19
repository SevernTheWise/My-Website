<script>
	let { id, title } = $props();
	let playing = $state(false);
</script>

{#if playing}
	<iframe
		src="https://www.youtube-nocookie.com/embed/{id}?autoplay=1&color=white"
		{title}
		allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
		allowfullscreen
	></iframe>
{:else}
	<button class="poster" onclick={() => (playing = true)} aria-label="Play video: {title}">
		<img src="https://i.ytimg.com/vi/{id}/hqdefault.jpg" alt="" />
		<span class="play" aria-hidden="true">&#9654;</span>
	</button>
{/if}

<style>
	iframe,
	.poster {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		border: 0;
		border-radius: var(--radius-small);
	}

	.poster {
		position: relative;
		padding: 0;
		overflow: hidden;
		cursor: pointer;
		background: var(--bg);
		box-shadow: var(--raised-small);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.play {
		position: absolute;
		top: 50%;
		left: 50%;
		display: grid;
		place-items: center;
		width: 4.5rem;
		height: 4.5rem;
		color: #fff;
		font-size: 1.5rem;
		background: var(--accent);
		border-radius: 50%;
		box-shadow:
			6px 6px 14px rgba(60, 45, 170, 0.4),
			inset -3px -3px 8px rgba(60, 45, 170, 0.35),
			inset 3px 3px 8px rgba(255, 255, 255, 0.35);
		transform: translate(-50%, -50%);
		transition: transform 0.2s ease;
	}

	.poster:hover .play {
		transform: translate(-50%, -50%) scale(1.08);
	}
</style>
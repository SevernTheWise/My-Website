<script>
	import VideoEmbed from '#lib/components/VideoEmbed.svelte';
</script>

<svelte:head>
	<title>Starred content | Kelvin Hutchinson</title>
</svelte:head>

<p class="label">Favourites</p>
<h1>Starred content</h1>

<figure class="video clay">
	<VideoEmbed id="UTM2gi2_7ww" title="Describe this video here" />
	<figcaption>Write one line about why you starred this.</figcaption>
</figure>

<style>
	.video {
		max-width: 44rem;
		margin: 0;
		padding: 1rem;
	}

	figcaption {
		margin-top: 0.75rem;
		color: var(--text-muted);
		font-size: 0.9rem;
	}
</style>
<script>
	import { questions, chapters, mnemonics } from '../../lib/data/questions.js';
	import Quiz from '../../lib/components/Quiz.svelte';
	import Flashcards from '../../lib/components/Flashcards.svelte';

	let tab = $state('quiz'); // which tab is showing: 'quiz', 'cards' or 'memory'

	// The chapter numbers that are switched on. At the start, all of them are.
	let chosen = $state(chapters.map((chapter) => chapter.number));

	// Switches a chapter on if it is off, and off if it is on
	// @ts-ignore
	function toggleChapter(number) {
		if (chosen.includes(number)) {
			chosen = chosen.filter((n) => n !== number);
		} else {
			chosen = [...chosen, number];
		}
	}

	// $derived values update by themselves whenever the chosen chapters change
	const pool = $derived(questions.filter((q) => chosen.includes(q.ch)));

	// Each flashcard is a question turned into a front and a back
	// @ts-ignore
	const cards = $derived(
		pool.map((q) => {
			return {
				front: q.q,
				img: 'img' in q ? q.img : undefined,
				back: q.answer.map((index) => q.options[index]).join(' / '),
				note: q.why
			};
		})
	);
</script>

<svelte:head>
	<title>Study | Kelvin Hutchinson</title>
</svelte:head>

<p class="label">IT Essentials 7.0</p>
<h1>Study</h1>

<section class="study">
	<p class="muted">Pick the chapters to practise. Hover a number to see its name.</p>
	<div class="chips">
		{#each chapters as chapter (chapter.number)}
			<button
				class="chip"
				class:on={chosen.includes(chapter.number)}
				title={chapter.name}
				onclick={() => toggleChapter(chapter.number)}
			>
				{chapter.number}
			</button>
		{/each}
	</div>

	<nav class="tabs" aria-label="Study mode">
		<button aria-current={tab === 'quiz'} onclick={() => (tab = 'quiz')}>Quiz</button>
		<button aria-current={tab === 'cards'} onclick={() => (tab = 'cards')}>Flashcards</button>
		<button aria-current={tab === 'memory'} onclick={() => (tab = 'memory')}>Memory</button>
	</nav>

	{#if tab === 'quiz'}
		<Quiz questions={pool} />
	{:else if tab === 'cards'}
		<Flashcards {cards} />
	{:else}
		{#each mnemonics as tip (tip.title)}
			<div class="tip">
				<h3>{tip.title}</h3>
				<p class="hook">{tip.hook}</p>
				<p class="muted">{tip.detail}</p>
			</div>
		{/each}

		<h2>How to study</h2>
		<ul>
			<li>Try to answer before you look. Trying and getting it wrong teaches more than re-reading.</li>
			<li>Do short sessions over several days instead of one long night.</li>
			<li>Practise all 14 chapters, because you will not know which exam version you get.</li>
			<li>When you get one wrong, explain the right answer out loud in your own words.</li>
		</ul>
	{/if}
</section>

<style>
	.study {
		max-width: 44rem;
	}

	.muted {
		color: var(--text-muted);
		font-size: 0.9rem;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.chip {
		min-width: 2.5rem;
		padding: 0.3rem 0.5rem;
		font: inherit;
		font-size: 0.8rem;
		color: var(--text);
		background: transparent;
		border: 1px solid var(--line);
		border-radius: 6px;
		cursor: pointer;
	}

	.chip.on {
		color: #000;
		background: var(--accent);
		border-color: var(--accent);
	}

	.tabs {
		display: flex;
		gap: 0.5rem;
		margin: 1.5rem 0;
		border-bottom: 1px solid var(--line);
	}

	.tabs button {
		padding: 0.6rem 1rem;
		font: inherit;
		font-size: 0.9rem;
		color: var(--text-muted);
		background: none;
		border: none;
		border-bottom: 3px solid transparent;
		cursor: pointer;
	}

	.tabs button[aria-current='true'] {
		color: var(--text);
		border-bottom-color: var(--accent);
	}

	.tip {
		margin-bottom: 1rem;
		padding: 1rem;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 8px;
	}

	.tip h3,
	.tip p {
		margin: 0.25rem 0;
	}

	.hook {
		color: var(--accent);
		font-weight: 600;
	}
</style>

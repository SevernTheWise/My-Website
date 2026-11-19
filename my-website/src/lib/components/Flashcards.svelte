<script>
	import { shuffle } from '../helpers.js';

	// The study page hands us the cards: each one has a front, a back, and maybe a note and img
	let { cards } = $props();

	let running = $state(false); // false means we show the Start button
	// @ts-ignore
	let deck = $state([]); // the cards for this round, in random order
	let position = $state(0); // which card we are on (0 is the first)
	let flipped = $state(false); // false shows the front, true shows the back
	let known = $state(0); // how many cards were marked "Knew it"

	// $derived is a value that works itself out again whenever the things it uses change
	const card = $derived(deck[position]);
	const cardsLeft = $derived(deck.length - position);

	function start() {
		deck = shuffle(cards);
		position = 0;
		flipped = false;
		known = 0;
		running = true;
	}

	// Runs when the student rates a card
	// @ts-ignore
	function rate(knewIt) {
		if (knewIt) {
			known += 1;
		} else {
			// Put the card at the end of the deck so it comes round again
			deck.push(card);
		}

		position += 1;
		flipped = false;
	}
</script>

{#if !running}
	<p>{cards.length} cards in the chapters you picked.</p>
	<button class="button" disabled={cards.length === 0} onclick={start}>Start flashcards</button>
{:else if position >= deck.length}
	<p class="done">Deck finished. You knew {known} cards.</p>
	<button class="button" onclick={start}>Go again</button>
{:else}
	<p class="label">{cardsLeft} cards left</p>

	<!-- Clicking the card flips it between the front and the back -->
	<button class="card" onclick={() => (flipped = !flipped)}>
		{#if flipped}
			<span class="answer">{card.back}</span>
			{#if card.note}
				<span class="note">{card.note}</span>
			{/if}
		{:else}
			<span>{card.front}</span>
			{#if card.img}
				<img class="exhibit" src={card.img} alt="Exhibit for this card" />
			{/if}
		{/if}
	</button>

	{#if flipped}
		<div class="row">
			<button class="button secondary" onclick={() => rate(false)}>Missed it</button>
			<button class="button" onclick={() => rate(true)}>Knew it</button>
		</div>
	{:else}
		<p class="hint">Say the answer out loud, then click the card to flip it.</p>
	{/if}
{/if}

<style>
	.card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.75rem;
		width: 100%;
		min-height: 14rem;
		padding: 1.5rem;
		margin-bottom: 1rem;
		text-align: left;
		font: inherit;
		font-size: 1.05rem;
		color: var(--text);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 12px;
		cursor: pointer;
	}

	.card:hover {
		border-color: var(--accent);
	}

	.answer {
		color: var(--accent);
		font-weight: 600;
	}

	.note {
		color: var(--text-muted);
		font-size: 0.85rem;
	}

	.exhibit {
		max-width: 100%;
		max-height: 9rem;
		object-fit: contain;
		align-self: flex-start;
	}

	.hint {
		color: var(--text-muted);
		font-size: 0.85rem;
	}

	.done {
		font-size: 1.4rem;
	}

	.row {
		display: flex;
		gap: 0.75rem;
	}

	.button:disabled {
		opacity: 0.4;
		cursor: default;
	}
</style>

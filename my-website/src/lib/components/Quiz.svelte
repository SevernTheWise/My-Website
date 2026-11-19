<script>

	import { shuffle } from '../helpers.js';

	// The study page hands us the list of questions to use
	let { questions } = $props();
	
	let running = $state(false); // false means we show the Start button
	// @ts-ignore
	let list = $state([]); // the questions for this round, in random order
	let position = $state(0); // which question we are on (0 is the first)
	// @ts-ignore
	let picked = $state([]); // the options clicked so far on this question
	let checked = $state(false); // true once the answer has been checked
	let score = $state(0);
	// @ts-ignore
	let missed = $state([]); // the questions that were answered wrongly
	let finished = $state(false);

	// $derived is a value that works itself out again whenever the things it uses change
	const current = $derived(list[position]);

	// Gets one question ready: shuffles its options and remembers which ones are correct
	// @ts-ignore
	function prepare(question) {
		// @ts-ignore
		const choices = question.options.map((text, index) => {
			return { text: text, isCorrect: question.answer.includes(index) };
		});

		return {
			...question, // copy everything from the question, then add the extra bits below
			choices: shuffle(choices),
			howMany: question.answer.length
		};
	}

	// Starts a round using the questions we are given
	// @ts-ignore
	function start(source) {
		list = shuffle(source).map(prepare);
		position = 0;
		picked = [];
		checked = false;
		score = 0;
		missed = [];
		finished = false;
		running = true;
	}

	// Runs when an option is clicked
	// @ts-ignore
	function choose(index) {
		if (checked) return; // the answer is already checked, so ignore clicks

		// One correct answer: check straight away
		if (current.howMany === 1) {
			picked = [index];
			check();
			return;
		}

		// Several correct answers: add or remove the option, then wait for "Check answer"
		if (picked.includes(index)) {
			picked = picked.filter((n) => n !== index);
		} else {
			picked = [...picked, index];
		}
	}

	// Works out whether the picked options are exactly the correct ones
	function check() {
		checked = true;

		let allRight = true;
		for (let i = 0; i < current.choices.length; i++) {
			const wasPicked = picked.includes(i);
			if (wasPicked !== current.choices[i].isCorrect) {
				allRight = false;
			}
		}

		if (allRight) {
			score += 1;
		} else {
			missed.push(current);
		}
	}

	function next() {
		if (position + 1 >= list.length) {
			finished = true;
		} else {
			position += 1;
			picked = [];
			checked = false;
		}
	}
</script>

{#if !running}
	<p>{questions.length} questions in the chapters you picked.</p>
	<button class="button" disabled={questions.length === 0} onclick={() => start(questions)}>
		Start quiz
	</button>
{:else if finished}
	<p class="score">{score} / {list.length}</p>
	<div class="row">
		{#if missed.length > 0}
			<button class="button" onclick={() => start(missed)}>Retry {missed.length} missed</button>
		{/if}
		<button class="button secondary" onclick={() => start(questions)}>New quiz</button>
	</div>
{:else}
	<p class="label">Question {position + 1} of {list.length}</p>
	<h2>{current.q}</h2>

	{#if current.img}
		<img class="exhibit" src={current.img} alt="Exhibit for this question" />
	{/if}

	{#if current.howMany > 1}
		<p class="hint">Choose {current.howMany}, then press Check answer.</p>
	{/if}

	<div class="choices">
		{#each current.choices as choice, i}
			<!-- class:name={true or false} adds that CSS class only when the condition is true -->
			<button
				class="choice"
				class:selected={!checked && picked.includes(i)}
				class:right={checked && choice.isCorrect}
				class:wrong={checked && picked.includes(i) && !choice.isCorrect}
				disabled={checked}
				onclick={() => choose(i)}
			>
				{choice.text}
			</button>
		{/each}
	</div>

	{#if current.howMany > 1 && !checked}
		<button class="button" disabled={picked.length === 0} onclick={check}>Check answer</button>
	{/if}

	{#if checked}
		{#if current.why}
			<p class="why">{current.why}</p>
		{/if}
		<button class="button" onclick={next}>
			{position + 1 === list.length ? 'See score' : 'Next question'}
		</button>
	{/if}
{/if}

<style>
	h2 {
		font-size: 1.2rem;
		line-height: 1.4;
	}

	.hint {
		color: var(--text-muted);
		font-size: 0.85rem;
	}

	.choices {
		display: grid;
		gap: 0.6rem;
		margin-bottom: 1.25rem;
	}

	.choice {
		text-align: left;
		padding: 0.75rem 1rem;
		font: inherit;
		font-size: 0.9rem;
		color: var(--text);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 8px;
		cursor: pointer;
	}

	.choice:hover:not(:disabled) {
		border-color: var(--accent);
	}

	.choice:disabled {
		cursor: default;
	}

	.selected {
		border-color: var(--accent);
		background: var(--accent-glow);
	}

	.right {
		border-color: #5fd38d;
		background: rgba(95, 211, 141, 0.2);
	}

	.wrong {
		border-color: var(--error);
		background: rgba(255, 107, 122, 0.2);
	}

	.why {
		margin: 0 0 1.25rem;
		padding-left: 1rem;
		border-left: 3px solid var(--accent);
		font-size: 0.9rem;
	}

	.exhibit {
		display: block;
		max-width: 100%;
		max-height: 16rem;
		margin-bottom: 1rem;
	}

	.score {
		font-size: 3rem;
		margin: 0 0 1rem;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.button:disabled {
		opacity: 0.4;
		cursor: default;
	}
</style>

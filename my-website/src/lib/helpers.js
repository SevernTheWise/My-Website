// Puts a list in a random order. It returns a new list and leaves the original alone.
/** @template T @param {T[]} list @returns {T[]} */
export function shuffle(list) {
	const copy = [...list]; // [...list] makes a copy

	// Walk backwards through the list, swapping each item with a random one before it
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = copy[i];
		copy[i] = copy[j];
		copy[j] = temp;
	}

	return copy;
}

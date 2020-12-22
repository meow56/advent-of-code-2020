"use strict";

function day22(text) {
	let regex = /Player (1|2):((?:\n[0-9]+)+)/gm;
	let entry = regex.exec(text);
	let yourDeck = entry[2].split("\n");
	entry = regex.exec(text);
	let crabDeck = entry[2].split("\n");

	yourDeck = yourDeck.map((el) => +el);
	crabDeck = crabDeck.map((el) => +el);

	yourDeck = yourDeck.slice(1);
	crabDeck = crabDeck.slice(1);

	let yourStoredDeck = yourDeck.slice();
	let crabStoredDeck = crabDeck.slice();

	while(yourDeck.length !== 0 && crabDeck.length !== 0) {
		if(yourDeck[0] > crabDeck[0]) {
			console.log(`You win with your card of ${yourDeck[0]} over the crab's card of ${crabDeck[0]}.`);
			yourDeck.push(yourDeck[0]);
			yourDeck.push(crabDeck[0]);
			yourDeck = yourDeck.slice(1);
			crabDeck = crabDeck.slice(1);
		} else {
			console.log(`The crab wins with their card of ${crabDeck[0]} over your card of ${yourDeck[0]}.`);
			crabDeck.push(crabDeck[0]);
			crabDeck.push(yourDeck[0]);
			yourDeck = yourDeck.slice(1);
			crabDeck = crabDeck.slice(1);
		}
	}

	function calculateScore(deck) {
		return deck.reduce((acc, card, index, arr) => acc += card * (arr.length - index), 0);
	}

	let score = 0;
	if(yourDeck.length === 0) {
		score = calculateScore(crabDeck);
	} else {
		score = calculateScore(yourDeck);
	}
	console.log(score); // part 1

	function findID(deck) {
		// Determines a unique ID for each deck.
		// Converts the deck into base 51.
		const BASE = 51n; // since the max length is 50.
		return deck.reduce(function(acc, value, index) {
			acc += BigInt(value) * (BASE ** (BASE - 1n - BigInt(index + 1)));
			return acc;
		}, 0n);
	}

	console.time(`findID`);
	console.log(findID(yourStoredDeck.slice()));
	console.timeEnd(`findID`);

	function recursiveCombat(yourDeck, crabDeck, history = []) {
		// Plays a round of recursive combat.
		// Returns true if yourDeck wins.
		let overloadTimer = 0;
		const OVERLOAD = 100000; // the number of trials before we throw
		console.groupCollapsed(`New game: you with deck length ${yourDeck.length} and the crab with deck length ${crabDeck.length}.`);
		while(yourDeck.length !== 0 && crabDeck.length !== 0) {
			if(overloadTimer > OVERLOAD) {
				throw `Infinity prevention kicked in.`;
			}
			overloadTimer++;
			let yourID = findID(yourDeck);
			let crabID = findID(crabDeck);
			if(history.some(function(entry) {
				return yourID === entry[0] && crabID === entry[1];
			})) {
				console.log(`Game over, by repetition.`);
				console.groupEnd();
				return [true, calculateScore(yourDeck)]; // Check if we've seen this state before and return if so.
			}
			history.push([yourID, crabID]);
			if(yourDeck[0] <= yourDeck.length - 1 && crabDeck[0] <= crabDeck.length - 1) {
				// recursion time
				let recurseResult = recursiveCombat(yourDeck.slice(1, yourDeck[0] + 1), crabDeck.slice(1, crabDeck[0] + 1));
				if(recurseResult[0]) {
					// you win!
					yourDeck.push(yourDeck[0]);
					yourDeck.push(crabDeck[0]);
					yourDeck = yourDeck.slice(1);
					crabDeck = crabDeck.slice(1);
				} else {
					// crab win :(
					crabDeck.push(crabDeck[0]);
					crabDeck.push(yourDeck[0]);
					yourDeck = yourDeck.slice(1);
					crabDeck = crabDeck.slice(1);
				}
			} else {
				if(yourDeck[0] > crabDeck[0]) {
					yourDeck.push(yourDeck[0]);
					yourDeck.push(crabDeck[0]);
					yourDeck = yourDeck.slice(1);
					crabDeck = crabDeck.slice(1);
				} else {
					crabDeck.push(crabDeck[0]);
					crabDeck.push(yourDeck[0]);
					yourDeck = yourDeck.slice(1);
					crabDeck = crabDeck.slice(1);
				}
			}
		}
		if(yourDeck.length === 0) {
			console.log(`You lost the game. Unfortunate.`);
			console.groupEnd();
			return [false, calculateScore(crabDeck)];
		} else {
			console.log(`You won the game. Cool!`);
			console.groupEnd();
			return [true, calculateScore(yourDeck)];
		}
	}

	let finalResult = recursiveCombat(yourStoredDeck.slice(), crabStoredDeck.slice());
	if(finalResult[0]) {
		console.log(`You won!`);
	} else {
		console.log(`You did not win...`);
	}
	console.log(finalResult[1]); // part 2
}
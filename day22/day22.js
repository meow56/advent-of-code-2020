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

	let score = 0;
	if(yourDeck.length === 0) {
		for(let i = 0; i < crabDeck.length; i++) {
			score += crabDeck[i] * (crabDeck.length - i);
		}
	} else {
		for(let i = 0; i < yourDeck.length; i++) {
			score += yourDeck[i] * (yourDeck.length - i);
		}
	}
	console.log(score);
}
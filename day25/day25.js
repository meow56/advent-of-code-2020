"use strict";

function day25(text) {
	let regex = /[0-9]+/gm;
	let entry = regex.exec(text);
	let keys = [];
	while(entry) { // loop over the text with that regex
		keys.push(+entry[0]);
		entry = regex.exec(text);
	}
	
	const MODULO = 20201227;
	let cardNum = 0;
	let cardValue = 1;
	let cardSubject = 7;
	console.time(`card loop`);
	while(cardValue !== keys[0]) {
		cardValue *= cardSubject;
		cardValue %= MODULO;
		cardNum++;
	}
	console.timeEnd(`card loop`);
	let doorNum = 0;
	let doorValue = 1;
	let doorSubject = 7;
	console.time(`door loop`);
	while(doorValue !== keys[1]) {
		doorValue *= doorSubject;
		doorValue %= MODULO;
		doorNum++;
	}
	console.timeEnd(`door loop`);
	console.log(cardNum);
	console.log(doorNum);

	let publicCardKey = keys[0];
	let publicDoorKey = keys[1];
	cardValue = 1;
	doorValue = 1;
	for(let i = 0; i < cardNum; i++) {
		cardValue *= publicDoorKey;
		cardValue %= MODULO;
	}
	for(let i = 0; i < doorNum; i++) {
		doorValue *= publicCardKey;
		doorValue %= MODULO;
	}
	if(cardValue !== doorValue) {
		throw `Result should be the same, but it isn't. Card: ${cardValue}, Door: ${doorValue}.`;
	} else {
		console.log(`Encryption key: ${cardValue}`); // part 1
	}




	console.log(`Merry Christmas!`); // part 2
}
"use strict";

function day12(text) {
	let regex = /([NEWSRLF])([0-9]+)/gm;
	let entry = regex.exec(text);
	let directions = [];
	while(entry) { // loop over the text with that regex
		directions.push([entry[1], Number(entry[2])]);
		entry = regex.exec(text);
	}

	let facingDir = 1;
	let NS = 0; // North +, South -
	let EW = 0; // East +, West -
	const compass = [
		"N", "E", "S", "W"
	];

	directions.forEach(function(direction) {
		let trueDir = direction[0] === "F" ? compass[facingDir] : direction[0];
		switch(trueDir) {
			case "N":
				NS += direction[1];
				break;
			case "E":
				EW += direction[1];
				break;
			case "S":
				NS -= direction[1];
				break;
			case "W":
				EW -= direction[1];
				break;
			case "L":
				facingDir = (((facingDir - (direction[1] / 90)) % 4) + 4) % 4;
				break;
			case "R":
				facingDir = (((facingDir + (direction[1] / 90)) % 4) + 4) % 4;
				break;
		}
	});

	console.log(Math.abs(NS) + Math.abs(EW));
}
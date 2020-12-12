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

	console.log(Math.abs(NS) + Math.abs(EW)); // part 1


	let trueNS = 0;
	let trueEW = 0;
	let wayNS = 1;
	let wayEW = 10;
	let wayFace = [0, 1];
	const wayCompass = [
		1, 1, -1, -1
	];

	directions.forEach(function(direction) {
		let trueDir = direction[0];
		let workWayNS = wayNS;
		let workWayEW = wayEW;
		wayFace = [(wayNS > 0 ? 0 : 2), (wayEW > 0 ? 1 : 3)];
		let turning = direction[1] / 90;
		let newWayFace;
		switch(trueDir) {
			case "N":
				wayNS += direction[1];
				break;
			case "E":
				wayEW += direction[1];
				break;
			case "S":
				wayNS -= direction[1];
				break;
			case "W":
				wayEW -= direction[1];
				break;
			case "L":
				for(let i = 0; i < turning; i++) {
					workWayNS = wayCompass[wayFace[1]] * wayCompass[(((wayFace[1] - 1) % 4) + 4) % 4] * wayEW;
					workWayEW = wayCompass[wayFace[0]] * wayCompass[(((wayFace[0] - 1) % 4) + 4) % 4] * wayNS;
					wayNS = workWayNS;
					wayEW = workWayEW;
				}
				break;
			case "R":
				for(let i = 0; i < turning; i++) {
					workWayNS = wayCompass[wayFace[1]] * wayCompass[(((wayFace[1] + 1) % 4) + 4) % 4] * wayEW;
					workWayEW = wayCompass[wayFace[0]] * wayCompass[(((wayFace[0] + 1) % 4) + 4) % 4] * wayNS;
					wayNS = workWayNS;
					wayEW = workWayEW;
				}
				break;
			case "F":
				trueNS += wayNS * direction[1];
				trueEW += wayEW * direction[1];
				break;
		}
	});

	console.log(Math.abs(trueNS) + Math.abs(trueEW)); // part 2
}
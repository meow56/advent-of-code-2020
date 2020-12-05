"use strict";

function day5(text) {
	let regex = /([BF]{7})([LR]{3})/gm;
	let entry = regex.exec(text);
	let passes = [];
	while(entry) { // loop over the text with that regex
		passes.push([entry[0], entry[1], entry[2]]);
		entry = regex.exec(text);
	}

	function binaryTo10(number, zero = "0", one = "1") {
		// number: string with the binary representation of the number
		// zero: character that represents 0
		// one: character that represents 1
		let sum = 0;
		for(let i = 0; i < number.length; i++) {
			let power = 2 ** (number.length - 1 - i);
			if(number[i] === one) {
				sum += power;
			} else if(number[i] !== zero) {
				throw "Character in string is not zero or one";
			}
		}
		return sum;
	}

	let highestSeatID = 0;
	let seatIDs = [];
	passes.forEach(function(pass) {
		let row = binaryTo10(pass[1], "F", "B");
		let column = binaryTo10(pass[2], "L", "R");
		seatIDs.push((row * 8) + column);
		if((row * 8) + column > highestSeatID) {
			highestSeatID = (row * 8) + column;
		} 
	});
	console.log(highestSeatID); // part 1

	seatIDs.sort(function(a, b) {
		return a - b;
	});
	let firstID = seatIDs[0];
	for(let i = 0; i < seatIDs.length; i++) {
		if(i + firstID !== seatIDs[i]) {
			console.log(i + firstID); // part 2
			break;
		}
	}
}
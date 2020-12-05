"use strict";

function day5(text) {
	let regex = /([BFLR]{7})([BFLR]{3})/gm;
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
	passes.forEach(function(pass) {
		let row = binaryTo10(pass[1], "F", "B");
		let column = binaryTo10(pass[2], "L", "R");
		if((row * 8) + column > highestSeatID) {
			highestSeatID = (row * 8) + column;
		} 
	});
	console.log(highestSeatID);
}
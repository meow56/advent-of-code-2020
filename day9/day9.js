"use strict";

function day9(text) {
	let regex = /[0-9]+/gm;
	let entry = regex.exec(text);
	let numbers = [];
	while(entry) { // loop over the text with that regex
		numbers.push(entry[0]);
		entry = regex.exec(text);
	}

	for(let i = 25; i < numbers.length; i++) {
		let priorNumbers = numbers.slice(i - 25, i);
		if(findSum(priorNumbers, numbers[i]) === "oh") {
			console.log(numbers[i]); // part 1
		}
	}

	function findSum(numbers, sum) {
		for(let i = 0; i < numbers.length; i++) {
			for(let j = i; j < numbers.length; j++) {
				if(Number(numbers[i]) + Number(numbers[j]) === Number(sum)) {
					return [i, j];
				}
			}
		}
		return "oh";
	}
}
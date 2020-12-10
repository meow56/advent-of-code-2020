"use strict";

function day9(text) {
	let regex = /[0-9]+/gm;
	let entry = regex.exec(text);
	let numbers = [];
	while(entry) { // loop over the text with that regex
		numbers.push(entry[0]);
		entry = regex.exec(text);
	}

	const weakNumber = 26134589;
	for(let i = 25; i < numbers.length; i++) {
		let priorNumbers = numbers.slice(i - 25, i);
		if(findSum(priorNumbers, numbers[i]) === "oh") {
			console.log(numbers[i]); // part 1
		}
	}
	console.log(weakSum()); // part 2

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

	function weakSum() {
		let lowerBound = 0;
		let upperBound = 1;
		while(true) {
			if(upperBound > numbers.length) {
				throw "Upper Bound exceeds array length";
			}
			let sum = 0;
			for(let i = lowerBound; i < upperBound; i++) {
				sum += Number(numbers[i]);
			}
			if(sum === weakNumber) {
				let lowest = 1000000000000000;
				let highest = 0;
				for(let i = lowerBound; i < upperBound; i++) {
					if(Number(numbers[i]) < lowest) {
						lowest = Number(numbers[i]);
					}
					if(Number(numbers[i]) > highest) {
						highest = Number(numbers[i]);
					}
				}
				return lowest + highest;
			} else if(sum > weakNumber) {
				lowerBound++;
			} else {
				upperBound++;
			}
		}
	}
}
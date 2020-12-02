"use strict";

const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
	const input = this.files[0];
	input.text().then(text => doStuff(text));

	function doStuff(text) {
		let regex = /\b\d+\b/g; // "find all sequences of the form line-break (number) line-break"
		let entry = regex.exec(text);
		let numbers = [];
		while(entry) { // loop over the text with that regex
			numbers.push(entry);
			entry = regex.exec(text);
		}
		for(let i = 0; i < numbers.length; i++) {
			for(let j = i + 1; j < numbers.length; j++) {
				if(Number(numbers[i][0]) + Number(numbers[j][0])=== 2020) {
					console.log(Number(numbers[i][0]) * Number(numbers[j][0])); // part 1
				}
				for(let k = j + 1; k < numbers.length; k++) {
					if(Number(numbers[i][0]) + Number(numbers[j][0]) + Number(numbers[k][0]) === 2020) {
						console.log(Number(numbers[i][0]) * Number(numbers[j][0]) * Number(numbers[k][0])); // part 2
					}
				}
			}
		}
	}
}


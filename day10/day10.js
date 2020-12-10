"use strict";

function day10(text) {
	let regex = /[0-9]+/gm;
	let entry = regex.exec(text);
	let jolts = [];
	while(entry) { // loop over the text with that regex
		jolts.push(Number(entry[0]));
		entry = regex.exec(text);
	}

	jolts.sort(function(a, b) {
		return a - b;
	});
	jolts.push(jolts[jolts.length - 1] + 3);
	let diffOne = 1;
	let diffThree = 0;
	for(let i = 1; i < jolts.length; i++) {
		if(jolts[i] - jolts[i - 1] === 1) {
			diffOne++;
		}
		if(jolts[i] - jolts[i - 1] === 3) {
			diffThree++;
		}
	}
	console.log(diffOne * diffThree); // part 1
}
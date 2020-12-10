"use strict";

function day10(text) {
	let regex = /[0-9]+/gm;
	let entry = regex.exec(text);
	let jolts = [0];
	while(entry) { // loop over the text with that regex
		jolts.push(Number(entry[0]));
		entry = regex.exec(text);
	}

	jolts.sort(function(a, b) {
		return a - b;
	});
	jolts.push(jolts[jolts.length - 1] + 3);
	let diffOne = 0;
	let diffThree = 0;
	let offByThree = [];
	for(let i = 1; i < jolts.length; i++) {
		if(jolts[i] - jolts[i - 1] === 1) {
			diffOne++;
		}
		if(jolts[i] - jolts[i - 1] === 3) {
			diffThree++;
			offByThree.push(i);
		}
	}
	console.log(diffOne * diffThree); // part 1

	/*
		Part 2: the gameplan

		Split up the entire adapter list into smaller sections,
		splitting whenever there is a 3 gap.
		Since there is only one choice at a 3-gap, they
		can act as "checkpoints" for our calculations.
		Then we can tackle the smaller sections through brute force.
	*/
	let sections = [];
	offByThree.forEach(function(index, arrIndex) {
		if(arrIndex === 0) {
			sections.push(jolts.slice(0, index));
		} else {
			sections.push(jolts.slice(offByThree[arrIndex - 1], index + 1));
		}
	});

	let combinations = [];

	function findCombos(list, i) {
		let choices = [];
		if(i + 3 < list.length) {
			if(list[i] + 1 === list[i + 1] || list[i] + 2 === list[i + 1]) {
				choices.push(list[i + 1]);
				if(list[i] + 2 === list[i + 2] || list[i] + 3 === list[i + 2]) {
					choices.push(list[i + 2]);
					if(list[i] + 3 === list[i + 3]) {
						choices.push(list[i + 3]);
					}
				}
			}
		} else if(i + 2 < list.length) {
			if(list[i] + 1 === list[i + 1] || list[i] + 2 === list[i + 1]) {
				choices.push(list[i + 1]);
				if(list[i] + 2 === list[i + 2] || list[i] + 3 === list[i + 2]) {
					choices.push(list[i + 2]);
				}
			}
		} else if(i + 1 < list.length) {
			choices.push(list[i + 1]);
		}
		if(choices.length === 0) {
			return 1;
		} else if(choices.length === 1) {
			return findCombos(list, i + 1);
		} else if(choices.length === 2) {
			return findCombos(list, i + 1) + findCombos(list, i + 2);
		} else {
			return findCombos(list, i + 1) + findCombos(list, i + 2) + findCombos(list, i + 3);
		}
	}

	sections.forEach((section, index) => combinations[index] = findCombos(section, 0));
	let product = 1;
	combinations.forEach(comb => product *= comb);
	console.log(product); // part 2
}
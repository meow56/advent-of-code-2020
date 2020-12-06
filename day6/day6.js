"use strict";

function day6(text) {
	let regex = /\n\n/gm;
	let groups = text.split(regex);

	const alphabet = [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z"
	];
	let totalAnswers = 0;
	groups.forEach(function(group) {
		let totalYes = 0;
		for(let i = 0; i < alphabet.length; i++) {
			if(group.search(alphabet[i]) !== -1) {
				totalYes++;
			}
		}
		totalAnswers += totalYes;
	});
	console.log(totalAnswers);
}
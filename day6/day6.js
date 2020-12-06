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
	let allAnswers = 0;
	groups.forEach(function(group) {
		console.log("Investigating group \"" + group + "\"");
		let totalYes = 0;
		for(let i = 0; i < alphabet.length; i++) {
			if(group.search(alphabet[i]) !== -1) {
				totalYes++;
			}
		}
		totalAnswers += totalYes;

		let people = group.split(/\n/gm);
		let allYes = 0;
		let yes = [
			true,
			true,
			true,
			true, // 4
			true,
			true,
			true,
			true, // 8
			true,
			true,
			true,
			true, // 12
			true,
			true,
			true,
			true, // 16
			true,
			true,
			true,
			true, // 20
			true,
			true,
			true,
			true, // 24
			true,
			true
		];
		people.forEach(function(person) {
			if(!(person === "")) {
				console.log("Investigating person \"" + person + "\"");
				for(let i = 0; i < alphabet.length; i++) {
					if(!yes[i]) {
						continue;
					}
					if(person.search(alphabet[i]) === -1) {
						yes[i] = false;
					}
				}
			}
		});
		yes.forEach(function(ans) {
			if(ans) {
				allYes++;
			}
		});
		allAnswers += allYes;
	});
	console.log(totalAnswers); // part 1
	console.log(allAnswers); // part 2
}
"use strict";

function day2(text) {
	let regex = /\b.+\b/gm;
	let entry = regex.exec(text);
	let passwords = [];
	while(entry) { // loop over the text with that regex
		passwords.push(entry);
		entry = regex.exec(text);
	}
	let reqPassPair = [];
	passwords.forEach(password => reqPassPair.push(password[0].split(": ")));

	let validPasswords = 0;
	reqPassPair.forEach(function(reqPass) {
		let reqSplit = reqPass[0].split(" ");
		let charReq = reqSplit[1];
		let numSplit = reqSplit[0].split("-");
		let minNum = Number(numSplit[0]);
		let maxNum = Number(numSplit[1]);

		let reqex = RegExp(charReq, "g"); // haha, get it
		const matches = reqPass[1].matchAll(reqex);
		let total = 0;
		for(const match of matches) {
			total++;
		}
		if(!(total > maxNum || total < minNum)) {
			validPasswords++;
		}
	});

	console.log(validPasswords); // part 1
}
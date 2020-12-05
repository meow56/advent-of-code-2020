"use strict";

function day4(text) {
	let regex = /\n\n/gm;
	let passports = text.split(regex);

	let fieldRegexs = [
		/byr:/gm,
		/iyr:/gm,
		/eyr:/gm,
		/hgt:/gm,
		/hcl:/gm,
		/ecl:/gm,
		/pid:/gm,
		/cid:/gm
	];
	let validPassports = 0;
	passports.forEach(function(passport) {
		let isValid = true;
		for(let i = 0; i < fieldRegexs.length - 1; i++) { // - 1 to ignore cid
			if(passport.search(fieldRegexs[i]) === -1) {
				isValid = false;
			}
		}
		if(isValid) {
			validPassports++;
		}
	});
	console.log(validPassports);
}
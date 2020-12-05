"use strict";

function day4(text) {
	let regex = /\n\n/gm;
	let passports = text.split(regex);

	let fieldRegexs = [
		/byr:([0-9]{4})/m,
		/iyr:([0-9]{4})/m,
		/eyr:([0-9]{4})/m,
		/hgt:([0-9]+)(cm|in)/m,
		/hcl:#([a-f0-9]{6})/m,
		/ecl:(amb|blu|brn|gry|grn|hzl|oth)/m,
		/pid:[0-9]{9}\b/m,
		/cid:/m
	];
	let validPassports1 = 0;
	let validPassports2 = 0;
	passports.forEach(function(passport, index) {
		let isValid1 = true;
		let isValid2 = true;
		for(let i = 0; i < fieldRegexs.length - 1; i++) { // - 1 to ignore cid
			let currentField = passport.match(fieldRegexs[i]);
			if(currentField === null) {
				isValid1 = false;
			} else {
				switch(i) {
					case 0:
						if(Number(currentField[1]) < 1920 || Number(currentField[1]) > 2002) {
							isValid2 = false;
							console.log("Passport " + (index + 1) + " failed birth year check");
							console.log("with a year of " + currentField[1]);
						}
						break;
					case 1:
						if(Number(currentField[1]) < 2010 || Number(currentField[1]) > 2020) {
							isValid2 = false;
							console.log("Passport " + (index + 1) + " failed issuance year check");
							console.log("with a year of " + currentField[1]);
						}
						break;
					case 2:
						if(Number(currentField[1]) < 2020 || Number(currentField[1]) > 2030) {
							isValid2 = false;
							console.log("Passport " + (index + 1) + " failed expiration year check");
							console.log("with a year of " + currentField[1]);
						}
						break;
					case 3:
						if(currentField[2] === "cm") {
							if(Number(currentField[1]) < 150 || Number(currentField[1]) > 193) {
								isValid2 = false;
								console.log("Passport " + (index + 1) + " failed height check");
							}
						} else if(currentField[2] === "in") {
							if(Number(currentField[1]) < 59 || Number(currentField[1]) > 76) {
								isValid2 = false;
								console.log("Passport " + (index + 1) + " failed height check");
							}
						} else {
							isValid2 = false;
							console.log("Passport " + (index + 1) + " failed height check");
						}
						break;
					case 4:
						break; // nothing needs to be done
					case 5:
						break; // nothing needs to be done
					case 6:
						break; // nothing needs to be done
				}
			}
		}
		if(isValid1) { // first check passed
			validPassports1++; // this is now wrong since the regexes are more stringent
			if(isValid2) {
				validPassports2++; // second check passed
			}
		}
	});
	console.log(validPassports1); // part 1
	console.log(validPassports2); // part 2
}
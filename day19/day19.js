"use strict";

function day19(text) {
	let regex = /([0-9]+): ([0-9]+) ?([0-9]+)? ?\|? ?([0-9]+)? ?([0-9]+)?|([0-9]+): "([a-z])"/gm;
	let entry = regex.exec(text);
	let rules = [];
	while(entry) { // loop over the text with that regex
		let trueEntry;
		if(entry[1]) {
			if(entry[5]) {
				trueEntry = [entry[1], [entry[2], entry[3]], [entry[4], entry[5]]];
			} else if(entry[4]) {
				if(entry[3]) {
					trueEntry = [entry[1], [entry[2], entry[3]], [entry[4]]];
				} else {
					trueEntry = [entry[1], [entry[2]], [entry[4]]];
				}
			} else if(entry[3]) {
				trueEntry = [entry[1], [entry[2], entry[3]]];
			} else {
				trueEntry = [entry[1], [entry[2]]];
			}
		} else {
			trueEntry = [entry[6], entry[7]]
		}
		rules.push(trueEntry);
		entry = regex.exec(text);
	}

	let messageRegex = /[ab]{2,}/gm;
	let messEntry = messageRegex.exec(text);
	let messages = [];
	while(messEntry) {
		messages.push(messEntry[0]);
		messEntry = messageRegex.exec(text);
	}


	console.log(rules);

	rules.sort((a, b) => +a[0] - +b[0]);

	function evaluateRegex(regex) {
		let validMessages = [];
		if(regex.length === 3) {
			if(regex[1].length === 2) {
				let part1 = evaluateRegex(rules[regex[1][0]]);
				let part2 = evaluateRegex(rules[regex[1][1]]);
				for(let i = 0; i < part1.length; i++) {
					for(let j = 0; j < part2.length; j++) {
						validMessages.push(part1[i] + part2[j]);
					}
				}
			} else {
				validMessages = evaluateRegex(rules[regex[1][0]]);
			}
			if(regex[2].length === 2) {
				let part3 = evaluateRegex(rules[regex[2][0]]);
				let part4 = evaluateRegex(rules[regex[2][1]]);
				for(let i = 0; i < part3.length; i++) {
					for(let j = 0; j < part4.length; j++) {
						validMessages.push(part3[i] + part4[j]);
					}
				}
			} else {
				validMessages = [...validMessages, ...evaluateRegex(rules[regex[2][0]])];
			}
		} else {
			if(regex[1] === "a" || regex[1] === "b") {
				return [regex[1]];
			}
			if(regex[1].length === 2) {
				let part1 = evaluateRegex(rules[regex[1][0]]);
				let part2 = evaluateRegex(rules[regex[1][1]]);
				for(let i = 0; i < part1.length; i++) {
					for(let j = 0; j < part2.length; j++) {
						validMessages.push(part1[i] + part2[j]);
					}
				}
			} else {
				validMessages = evaluateRegex(rules[regex[1][0]]);
			}
		}
		return validMessages;
	}

	let valid = evaluateRegex(rules[0]);

	let count = 0;
	console.log(messages.reduce(function(acc, value) {
		if(valid.includes(value)) {
			acc++;
		}
		return acc;
	}, 0));
}
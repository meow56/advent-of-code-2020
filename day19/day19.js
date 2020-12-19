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

	rules.sort((a, b) => +a[0] - +b[0]);

	function evalRuleBetter(rule) {
		// This time, let's actually make a regex.
		let finalRegex = "";
		if(rule.length === 3) {
			if(rule[1].length === 2) {
				let part1 = evalRuleBetter(rules[rule[1][0]]);
				let part2 = evalRuleBetter(rules[rule[1][1]]);
				finalRegex = part1 + part2;
			} else {
				finalRegex = evalRuleBetter(rules[rule[1][0]]);
			}
			if(rule[2].length === 2) {
				let part3 = evalRuleBetter(rules[rule[2][0]]);
				let part4 = evalRuleBetter(rules[rule[2][1]]);
				finalRegex = "(?:" + finalRegex + "|" + part3 + part4 + ")";
			} else {
				finalRegex = "(?:" + finalRegex + "|" + evalRuleBetter(rules[rule[2][0]]) + ")";
			}
		} else {
			if(rule[1] === "a" || rule[1] === "b") {
				return rule[1];
			}
			if(rule[1].length === 2) {
				let part1 = evalRuleBetter(rules[rule[1][0]]);
				let part2 = evalRuleBetter(rules[rule[1][1]]);
				finalRegex = part1 + part2;
			} else {
				finalRegex = evalRuleBetter(rules[rule[1][0]]);
			}
		}
		return finalRegex;
	}

	let validRegex = RegExp("^" + evalRuleBetter(rules[0]) + "$");
	console.log(validRegex);

	let validRegexMessages = [];
	console.log(messages.reduce(function(acc, value) {
		if(validRegex.test(value)) {
			acc++;
			validRegexMessages.push(value);
		}
		return acc;
	}, 0)); // part 1


	let rule42 = RegExp(evalRuleBetter(rules[42]), "g");
	let rule31 = RegExp(evalRuleBetter(rules[31]), "g");
	console.log(rule42);
	console.log(rule31);

	console.log(messages.reduce(function(acc, value) {
		let workingMessage = value.slice();
		let rule42Count = [];
		let rule31Count = [];
		let lastIndex42 = 0;
		let found = workingMessage.matchAll(rule42);
		for(const match of found) {
			if(match.index === lastIndex42) {
				rule42Count.push(match[0]);
				lastIndex42 = match.index + match[0].length;
			}
		}
		rule31.lastIndex = lastIndex42;
		found = workingMessage.matchAll(rule31);
		let lastIndex31 = lastIndex42;
		for(const match of found) {
			if(match.index === lastIndex31) {
				rule31Count.push(match);
				lastIndex31 = match.index + match[0].length;
			}
		}
		if(rule42Count.join("").length + rule31Count.join("").length === workingMessage.length) {
			if(rule42Count.length > rule31Count.length && rule31Count.length !== 0) {
				acc++;
			}
		}

		rule42.lastIndex = 0;
		rule31.lastIndex = 0;
		return acc;
	}, 0)); // part 2

}
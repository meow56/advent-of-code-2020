"use strict";

function day16(text) {
	let entry = text.split(/\n\n/gm);
	let ruleRegex = /([a-z ]+): ([0-9]+)-([0-9]+) or ([0-9]+)-([0-9]+)/gm;
	let ruleEntry = ruleRegex.exec(entry[0]);
	let rules = [];
	let yourTicket = entry[1];
	let tickets = entry[2].split(/\n/gm);
	tickets.forEach((ticket, index) => tickets[index] = ticket.split(","));
	while(ruleEntry) { // loop over the text with that regex
		rules.push([ruleEntry[1], [+ruleEntry[2], +ruleEntry[3]], [+ruleEntry[4], +ruleEntry[5]]]);
		ruleEntry = ruleRegex.exec(entry[0]);
	}

	let isValid = Array(1000);
	rules.forEach(function(rule) {
		for(let i = rule[1][0]; i <= rule[1][1]; i++) {
			isValid[i] = true;
		}
		for(let i = rule[2][0]; i <= rule[2][1]; i++) {
			isValid[i] = true;
		}
	});

	let scanErrRate = 0;
	tickets.forEach(function(ticket) {
		if(!isNaN(+ticket[0])) {
			ticket.forEach(function(field) {
				if(!isValid[field]) {
					scanErrRate += +field;
				}
			});
		}
	});

	console.log(scanErrRate);
}
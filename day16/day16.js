"use strict";

function day16(text) {
	let entry = text.split(/\n\n/gm);
	let ruleRegex = /([a-z ]+): ([0-9]+)-([0-9]+) or ([0-9]+)-([0-9]+)/gm;
	let ruleEntry = ruleRegex.exec(entry[0]);
	let rules = [];
	let yourTicket = entry[1].split(/\n|,/gm);
	yourTicket = yourTicket.slice(1);
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
	let validTickets = [];
	tickets.forEach(function(ticket) {
		if(!isNaN(+ticket[0])) {
			let ticketValid = true;
			ticket.forEach(function(field) {
				if(!isValid[field]) {
					ticketValid = false;
					scanErrRate += +field;
				}
			});
			if(ticketValid) {
				validTickets.push(ticket);
			}
		}
	});

	console.log(scanErrRate); // part 1

	let possibleRules = []; // the possible rules that could match each field
							// 0 represents the first field, 1 the second, etc.
	for(let i = 0; i < rules.length; i++) {
		possibleRules[i] = rules.slice();
	}
	let going = true;
	let iterations = 0;

	while(going) {
		validTickets.forEach(function(ticket) {
			ticket.forEach(function(field, fieldIndex) {
				rules.forEach(function(rule, ruleIndex) {
					let inLowerRange = (+field >= rule[1][0] && +field <= rule[1][1]);
					let inUpperRange = (+field >= rule[2][0] && +field <= rule[2][1]);
					if(!(inLowerRange || inUpperRange)) {
						possibleRules[fieldIndex][ruleIndex] = false;
					}
				});
			});
		});

		let wereDone = true;
		possibleRules.forEach(function(possible, possibleIndex) {
			let possCount = 0;
			let trueIndex = 0;
			possible.forEach(function(rule, ruleIndex) {
				if(rule) {
					trueIndex = ruleIndex;
					possCount++;
				}
			});
			if(possCount === 1) {
				// then there is only one possible rule that fits this field
				for(let i = 0; i < possibleRules.length; i++) {
					if(possibleIndex !== i) {
						possibleRules[i][trueIndex] = false;
					}
				}
			} else {
				wereDone = false;
			}
		});
		if(wereDone) {
			going = false;
		}

		if(iterations++ >= 1000) {
			throw "Took too long.";
		}
	}

	let product = 1;
	possibleRules.forEach(function(possible, possIndex) {
		possible.forEach(function(rule) {
			if(rule) {
				if(rule[0].includes("departure")) {
					product *= +yourTicket[possIndex];
				}
			}
		});
	});

	console.log(product); // part 2
}
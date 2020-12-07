"use strict";

function day7(text) {
	let regex = /([a-z ]+) bags contain ([a-z 0-9,]+)./gm;
	let entry = regex.exec(text);
	let rules = [];
	while(entry) { // loop over the text with that regex
		rules.push(entry);
		entry = regex.exec(text);
	}

	function Bag(color, bags) {
		this.color = color;
		this.bags = bags;
		this.hasGold;

		this.holdsGold = function() {
			console.log("Does " + this.color + " hold a shiny gold bag?");
			console.log("Or maybe " + this.bags + " has some?");
			if(this.hasGold !== undefined) {
				console.log(this.hasGold ? "Yes" : "No");
				return this.hasGold;
			}
			let tempHasGold = false;
			for(let i = 0; i < this.bags.length; i++) {
				if(this.bags[i].search(/shiny gold/) !== -1) {
					console.log(this.color + " does contain a shiny gold bag.");
					tempHasGold = true;
				} else if(this.bags[i].search(/no other/) !== -1) {
					continue;
				} else {
					tempHasGold = tempHasGold || findBag(this.bags[i]).holdsGold();
				}
			}
			this.hasGold = tempHasGold;
			return this.hasGold;
		}
	}

	function findBag(name) {
		for(let i = 0; i < formRules.length; i++) {
			if(formRules[i].color === name) {
				return formRules[i];
			}
		}
	}

	let formRules = []; // "formatted" rules
	rules.forEach(function(rule) {
		let container = [];
		let ruleReg = /[0-9] ([a-z ]+) bags?/gm
		let newEntry = ruleReg.exec(rule[2]);
		while(newEntry) {
			container.push(newEntry[1]);
			newEntry = ruleReg.exec(rule[2]);
		}
		formRules.push(new Bag(rule[1], container));
	});

	let numGold = 0;
	formRules.forEach(function(rule) {
		rule.holdsGold();
		if(rule.hasGold) {
			numGold++;
		}
	});

	console.log(numGold);
}
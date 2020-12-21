"use strict";

function day21(text) {
	let regex = /([a-z ]+) \(contains ([a-z]+)(?:, ([a-z]+))?(?:, ([a-z]+))?\)/gm;
	let entry = regex.exec(text);
	let foods = [];
	let allIngredients = [];
	let allAllergens = [];
	while(entry) { // loop over the text with that regex
		let ingredientsList = entry[1].split(" ");
		foods.push(new Food(ingredientsList, entry[2], entry[3], entry[4]));
		for(let i = 0; i < ingredientsList.length; i++) {
			if(!allIngredients.includes(ingredientsList[i])) {
				allIngredients.push(ingredientsList[i]);
			}
		}
		if(!allAllergens.includes(entry[2])) {
			allAllergens.push(entry[2]);
		}
		if(entry[3] && !allAllergens.includes(entry[3])) {
			allAllergens.push(entry[3]);
		}
		if(entry[4] && !allAllergens.includes(entry[4])) {
			allAllergens.push(entry[4]);
		}
		entry = regex.exec(text);
	}

	allAllergens.sort();

	function Food(ingredients, ...allergens) {
		this.ingredients = ingredients;
		this.allergens = allergens;
		if(typeof this.allergens[1] === "undefined") {
			this.allergens = [this.allergens[0]];
		} else if(typeof this.allergens[2] === "undefined") {
			this.allergens = [this.allergens[0], this.allergens[1]];
		}

		this.whittlePossibilities = function(possible, allergen) {
			// Takes an array (possible) and a string (allergen)
			// Modifies the array to delete possibilities
			// Then returns the array

			if(this.allergens.includes(allergen)) {
				// Since there is only ONE ingredient that contains the allergen,
				// if that ingredient isn't in the ingredients list,
				// it must not contain the allergen.
				// Thus, if an ingredient is possible, but it doesn't appear here,
				// it can't be the allergen.
				let workingPossible = [];
				for(let i = 0; i < possible.length; i++) {
					if(this.ingredients.includes(possible[i])) {
						workingPossible.push(possible[i]);
					}
				}
				return workingPossible;
			} else {
				// If it's not in the list, it could still be in
				// one of the ingredients, so it doesn't change
				// the possibilities.
				return possible;
			}
		}
	}

	let ingredientPossible = [];
	for(let i = 0; i < allAllergens.length; i++) {
		ingredientPossible.push(allIngredients.slice());
		for(let j = 0; j < foods.length; j++) {
			ingredientPossible[i] = foods[j].whittlePossibilities(ingredientPossible[i], allAllergens[i]);
		}
	}

	let allergenPossible = [];
	for(let i = 0; i < ingredientPossible.length; i++) {
		for(let j = 0; j < ingredientPossible[i].length; j++) {
			if(!allergenPossible.includes(ingredientPossible[i][j])) {
				allergenPossible.push(ingredientPossible[i][j]);
			}
		}
	}

	console.log(foods.reduce(function(acc, value) {
		for(let i = 0; i < value.ingredients.length; i++) {
			if(!allergenPossible.includes(value.ingredients[i])) {
				acc++;
			}
		}
		return acc;
	}, 0)); // part 1

	let trueAllergens = [];
	let notDone = true;
	while(notDone) {
		for(let i = 0; i < ingredientPossible.length; i++) {
			if(ingredientPossible[i].length === 1) {
				trueAllergens[i] = ingredientPossible[i][0];
			}
		}

		for(let i = 0; i < trueAllergens.length; i++) {
			if(typeof trueAllergens[i] !== "undefined") {
				for(let j = 0; j < ingredientPossible.length; j++) {
					if(ingredientPossible[j].includes(trueAllergens[i])) {
						ingredientPossible[j] = ingredientPossible[j].filter((ing) => ing !== trueAllergens[i]);
					}
				}
			}
		}

		notDone = trueAllergens.length !== allAllergens.length;
		if(!notDone) {
			for(let i = 0; i < trueAllergens.length; i++) {
				notDone = notDone || typeof trueAllergens[i] === "undefined";
			}
		}
	}
	console.log(trueAllergens.join()); // part 2
}
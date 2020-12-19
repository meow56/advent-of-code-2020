"use strict";

function day18(text) {
	let regex = /[0-9 *+()]+/gm;
	let entry = regex.exec(text);
	let problems = [];
	while(entry) { // loop over the text with that regex
		problems.push(entry[0]);
		entry = regex.exec(text);
	}

	function solveProblem(problem) {
		console.time("solve " + problem);
		console.group(`Problem: ${problem}`);
		let level = 0;
		let highestLevel = 0;
		let enclosures = [];

		function findLevel(level, setting = true) {
			for(let i = 0; i < enclosures.length; i++) {
				if(enclosures[i][0] === level && (!setting || enclosures[i][2] === "?") && (setting || typeof enclosures[i][3] === "undefined")) {
					return enclosures[i];
				}
			}
			return false;
		}

		function findIndex(index) {
			for(let i = 0; i < enclosures.length; i++) {
				if(enclosures[i][1] === index) {
					return enclosures[i];
				}
			}
			throw `Unable to find enclosure with start index ${index}.`;
		}

		for(let i = 0; i < problem.length; i++) {
			if(problem[i] === "(") {
				level++;
				if(level > highestLevel) {
					highestLevel = level;
				}
				enclosures.push([level, i, "?"]);
			}
			if(problem[i] === ")") {
				findLevel(level)[2] = i;
				level--;
			}
		}

		for(let i = highestLevel; i > 0; i--) {
			let relEnclosure = findLevel(i, false);
			while(relEnclosure) {
				let expressionOfInterest = problem.slice(relEnclosure[1] + 1, relEnclosure[2]);
				console.groupCollapsed(`Solving sub-problem ${expressionOfInterest}`);
				let currentSum, startIndex;
				if(expressionOfInterest[0] === "(") {
					let enclosed = findIndex(relEnclosure[1] + 1);
					currentSum = enclosed[3];
					startIndex = enclosed[2] - relEnclosure[1] - 1;
				} else {
					currentSum = +expressionOfInterest[0];
					startIndex = 1;
				}
				for(let j = startIndex; j < expressionOfInterest.length; j++) {
					switch(expressionOfInterest[j]) {
						case "+":
							if(expressionOfInterest[j + 2] !== "(") {
								console.log(`Adding ${expressionOfInterest[j + 2]} to sum.`);
								currentSum += +expressionOfInterest[j + 2];
								console.log(`Sum is now ${currentSum}.`);
							} else {
								let enclosed = findIndex(relEnclosure[1] + j + 3);
								console.log(`Adding ${enclosed[3]} to sum.`);
								currentSum += enclosed[3];
								j = enclosed[2] - relEnclosure[1] - 1;
								console.log(`Sum is now ${currentSum}.`);
							}
							break;
						case "*":
							if(expressionOfInterest[j + 2] !== "(") {
								console.log(`Multiplying ${expressionOfInterest[j + 2]} to sum.`);
								currentSum *= +expressionOfInterest[j + 2];
								console.log(`Sum is now ${currentSum}.`);
							} else {
								let enclosed = findIndex(relEnclosure[1] + j + 3);
								console.log(`Multiplying ${enclosed[3]} to sum.`);
								currentSum *= enclosed[3];
								j = enclosed[2] - relEnclosure[1] - 1;
								console.log(`Sum is now ${currentSum}.`);
							}
							break;
						default:
							continue;
					}
				}
				relEnclosure[3] = currentSum;
				console.groupEnd();
				console.log(`Final sum: ${currentSum}`);

				relEnclosure = findLevel(i, false);
			}
		}

		console.groupCollapsed(`Solving the problem.`);
		let finalSum, startIndex;
		if(problem[0] === "(") {
			let enclosed = findIndex(0);
			finalSum = enclosed[3];
			startIndex = enclosed[2];
		} else {
			finalSum = +problem[0];
			startIndex = 1;
		}
		for(let j = startIndex; j < problem.length; j++) {
			switch(problem[j]) {
				case "+":
					if(problem[j + 2] !== "(") {
						console.log(`Adding ${problem[j + 2]} to sum.`);
						finalSum += +problem[j + 2];
						console.log(`Sum is now ${finalSum}.`);
					} else {
						let enclosed = findIndex(j + 2);
						console.log(`Adding ${enclosed[3]} to sum.`);
						finalSum += enclosed[3];
						j = enclosed[2];
						console.log(`Sum is now ${finalSum}.`);
					}
					break;
				case "*":
					if(problem[j + 2] !== "(") {
						console.log(`Multiplying ${problem[j + 2]} to sum.`);
						finalSum *= +problem[j + 2];
						console.log(`Sum is now ${finalSum}.`);
					} else {
						let enclosed = findIndex(j + 2);
						console.log(`Multiplying ${enclosed[3]} to sum.`);
						finalSum *= enclosed[3];
						j = enclosed[2];
						console.log(`Sum is now ${finalSum}.`);
					}
					break;
				default:
					continue;
			}
		}
		console.groupEnd();
		console.log(`%cTrue Final Sum: ${finalSum}`, "font-weight: bold; color: #ff0000")
		console.groupEnd();
		console.timeEnd("solve " + problem);
		return finalSum;
	}

	let answers = problems.map(solveProblem);
	console.log(answers.reduce((acc, value) => acc + value));

}
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
		if(devMode) {
			console.time("solve " + problem);
			console.group(`Problem: ${problem}`);
		}
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
				if(devMode)
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
								if(devMode)
									console.log(`Adding ${expressionOfInterest[j + 2]} to sum.`);
								currentSum += +expressionOfInterest[j + 2];
								if(devMode)
									console.log(`Sum is now ${currentSum}.`);
							} else {
								let enclosed = findIndex(relEnclosure[1] + j + 3);
								if(devMode)
									console.log(`Adding ${enclosed[3]} to sum.`);
								currentSum += enclosed[3];
								j = enclosed[2] - relEnclosure[1] - 1;
								if(devMode)
									console.log(`Sum is now ${currentSum}.`);
							}
							break;
						case "*":
							if(expressionOfInterest[j + 2] !== "(") {
								if(devMode)
									console.log(`Multiplying ${expressionOfInterest[j + 2]} to sum.`);
								currentSum *= +expressionOfInterest[j + 2];
								if(devMode)
									console.log(`Sum is now ${currentSum}.`);
							} else {
								let enclosed = findIndex(relEnclosure[1] + j + 3);
								if(devMode)
									console.log(`Multiplying ${enclosed[3]} to sum.`);
								currentSum *= enclosed[3];
								j = enclosed[2] - relEnclosure[1] - 1;
								if(devMode)
									console.log(`Sum is now ${currentSum}.`);
							}
							break;
						default:
							continue;
					}
				}
				relEnclosure[3] = currentSum;
				if(devMode) {
					console.groupEnd();
					console.log(`Final sum: ${currentSum}`);
				}

				relEnclosure = findLevel(i, false);
			}
		}

		if(devMode)
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
						if(devMode)
							console.log(`Adding ${problem[j + 2]} to sum.`);
						finalSum += +problem[j + 2];
						if(devMode)
							console.log(`Sum is now ${finalSum}.`);
					} else {
						let enclosed = findIndex(j + 2);
						if(devMode)
							console.log(`Adding ${enclosed[3]} to sum.`);
						finalSum += enclosed[3];
						j = enclosed[2];
						if(devMode)
							console.log(`Sum is now ${finalSum}.`);
					}
					break;
				case "*":
					if(problem[j + 2] !== "(") {
						if(devMode)
							console.log(`Multiplying ${problem[j + 2]} to sum.`);
						finalSum *= +problem[j + 2];
						if(devMode)
							console.log(`Sum is now ${finalSum}.`);
					} else {
						let enclosed = findIndex(j + 2);
						if(devMode)
							console.log(`Multiplying ${enclosed[3]} to sum.`);
						finalSum *= enclosed[3];
						j = enclosed[2];
						if(devMode)
							console.log(`Sum is now ${finalSum}.`);
					}
					break;
				default:
					continue;
			}
		}
		if(devMode) {
			console.groupEnd();
			console.log(`%cTrue Final Sum: ${finalSum}`, "font-weight: bold; color: #ff0000")
			console.groupEnd();
			console.timeEnd("solve " + problem);
		}
		return finalSum;
	}

	function solveProblemPlus(problem) {
		if(devMode) {
			console.time("solve " + problem);
			console.group(`Problem: ${problem}`);
		}
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

		function subSolve(relEnclosure) {
			let expressionOfInterest = problem.slice(relEnclosure[1] + 1, relEnclosure[2]);
			if(devMode)
				console.groupCollapsed(`Solving problem ${expressionOfInterest}`);
			let inter = [];
			let tempSum, startIndex;
			if(expressionOfInterest[0] === "(") {
				let enclosed = findIndex(relEnclosure[1] + 1);
				tempSum = enclosed[3];
				startIndex = enclosed[2] - relEnclosure[1] - 1;
			} else {
				tempSum = +expressionOfInterest[0];
				startIndex = 1;
			}
			for(let i = startIndex; i < expressionOfInterest.length; i++) {
				switch(expressionOfInterest[i]) {
					case "+":
						if(expressionOfInterest[i + 2] !== "(") {
							if(devMode)
								console.log(`Adding ${expressionOfInterest[i + 2]} to sum.`);
							tempSum += +expressionOfInterest[i + 2];
							if(devMode)
								console.log(`Sum is now ${tempSum}.`);
						} else {
							let enclosed = findIndex(relEnclosure[1] + i + 3);
							if(devMode)
								console.log(`Adding ${enclosed[3]} to sum.`);
							tempSum += enclosed[3];
							i = enclosed[2] - relEnclosure[1] - 1;
							if(devMode)
								console.log(`Sum is now ${tempSum}.`);
						}
						break;
					case "*":
						inter.push(tempSum);
						if(expressionOfInterest[i + 2] === "(") {
							let enclosed = findIndex(relEnclosure[1] + i + 3);
							tempSum = enclosed[3];
							i = enclosed[2] - relEnclosure[1] - 1;
						} else {
							tempSum = +expressionOfInterest[i + 2];
							i += 2;
						}
						break;
					default:
						continue;
				}
			}
			inter.push(tempSum);
			if(devMode)
				console.groupEnd();
			return inter.reduce((acc, value) => acc * value, 1);
		}

		for(let i = highestLevel; i > 0; i--) {
			let relEnclosure = findLevel(i, false);
			while(relEnclosure) {
				relEnclosure[3] = subSolve(relEnclosure);
				if(devMode)
					console.log(`Final sum: ${relEnclosure[3]}`);

				relEnclosure = findLevel(i, false);
			}
		}

		let finalSum, startIndex;
		finalSum = subSolve([0, -1, problem.length]);
		if(devMode) {
			console.log(`%cTrue Final Sum: ${finalSum}`, "font-weight: bold; color: #ff0000")
			console.groupEnd();
			console.timeEnd("solve " + problem);
		}
		return finalSum;
	}

	let answers = problems.map(solveProblem);
	if(devMode)
		console.group("Part 1");
	console.log(answers.reduce((acc, value) => acc + value)); // part 1
	if(devMode)
		console.groupEnd();

	let answersPlus = problems.map(solveProblemPlus);
	if(devMode)
		console.group("Part 2");
	console.log(answersPlus.reduce((acc, value) => acc + value)); // part 2
	if(devMode)
		console.groupEnd();
}
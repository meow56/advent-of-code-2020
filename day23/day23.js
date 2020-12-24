"use strict";

function day23(text) {
	const INPUT = "962713854";
	let cups = INPUT.split("");
	cups = cups.map(elem => +elem);
	const TOTAL_CUPS = 1000000;

	function Cup(id) {
		this.id = id;
		this.next;
	}

	for(let i = cups.length; i < TOTAL_CUPS; i++) {
		cups[i] = i + 1;
	}

	let remapping = [];
	for(let i = 0; i < cups.length; i++) {
		remapping.push([i, cups[i]]);
	}

	let cupMap = new Map(remapping);

	const TRIALS = 10000000;
	let currentCup = 0;
	/*console.time(`Map version`);
	for(let i = 0; i < TRIALS; i++) {
		let currentCupValue = cupMap.get(currentCup);
		if(i % Math.floor(TRIALS / 100) === 0) {
			console.log(`${i} / ${TRIALS} (${Math.floor(i * 10000 / TRIALS) / 100}%)`);
		}
		console.time(`Map: First shift`);
		let firstMove = cupMap.get((currentCup + 1) % TOTAL_CUPS);
		let secondMove = cupMap.get((currentCup + 2) % TOTAL_CUPS);
		let thirdMove = cupMap.get((currentCup + 3) % TOTAL_CUPS);
		cupMap.set("move1", firstMove);
		cupMap.set("move2", secondMove);
		cupMap.set("move3", thirdMove);
		if(currentCup + 3 < TOTAL_CUPS) {
			for(let i = (currentCup + 1) % TOTAL_CUPS; i < TOTAL_CUPS - 3; i++) {
				cupMap.set(i, cupMap.get(i + 3));
			}
		} else if(currentCup + 2 < TOTAL_CUPS) {
			// Then the missing ones are 0, TOTAL_CUPS - 2, and TOTAL_CUPS - 1.
			for(let i = 0; i < TOTAL_CUPS - 3; i++) {
				cupMap.set(i, cupMap.get(i + 1));
			}
		} else if(currentCup + 1 < TOTAL_CUPS) {
			// Then the missing ones are 0, 1, and TOTAL_CUPS - 1.
			for(let i = 0; i < TOTAL_CUPS - 3; i++) {
				cupMap.set(i, cupMap.get(i + 2));
			}
		} else {
			// Then the missing ones are 0, 1, and 2.
			for(let i = (currentCup + 1) % TOTAL_CUPS; i < TOTAL_CUPS - 3; i++) {
				cupMap.set(i, cupMap.get(i + 3));
			}
		}
		cupMap.delete(TOTAL_CUPS - 3);
		cupMap.delete(TOTAL_CUPS - 2);
		cupMap.delete(TOTAL_CUPS - 1);
		console.timeEnd(`Map: First shift`);

		console.time(`Map: Destination found`);
		let currentDestination = currentCupValue - 1;
		if(currentDestination < 1) {
			currentDestination += TOTAL_CUPS;
		}
		let destination;
		for(const cup of cupMap) {
			if(!isNaN(+cup[0]) && cup[1] === currentDestination) {
				destination = cup[0];
				break;
			}
		}
		let runs = 0;
		const BREAKPLS = 1000100;
		while(typeof destination === "undefined") {
			if(runs > BREAKPLS) {
				throw `Infinity protection kicked in.`;
			}
			runs++;
			currentDestination--;
			if(currentDestination < 1) {
				currentDestination += TOTAL_CUPS;
			}
			for(const cup of cupMap) {
				if(!isNaN(+cup[0]) && cup[1] === currentDestination) {
					destination = cup[0];
					break;
				}
			}
		}
		console.timeEnd(`Map: Destination found`);

		console.time(`Map: Second Shift`);
		let firstWorking, secondWorking, thirdWorking;
		for(let i = destination + 1; i < TOTAL_CUPS; i++) {
			if((i - destination - 1) % 3 === 0) {
				firstWorking = cupMap.get(i);
				cupMap.set(i, cupMap.get("move1"));
				cupMap.set("move1", firstWorking);
			} else if((i - destination - 1) % 3 === 1) {
				secondWorking = cupMap.get(i);
				cupMap.set(i, cupMap.get("move2"));
				cupMap.set("move2", secondWorking);
			} else {
				thirdWorking = cupMap.get(i);
				cupMap.set(i, cupMap.get("move3"));
				cupMap.set("move3", thirdWorking);
			}
		}
		cupMap.delete("move1");
		cupMap.delete("move2");
		cupMap.delete("move3");
		console.timeEnd(`Map: Second Shift`);

		for(let i = 0; i < TOTAL_CUPS; i++) {
			if(cupMap.get(i) === currentCupValue) {
				currentCup = i;
				break;
			}
		}
		currentCup = (currentCup + 1) % TOTAL_CUPS;
		console.log(`Next cup: ${currentCup}.`);
		console.groupCollapsed("Cups");
		for(const cup of cupMap) {
			console.log(`At index ${cup[0]}, we have ${cup[1]}`);
		}
		console.groupEnd();
	}
	for(let i = 0; i < TOTAL_CUPS; i++) {
		if(cupMap.get(i) === 1) {
			console.log(cupMap.get((i + 1) % TOTAL_CUPS) * cupMap.get((i + 2) % TOTAL_CUPS));
			break;
		}
	}
	console.timeEnd(`Map version`);*/

	/*currentCup = cups[0]; // Note that currentCup is now the cup LABEL rather than the cup INDEX.
	let cupSet = new Set(cups);

	console.time(`Set version`);
	for(let i = 0; i < TRIALS; i++) {
		if(i % Math.floor(TRIALS / 100) === 0) {
			console.log(`${i} / ${TRIALS} (${Math.floor(i * 10000 / TRIALS) / 100}%)`);
		}
		console.time(`Set: First shift`);
		let setIterator = cupSet.values();
		let nextSet = setIterator.next();
		while(nextSet.value !== currentCup) {
			nextSet = setIterator.next();
		}
		let moving = new Set();
		for(let j = 0; j < 3; j++) {
			nextSet = setIterator.next();
			if(nextSet.done) {
				// We've reached the end of the line, back to start.
				setIterator = cupSet.values();
				nextSet = setIterator.next();
				moving.add(nextSet.value);
			} else {
				moving.add(nextSet.value);
			}
		}
		console.timeEnd(`Set: First shift`);

		console.time(`Set: Destination found`);
		let currentDestination = currentCup - 1;
		if(currentDestination < 1) {
			currentDestination += TOTAL_CUPS;
		}
		let runs = 0;
		const BREAKPLS = 100;
		while(moving.has(currentDestination)) {
			if(runs > BREAKPLS) {
				throw `Infinity protection kicked in.`;
			}
			currentDestination--;
			if(currentDestination < 1) {
				currentDestination += TOTAL_CUPS;
			}
		}
		console.timeEnd(`Set: Destination found`);

		console.time(`Set: Second Shift`);
		console.time(`Set: Pre-shuffle`);
		setIterator = cupSet.values();
		nextSet = setIterator.next();
		while(nextSet.value !== currentDestination) {
			nextSet = setIterator.next(); // Traverse the set until we arrive at our destination.
		}
		console.timeEnd(`Set: Pre-shuffle`);
		console.time(`Set: Shuffle`);
		nextSet = setIterator.next();
		let anArray = [...cupSet]; // blasphemous
		let arrIndex = anArray.findIndex(elem => elem === currentDestination);
		let newArray = [...anArray.slice(arrIndex), ...anArray.slice(0, arrIndex)];
		while(nextSet.value !== currentDestination) {
			if(nextSet.done) {
				setIterator = cupSet.values();
				nextSet = setIterator.next();
			}
			anArray.push(nextSet.value);
			nextSet = setIterator.next();
		}
		moving = new Set([...moving, ...newArray]);
		//moving.add(nextSet.value);
		console.timeEnd(`Set: Shuffle`);
		console.timeEnd(`Set: Second Shift`);

		setIterator = moving.values();
		nextSet = setIterator.next();
		while(nextSet.value !== currentCup) {
			nextSet = setIterator.next();
		}
		nextSet = setIterator.next();
		if(nextSet.done) {
			setIterator = moving.values();
			currentCup = setIterator.next().value;
		} else {
			currentCup = nextSet.value;
		}
		cupSet = moving;
	}
	let setIterator = cupSet.values();
	let nextSet = setIterator.next();
	while(nextSet.value !== 1) {
		nextSet = setIterator.next();
	}
	nextSet = setIterator.next();
	let firstOne, secondOne;
	if(nextSet.done) {
		setIterator = cupSet.values();
		nextSet = setIterator.next();
		firstOne = nextSet.value;
	} else {
		firstOne = nextSet.value;
	}
	nextSet = setIterator.next();
	if(nextSet.done) {
		setIterator = cupSet.values();
		nextSet = setIterator.next();
		secondOne = nextSet.value;
	} else {
		secondOne = nextSet.value;
	}
	console.log(`Final value: ${firstOne * secondOne}`);
	console.timeEnd(`Set version`);*/

	
	let newCup = cups.map(elem => new Cup(elem));
	for(let i = 0; i < newCup.length; i++) {
		newCup[i].next = newCup[(i + 1) % TOTAL_CUPS];
	}
	newCup = newCup.map((elem) => [elem.id, elem]);
	let cupList = new Map(newCup);
	currentCup = newCup[0][1];

	console.time(`Set+ version`);
	for(let i = 0; i < TRIALS; i++) {
		if(i % Math.floor(TRIALS / 100) === 0) {
			console.log(`${i} / ${TRIALS} (${Math.floor(i * 10000 / TRIALS) / 100}%)`);
		}
		//console.time(`Set+: First shift`);
		// to move: currentCup.next, currentCup.next.next, currentCup.next.next.next
		let moving = [currentCup.next, currentCup.next.next, currentCup.next.next.next];
		currentCup.next = currentCup.next.next.next.next;
		//console.timeEnd(`Set+: First shift`);

		//console.time(`Set+: Destination found`);
		let currentDestination = currentCup.id - 1;
		if(currentDestination < 1) {
			currentDestination += TOTAL_CUPS;
		}
		let runs = 0;
		const BREAKPLS = 100;
		while(moving.some(elem => elem.id === currentDestination)) {
			if(runs > BREAKPLS) {
				throw `Infinity protection kicked in.`;
			}
			currentDestination--;
			if(currentDestination < 1) {
				currentDestination += TOTAL_CUPS;
			}
		}
		//console.timeEnd(`Set+: Destination found`);

		//console.time(`Set+: Second Shift`);
		let nextSet = cupList.get(currentDestination);
		moving[2].next = nextSet.next;
		nextSet.next = moving[0];

		//console.timeEnd(`Set+: Second Shift`);

		currentCup = currentCup.next;
	}
	let nextList = cupList.get(1);
	console.log(`Final value: ${nextList.next.id * nextList.next.next.id}`);
	console.timeEnd(`Set+ version`);


	/*currentCup = 0;
	console.time(`Array version`);
	for(let i = 0; i < TRIALS; i++) {
		if(i % Math.floor(TRIALS / 100) === 0) {
			console.log(`${i} / ${TRIALS} (${Math.floor(i * 10000 / TRIALS) / 100}%)`);
		}
		//console.log(`Current cup is ${cups[currentCup]}, at index ${currentCup}.`);
		console.time(`Array: First shift`);
		let workingCup = cups.slice();
		let moving = workingCup.slice(currentCup + 1, currentCup + 4);
		if(moving.length === 3) {
			// Since moving will be 3 long most of the time,
			// I don't want to keep checking its length
			// over and over. Hence this empty statement.
		} else if(moving.length === 2) {
			moving.push(workingCup[0]);
		} else if(moving.length === 1) {
			moving.push(workingCup[0]);
			moving.push(workingCup[1]);
		} else if(moving.length === 0) {
			moving = workingCup.slice(0, 3);
		}
		//console.log(`Moving ${moving[0]}, ${moving[1]}, ${moving[2]}.`);
		workingCup = workingCup.filter(elem => !moving.includes(elem));
		console.timeEnd(`Array: First shift`);

		console.time(`Array: Destination found`);
		let currentDestination = cups[currentCup] - 1;
		if(currentDestination < 1) {
			currentDestination += 9;
		}
		let destination = workingCup.findIndex(elem => elem === currentDestination);
		let runs = 0;
		const BREAKPLS = 100;
		while(destination === -1) {
			if(runs > BREAKPLS) {
				throw `Infinity protection kicked in.`;
			}
			runs++;
			currentDestination--;
			if(currentDestination < 1) {
				currentDestination += cups.length;
			}
			destination = workingCup.findIndex(elem => elem === currentDestination);
		}
		//console.log(`Destination is ${currentDestination}, at index ${destination}`);
		console.timeEnd(`Array: Destination found`);

		console.time(`Array: Second Shift`);
		let left = workingCup.slice(0, destination + 1);
		let right = workingCup.slice(destination + 1);


		workingCup = [...left, ...moving, ...right];
		console.timeEnd(`Array: Second Shift`);

		currentCup = workingCup.findIndex(elem => elem === cups[currentCup]);

		currentCup = (currentCup + 1) % cups.length;
		cups = workingCup.slice();
	}

	let startIndex = cups.findIndex(elem => elem === 1);
	let sequence = "";
	for(let i = 1; i < cups.length; i++) {
		sequence += cups[(startIndex + i) % cups.length];
	}
	console.log(sequence); // part 1
	console.log(cups[(startIndex + 1) % TOTAL_CUPS] * cups[(startIndex + 2) % TOTAL_CUPS]);
	console.timeEnd(`Array version`);*/
	console.log("The end");
}
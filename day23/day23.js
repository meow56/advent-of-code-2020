"use strict";

function day23(text) {
	let cups = [9, 6, 2, 7, 1, 3, 8, 5, 4];

	//cups = [3, 8, 9, 1, 2, 5, 4, 6, 7]; // Test

	const TRIALS = 100;
	let currentCup = 0;
	for(let i = 0; i < TRIALS; i++) {
		console.log(`Current cup is ${cups[currentCup]}, at index ${currentCup}.`);
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
		console.log(`Moving ${moving[0]}, ${moving[1]}, ${moving[2]}.`);
		workingCup = workingCup.filter(elem => !moving.includes(elem));

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
				currentDestination += 9;
			}
			destination = workingCup.findIndex(elem => elem === currentDestination);
		}
		console.log(`Destination is ${currentDestination}, at index ${destination}`);
		let left = workingCup.slice(0, destination + 1);
		let right = workingCup.slice(destination + 1);


		workingCup = [...left, ...moving, ...right];

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
}
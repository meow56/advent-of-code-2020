"use strict";

function day13(text) {
	let regex = /[0-9]+|x,/gm;
	let entry = regex.exec(text);
	let firstNum = +entry[0];
	entry = regex.exec(text);
	let buses = [];
	while(entry) { // loop over the text with that regex
		buses.push(entry[0]);
		entry = regex.exec(text);
	}

	let times = [];
	let lowestTime = 100000000;
	let lowestID = 0;
	for(let i = 0; i < buses.length; i++) {
		if(buses[i] !== "x,") {
			times[i] = Math.ceil(firstNum / +buses[i]) * +buses[i];
			if(times[i] < lowestTime) {
				lowestTime = times[i];
				lowestID = +buses[i];
			}
		}
	}
	console.log((lowestTime - firstNum) * lowestID); // part 1

	let base = 1;
	let number = 0;
	for(let i = 0; i < buses.length; i++) {
		if(buses[i] === "x,") {
			continue;
		}

		while((number + i) % +buses[i] !== 0) {
			number += base;
		}
		base *= +buses[i];
		console.log("Finished with bus " + buses[i]);
	}
	console.log(number); // part 2
}
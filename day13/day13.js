"use strict";

function day13(text) {
	let regex = /[0-9]+/gm;
	let entry = regex.exec(text);
	let buses = [];
	while(entry) { // loop over the text with that regex
		buses.push(Number(entry[0]));
		entry = regex.exec(text);
	}

	let times = [];
	let lowestTime = 100000000;
	let lowestID = 0;
	for(let i = 1; i < buses.length; i++) {
		times[i] = Math.ceil(buses[0] / buses[i]) * buses[i];
		if(times[i] < lowestTime) {
			lowestTime = times[i];
			lowestID = buses[i];
		}
	}
	console.log((lowestTime - buses[0]) * lowestID); // part 1
}
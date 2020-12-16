"use strict";

function day15(text) {
	let regex = /([0-9]+)/gm;
	let entry = regex.exec(text);
	let nums = [];
	while(entry) { // loop over the text with that regex
		nums.push(+entry[1]);
		entry = regex.exec(text);
	}

	function memoryGame(limit) {
		let memNum = nums.slice();
		let total = memNum.length;
		let current = memNum[memNum.length - 1];
		let lastIndex = [];
		memNum.forEach((num, index) => lastIndex[num] = index);
		lastIndex[4] = undefined;
		while(total !== limit) {
			if(total % 100000 === 0) {
				console.log(total + " of " + limit + " (" + (Math.round(total * 10000 / limit) / 100) + "%)");
			}

			const lookupLength = 5000000; // How large the lookup table should be.
			let curLastIndex;
			if(current < lookupLength) {
				curLastIndex = lastIndex[current];
			} else {
				curLastIndex = findNumber(current, memNum);
			}
			if(curLastIndex || curLastIndex === 0) {
				let temp = current;
				current = total - 1 - curLastIndex;
				memNum.push(total - 1 - curLastIndex);
				if(temp < lookupLength) {
					lastIndex[temp] = total - 1;
				}
				total++;
			} else {
				if(current < lookupLength) {
					lastIndex[current] = total - 1;
				}
				current = 0;
				memNum.push(0);
				total++;
			}

			if(total % optFreq === 0) {
				console.log("Optimization " + (total / optFreq) + " of " + Math.floor(limit / optFreq));
				console.log("Pre-optimization: " + memNum.length);
				memNum = optimize(memNum, lastIndex, total);
				console.log("Post-optimization: " + memNum.length);
			}

			/*if(current !== asdfNum[total - 1]) {
				throw "Current number " + current + " does not equal intended number " + asdfNum[total - 1] + " at index " + (total - 1) + ".";
			}*/
		}
		return current;
	}

	function optMemGame(limit) {
		let memNum = nums.slice();
		let total = memNum.length;
		let current = memNum[memNum.length - 1];
		let lastIndex = [];
		memNum.forEach((num, index) => lastIndex[num] = index);
		lastIndex[4] = undefined;
		while(total !== limit) {
			if(total % 100000 === 0) {
				console.log(total + " of " + limit + " (" + (Math.round(total * 10000 / limit) / 100) + "%)");
			}

			const lookupLength = 30000000; // How large the lookup table should be.
			let curLastIndex = lastIndex[current];
			if(curLastIndex || curLastIndex === 0) {
				let temp = current;
				current = total - 1 - curLastIndex;
				lastIndex[temp] = total - 1;
				total++;
			} else {
				lastIndex[current] = total - 1;
				current = 0;
				total++;
			}
		}
		return current;
	}

	const optFreq = 1000000; // How often the memNum table is optimized. (namely, once every optFreq.)

	/*let asdfNum = nums.slice();
	while(asdfNum.length !== 2020) {
		let ind = findNumber(asdfNum[asdfNum.length - 1], asdfNum);
		if(ind !== false) {
			asdfNum.push(asdfNum.length - 1 - ind);
		} else {
			asdfNum.push(0);
		}
	}*/


	console.log(optMemGame(2020));
	console.log(optMemGame(30000000));

	function findNumber(num, numArray) {
		for(let i = numArray.length - 2; i >= 0; i--) {
			if(numArray[i] === num) {
				return i;
			}
		}
		return false;
	}

	function optimize(memNum, lastIndex, total) {
		let workIndex = 0;
		let firstLastIndex;
		if(typeof lastIndex[workIndex] !== "undefined") {
			firstLastIndex = lastIndex[workIndex] - (total - memNum.length);
		} else {
			firstLastIndex = findNumber(memNum[workIndex], memNum)
		}
		let workMemNum = memNum.slice();
		while(firstLastIndex !== workIndex) {
			workIndex++;
			firstLastIndex = lastIndex[workIndex] || findNumber(memNum[workIndex], memNum);
			if(!firstLastIndex) {
				break;
			}
		}
		workMemNum = workMemNum.slice(workIndex)
		return workMemNum;
	}
}
"use strict";

function day15(text) {
	let regex = /([0-9]+)/gm;
	let entry = regex.exec(text);
	let nums = [];
	while(entry) { // loop over the text with that regex
		nums.push(+entry[1]);
		entry = regex.exec(text);
	}

	while(nums.length !== 2020) {
		let ind = findNumber(nums[nums.length - 1]);
		if(ind !== false) {
			nums.push(nums.length - 1 - ind);
		} else {
			nums.push(0);
		}
	}
	console.log(nums[2019]);

	function findNumber(num) {
		for(let i = nums.length - 2; i >= 0; i--) {
			if(nums[i] === num) {
				return i;
			}
		}
		return false;
	}
}
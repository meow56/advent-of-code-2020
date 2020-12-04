"use strict";

function day3(text) {
	let regex = /[.#]+/gm;
	let entry = regex.exec(text);
	let trees = [];
	while(entry) { // loop over the text with that regex
		trees.push(entry[0]);
		entry = regex.exec(text);
	}

	let hitTrees = 0;
	for(let i = 0; i < trees.length; i++) {
		let treeCheck = trees[i][(i * 3) % trees[i].length] === "#";
		if(treeCheck) {
			hitTrees++;
		}
	}
	console.log(hitTrees); // part 1
}
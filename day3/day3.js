"use strict";

function day3(text) {
	let regex = /[.#]+/gm;
	let entry = regex.exec(text);
	let trees = [];
	while(entry) { // loop over the text with that regex
		trees.push(entry[0]);
		entry = regex.exec(text);
	}

	let slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
	let hitTrees = [0, 0, 0, 0, 0];
	for(let j = 0; j < slopes.length; j++) {
		for(let i = 0; i < trees.length / slopes[j][1]; i++) {
			let treeCheck = trees[i * slopes[j][1]][(i * slopes[j][0]) % trees[i * slopes[j][1]].length] === "#";
			if(treeCheck) {
				hitTrees[j]++;
			}
		}
	}
	let treeProduct = 1;
	hitTrees.forEach(hit => treeProduct *= hit);
	console.log(hitTrees[1]); // part 1
	console.log(treeProduct); // part 2
}
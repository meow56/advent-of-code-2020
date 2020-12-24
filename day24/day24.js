"use strict";

function day24(text) {
	let regex = /[news]+/gm;
	let entry = regex.exec(text);
	let refs = [];
	while(entry) { // loop over the text with that regex
		refs.push(entry[0]);
		entry = regex.exec(text);
	}
	/*		  E  		Note compass
	          __   		In the center is (0, 0)
		   __/  \__		E is (1, 0)
		  /  \__/  \	NE is (0, 1)
		N \__/  \__/ S  SE is (1, -1)
		  /  \__/  \	W is (-1, 0)
		  \__/  \__/	SW is (0, -1)
		     \__/		NW is (-1, 1)
			  W
	*/


	function Tile(coords) {
		this.coords = coords;
		this.black = true; // Since I'm only looking at tiles when I need to flip them, this is ok.
	}

	refs = refs.map(function(inst) {
		let workingRef = [];
		for(let i = 0; i < inst.length; i++) {
			switch(inst[i]) {
				case "e":
				case "w":
					workingRef.push(inst[i]);
					break;
				case "n":
				case "s":
					workingRef.push(inst[i] + inst[i + 1]);
					i++;
					break;
			}
		}
		return workingRef;
	});

	let tiles = [];

	function findTile(coords) {
		return tiles.find(tile => tile.coords[0] === coords[0] && tile.coords[1] === coords[1]);
	}

	refs.forEach(function(instList) {
		let position = [0, 0];
		instList.forEach(function(inst) {
			switch(inst) {
				case "e":
					position[0]++;
					break;
				case "w":
					position[0]--;
					break;
				case "ne":
					position[1]++;
					break;
				case "se":
					position[0]++;
					position[1]--;
					break;
				case "nw":
					position[0]--;
					position[1]++;
					break;
				case "sw":
					position[1]--;
			}
		});
		let foundTile = findTile(position);
		if(typeof foundTile !== "undefined") {
			foundTile.black = !foundTile.black;
		} else {
			tiles.push(new Tile(position))
		}
	});

	console.log(tiles.reduce(function(acc, value) {
		if(value.black) {
			acc++;
		}
		return acc;
	}, 0)); // part 1
}
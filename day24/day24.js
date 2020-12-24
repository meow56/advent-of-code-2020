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

	function findTile(coords, set = tiles) {
		return set.find(tile => tile.coords[0] === coords[0] && tile.coords[1] === coords[1]);
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

	tiles = tiles.filter(elem => elem.black);

	function conway() {
		let workingTiles = [];
		tiles.forEach(function(tile) {
			workingTiles = checked(tile.coords, workingTiles);

			workingTiles = checked([tile.coords[0] + 1, tile.coords[1]    ], workingTiles);
			workingTiles = checked([tile.coords[0]    , tile.coords[1] + 1], workingTiles);
			workingTiles = checked([tile.coords[0] + 1, tile.coords[1] - 1], workingTiles);
			workingTiles = checked([tile.coords[0] - 1, tile.coords[1]    ], workingTiles);
			workingTiles = checked([tile.coords[0]    , tile.coords[1] - 1], workingTiles);
			workingTiles = checked([tile.coords[0] - 1, tile.coords[1] + 1], workingTiles);
		});
		tiles = workingTiles;
	}
	function checked(position, workingTiles) {
		if(typeof findTile(position, workingTiles) !== "undefined") {
			return workingTiles; // We've already calculated this tile, no need to do it again.
		}
		let tile = findTile(position);
		let isBlack = typeof tile !== "undefined";

		let blackCount = 0;
		let e = findTile([position[0] + 1, position[1]]);
		let ne = findTile([position[0], position[1] + 1]);
		let se = findTile([position[0] + 1, position[1] - 1]);
		let w = findTile([position[0] - 1, position[1]]);
		let nw = findTile([position[0] - 1, position[1] + 1]);
		let sw = findTile([position[0], position[1] - 1]);
		blackCount += e ? 1 : 0;
		blackCount += ne ? 1 : 0;
		blackCount += se ? 1 : 0;
		blackCount += w ? 1 : 0;
		blackCount += nw ? 1 : 0;
		blackCount += sw ? 1 : 0;
		if(isBlack) {
			if(blackCount === 0 || blackCount > 2) {
				tile.black = false; // goodbye :(
			} else {
				workingTiles.push(tile);
			}
		} else {
			if(blackCount === 2) {
				workingTiles.push(new Tile(position));
			}
		}
		return workingTiles;
	}

	const DAYS = 100;
	for(let i = 0; i < DAYS; i++) {
		conway();
		let sum = tiles.length
		console.log(`Day ${i + 1}: ${sum}`);
	}
}
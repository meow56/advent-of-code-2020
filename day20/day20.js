"use strict";

function day20(text) {
	let regex = /Tile ([0-9]{4}):((?:\n[.#]{10}){10})/gm;
	let entry = regex.exec(text);
	let tiles = [];
	while(entry) { // loop over the text with that regex
		let tiled = entry[2].split("\n");
		tiled = tiled.slice(1);
		tiles.push(new Tile(+entry[1], tiled));
		entry = regex.exec(text);
	}

	function Tile(id, tile) {
		this.id = id;
		this.tile = tile;
		this.horizEdges = []; // edges on the left and right
		this.isHorizFlip;
		this.vertEdges = []; // edges on the top and bottom
		this.edges = [];
		this.isVertFlip;
		this.horizMatches = [];
		this.vertMatches = [];
		this.matches = [];

		let leftSide = "";
		let rightSide = "";
		tile.forEach(function(row) {
			leftSide += row[0];
			rightSide += row[row.length - 1];
		});
		this.edges.push(this.tile[0]);
		this.edges.push(rightSide);
		this.edges.push(this.tile[this.tile.length - 1]);
		this.edges.push(leftSide);

		this.matchEdges = function() {
			let isDone = true;
			for(let i = 0; i < 4; i++) {
				if(typeof this.matches[i] === "undefined") {
					isDone = false;
				}
			}
			if(!isDone) {
				for(let i = 0; i < this.edges.length; i++) {
					tiles.forEach(function(tile) {
						if(tile.id !== this.id) {
							for(let j = 0; j < tile.edges.length; j++) {
								if(this.edges[i] === tile.edges[j] || this.edges[i].split("").reverse().join("") === tile.edges[j]) {
									this.matches[i] = tile.id;
									tile.matches[j] = this.id;
								}
							}
						}
					}, this);
				}
			}
		}
	}

	tiles.forEach((tile) => tile.matchEdges());

	console.log(tiles.reduce(function(acc, value) {
		let undefCount = 0;
		for(let i = 0; i < 4; i++) {
			if(typeof value.matches[i] === "undefined") {
				undefCount++;
			}
		}
		if(undefCount > 2) {
			throw `Too many unmatched edges for tile ${value.id}.`
		}
		if(undefCount === 2) {
			console.log(`${value.id} is a corner tile.`);
			return acc * value.id;
		}
		return acc;
	}, 1)); // part 1

}
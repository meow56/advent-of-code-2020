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
		this.edges = [];
		this.matches = [];

		let leftSide = "";
		let rightSide = "";
		this.tile.forEach(function(row) {
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

		this.flipHorizontally = function() {
			this.tile = this.tile.map(value => value.split("").reverse().join(""));
			this.edges = [	this.edges[0].split("").reverse().join(""),
							this.edges[3],
							this.edges[2].split("").reverse().join(""),
							this.edges[1]];
			this.matches = [this.matches[0],
							this.matches[3],
							this.matches[2],
							this.matches[1]];
		}

		this.flipVertically = function() {
			this.tile = this.tile.reverse();
			this.edges = [	this.edges[2],
							this.edges[1].split("").reverse().join(""),
							this.edges[0],
							this.edges[3].split("").reverse().join("")];
			this.matches = [this.matches[2],
							this.matches[1],
							this.matches[0],
							this.matches[3]];
		}

		this.rotate = function(turns) {
			turns = 4 - turns; // this is me when I think clockwise but I actually rotate counter-clockwise :)
			for(let i = 0; i < turns; i++) {
				let workingTile = [];
				for(let j = 0; j < this.tile.length; j++) {
					let workingRow = "";
					for(let k = 0; k < this.tile.length; k++) {
						workingRow += this.tile[k][this.tile.length - j - 1];
					}
					workingTile.push(workingRow);
				}
				this.tile = workingTile;
				this.edges = [];
				let leftSide = "";
				let rightSide = "";
				this.tile.forEach(function(row) {
					leftSide += row[0];
					rightSide += row[row.length - 1];
				});
				this.edges.push(this.tile[0]);
				this.edges.push(rightSide);
				this.edges.push(this.tile[this.tile.length - 1]);
				this.edges.push(leftSide);
				this.matches = [this.matches[1], this.matches[2], this.matches[3], this.matches[0]];
			}
		}
	}

	function findTile(id) {
		return tiles.find(element => element.id === id);
	}

	tiles.forEach((tile) => tile.matchEdges());

	let corners = [];
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
			corners.push(value);
			return acc * value.id;
		}
		return acc;
	}, 1)); // part 1

	function transformTile(tile, correctTile) {
		// tile: the tile to transform
		// correctTile: a tile that is connected to this tile that is also oriented correctly

		let side; 	// the side that tile should be on relative to correctTile
					// 0: top, 1: right, 2: down, 3: left
		for(let i = 0; i < 4; i++) {
			if(correctTile.matches[i] === tile.id) {
				side = i;
			}
		}

		let tileSide;	// the side that correctTile is on relative to tile

		for(let i = 0; i < 4; i++) {
			if(tile.matches[i] === correctTile.id) {
				tileSide = i;
			}
		}

		if((side + 2) % 4 === tileSide) {
			// the tile is rotated correctly.
			// just need to make sure the tile is flipped properly.
			if(correctTile.edges[side] === tile.edges[tileSide]) {
				// good to go
			} else {
				// gotta flip
				if(side % 2 === 0) {
					// flip horizontally
					tile.flipHorizontally();
				} else {
					tile.flipVertically();
				}
			}
		} else {
			// the tile is not rotated correctly.
			// rotate the tile clockwise by the correct amount. 
			tile.rotate((((((side + 2) % 4) - tileSide) % 4) + 4 ) % 4);
			// then flip the tile if necessary
			tileSide = (side + 2) % 4;
			if(correctTile.edges[side] === tile.edges[tileSide]) {
				// good to go
			} else if(correctTile.edges[side] === tile.edges[tileSide].split("").reverse().join("")) {
				// gotta flip
				if(side % 2 === 0) {
					// flip horizontally
					tile.flipHorizontally();
				} else {
					tile.flipVertically();
				}
			} else {
				throw `Neither straight nor reversed edge "${tile.edges[tileSide]}" matches "${correctTile.edges[side]}".`
			}
		}
	}

	function imageAssemblyPlant() {
		// matches: [top, right, down, left]
		let image = [];
		let transform = []; 
		image.push([corners[0]]); // the top-left corner
		while(typeof corners[0].matches[0] !== "undefined" || typeof corners[0].matches[3] !== "undefined") {
			corners[0].rotate(1);
		}
		let currentRow = 0;
		let firstOfRow = corners[0];
		let current = corners[0];
		while(true) {
			while(current.matches[1]) {
				image[currentRow].push(findTile(current.matches[1]));
				transformTile(findTile(current.matches[1]), current);
				current = findTile(current.matches[1]);
			}
			if(typeof firstOfRow.matches[2] === "undefined") {
				break;
			}

			image.push([findTile(firstOfRow.matches[2])]);
			transformTile(findTile(firstOfRow.matches[2]), firstOfRow);
			firstOfRow = findTile(firstOfRow.matches[2]);
			currentRow++;
			current = firstOfRow;
		}

		let finalImage = [];
		const TILE_HEIGHT = corners[0].tile.length - 2;
		for(let i = 0; i < image.length * TILE_HEIGHT; i++) {
			finalImage[i] = "";
		}
		image.forEach(function(row, rIndex) {
			row.forEach(function(tile) {
				for(let i = 1; i < tile.tile.length - 1; i++) {
					finalImage[i + (rIndex * TILE_HEIGHT)] += tile.tile[i].slice(1, -1);
				}
			});
		});
		return finalImage;
	}

	let trueImage = imageAssemblyPlant();
	trueImage.forEach(line => displayText(line));

	function rotateImage(times) {
		for(let i = 0; i < times.length; i++) {
			let workingImage = [];
			for(let j = 0; j < trueImage.length; j++) {
				let workingRow = "";
				for(let k = 0; k < trueImage.length; k++) {
					workingRow += trueImage[k][trueImage.length - j - 1];
				}
				workingImage.push(workingRow);
			}
			trueImage = workingImage;
		}
	}

	function findMonster() {
		let monsters = []; // the (x, y) coords of the top-left corner of the monster
		for(let i = 0; i < trueImage.length - 2; i++) {
			for(let j = 0; j < trueImage[i].length - 19; j++) {
				let row1 = 	trueImage[i][j + 18] === "#";
				let row2 = 	trueImage[i + 1][j] === "#" && trueImage[i + 1][j + 5] === "#" &&
							trueImage[i + 1][j + 6] === "#" && trueImage[i + 1][j + 11] === "#" && 
							trueImage[i + 1][j + 12] === "#" && trueImage[i + 1][j + 17] === "#" &&
							trueImage[i + 1][j + 18] === "#" && trueImage[i + 1][j + 19] === "#";
				let row3 = 	trueImage[i + 2][j + 1] === "#" && trueImage[i + 2][j + 4] === "#" &&
							trueImage[i + 2][j + 7] === "#" && trueImage[i + 2][j + 10] === "#" &&
							trueImage[i + 2][j + 13] === "#" && trueImage[i + 2][j + 16] === "#";
				if(row1 && row2 && row3) {
					monsters.push([j, i]);
				}
			}
		}
		if(monsters.length !== 0) {
			return monsters;
		}
		return false;
	}

	for(let i = 0; i < 8; i++) {
		let finalMonsters = findMonster();
		if(finalMonsters) {
			// found it!
			let finalCount = trueImage.reduce(function(acc, value) {
				for(let i = 0; i < value.length; i++) {
					if(value[i] === "#") {
						acc++;
					}
				}
				return acc;
			}, 0);
			finalCount -= 15 * finalMonsters.length;
			console.log(finalCount); // part 2
			break;
		} else {
			if(i === 3) {
				trueImage = trueImage.map((row) => row.split("").reverse().join(""));
			}
			rotateImage(1);
		}
	}



}
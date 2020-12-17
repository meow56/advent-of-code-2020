"use strict";

function day17(text) {
	let regex = /[.#]+/gm;
	let entry = regex.exec(text);
	let cubes = [];
	while(entry) { // loop over the text with that regex
		cubes.push(entry[0]);
		entry = regex.exec(text);
	}

	let grid = [cubes.map(function(cube) {
		return cube.split("");
	})]; // z, y, x

	function life(x, y, z) {
		let aliveSum = 0;
		const directions = [
			[ // lower (z)
				//   left          mid         right
				[[-1, -1, -1], [0, -1, -1], [1, -1, -1]], // up
				[[-1,  0, -1], [0,  0, -1], [1,  0, -1]], // mid
				[[-1,  1, -1], [0,  1, -1], [1,  1, -1]]  // down
			],
			[ // mid (z)
				//   left          mid         right
				[[-1, -1,  0], [0, -1,  0], [1, -1,  0]], // up
				[[-1,  0,  0], [0,  0,  0], [1,  0,  0]], // mid
				[[-1,  1,  0], [0,  1,  0], [1,  1,  0]]  // down
			],
			[ // upper (z)
				//   left          mid         right
				[[-1, -1,  1], [0, -1,  1], [1, -1,  1]], // up
				[[-1,  0,  1], [0,  0,  1], [1,  0,  1]], // mid
				[[-1,  1,  1], [0,  1,  1], [1,  1,  1]]  // down
			]
		];

		try {
			directions.forEach(function(zDir, zInd) {
				zDir.forEach(function(yDir, yInd) {
					yDir.forEach(function(xDir, xInd) {
						if(xDir[0] !== 0 || xDir[1] !== 0 || xDir[2] !== 0) {
							let workX = x + xDir[0];
							let workY = y + xDir[1];
							let workZ = z + xDir[2];
							let interestCube;
							try {
								interestCube = grid[workZ][workY][workX][0];
								if(interestCube === "#") {
									aliveSum++;
								}
							} catch(e) {
								// If there is an error, that means we've escaped the bounds.
								// Since everything outside is empty, nothing needs to be added.
							}
							if(aliveSum > 3) {
								throw "Too many cells"; // Me when you can't return from forEach so you decide to throw an error instead of refactoring the code
							}
						}
					});
				});
			});
		} catch(e) {
			if(e === "Too many cells") {
				return false;
			} else {
				throw e; // up to the top!
			}
		}

		let currentCell;
		try {
			currentCell = grid[z][y][x];
		} catch(e) {
			currentCell = ".";
		}
		if(currentCell === "#") {
			return aliveSum === 2 || aliveSum === 3;
		} else {
			return aliveSum === 3;
		}
	}

	function step() {
		let workGrid = [];
		for(let z = -1; z <= grid.length; z++) {
			let workPlane = [];
			for(let y = -1; y <= grid[0].length; y++) { // they're all the same length, it should be ok
				let workLine = [];
				for(let x = -1; x <= grid[0][0].length; x++) { // ...right?
					// -1 and length to expand the grid by one every step.
					workLine.push(life(x, y, z) ? "#" : ".");
				}
				workPlane.push(workLine);
			}
			workGrid.push(workPlane);
		}

		grid = workGrid;
	}

	const iterations = 6;

	displayText("step 0");
	for(let z = 0; z < grid.length; z++) {
		displayText(`z-index ${z}`);
		for(let y = 0; y < grid[z].length; y++) {
			displayText(grid[z][y].join(""));
		}
	}
	displayText();

	for(let i = 0; i < iterations; i++) {
		console.time(`step ${i + 1}`);
		step();
		console.timeEnd(`step ${i + 1}`);

		displayText(`step ${i + 1}`);
		for(let z = 0; z < grid.length; z++) {
			displayText(`z-index ${z}`);
			for(let y = 0; y < grid[z].length; y++) {
				displayText(grid[z][y].join(""));
			}
		}
		displayText();
	}
	let flatGrid = grid.flat(3);
	let sum = flatGrid.reduce(function(acc, value) {
		if(value === "#") {
			return acc + 1;
		} else {
			return acc;
		}
	}, 0);
	console.log(sum);
}
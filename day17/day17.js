"use strict";

function day17(text) {
	let regex = /[.#]+/gm;
	let entry = regex.exec(text);
	let cubes = [];
	while(entry) { // loop over the text with that regex
		cubes.push(entry[0]);
		entry = regex.exec(text);
	}

	let grid = [[cubes.map(function(cube) {
		return cube.split("");
	})]]; // w, z, y, x

	let storeGrid = grid.slice();
	grid = grid[0]; // for part 1

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

	function life4(x, y, z, w) {
		let aliveSum = 0;
		const directions = [
			[ // hyper-low (w)
				[ // lower (z)
					//      left             mid             right
					[[-1, -1, -1, -1], [0, -1, -1, -1], [1, -1, -1, -1]], // up
					[[-1,  0, -1, -1], [0,  0, -1, -1], [1,  0, -1, -1]], // mid
					[[-1,  1, -1, -1], [0,  1, -1, -1], [1,  1, -1, -1]]  // down
				],
				[ // mid (z)
					//      left             mid             right
					[[-1, -1,  0, -1], [0, -1,  0, -1], [1, -1,  0, -1]], // up
					[[-1,  0,  0, -1], [0,  0,  0, -1], [1,  0,  0, -1]], // mid
					[[-1,  1,  0, -1], [0,  1,  0, -1], [1,  1,  0, -1]]  // down
				],
				[ // upper (z)
					//      left             mid             right
					[[-1, -1,  1, -1], [0, -1,  1, -1], [1, -1,  1, -1]], // up
					[[-1,  0,  1, -1], [0,  0,  1, -1], [1,  0,  1, -1]], // mid
					[[-1,  1,  1, -1], [0,  1,  1, -1], [1,  1,  1, -1]]  // down
				]
			],
			[ // hyper-mid (w)
				[ // lower (z)
					//      left             mid             right
					[[-1, -1, -1, 0], [0, -1, -1, 0], [1, -1, -1, 0]], // up
					[[-1,  0, -1, 0], [0,  0, -1, 0], [1,  0, -1, 0]], // mid
					[[-1,  1, -1, 0], [0,  1, -1, 0], [1,  1, -1, 0]]  // down
				],
				[ // mid (z)
					//      left             mid             right
					[[-1, -1,  0, 0], [0, -1,  0, 0], [1, -1,  0, 0]], // up
					[[-1,  0,  0, 0], [0,  0,  0, 0], [1,  0,  0, 0]], // mid
					[[-1,  1,  0, 0], [0,  1,  0, 0], [1,  1,  0, 0]]  // down
				],
				[ // upper (z)
					//      left             mid             right
					[[-1, -1,  1, 0], [0, -1,  1, 0], [1, -1,  1, 0]], // up
					[[-1,  0,  1, 0], [0,  0,  1, 0], [1,  0,  1, 0]], // mid
					[[-1,  1,  1, 0], [0,  1,  1, 0], [1,  1,  1, 0]]  // down
				]
			],
			[ // hyper-high (w)
				[ // lower (z)
					//      left             mid             right
					[[-1, -1, -1, 1], [0, -1, -1, 1], [1, -1, -1, 1]], // up
					[[-1,  0, -1, 1], [0,  0, -1, 1], [1,  0, -1, 1]], // mid
					[[-1,  1, -1, 1], [0,  1, -1, 1], [1,  1, -1, 1]]  // down
				],
				[ // mid (z)
					//      left             mid             right
					[[-1, -1,  0, 1], [0, -1,  0, 1], [1, -1,  0, 1]], // up
					[[-1,  0,  0, 1], [0,  0,  0, 1], [1,  0,  0, 1]], // mid
					[[-1,  1,  0, 1], [0,  1,  0, 1], [1,  1,  0, 1]]  // down
				],
				[ // upper (z)
					//      left             mid             right
					[[-1, -1,  1, 1], [0, -1,  1, 1], [1, -1,  1, 1]], // up
					[[-1,  0,  1, 1], [0,  0,  1, 1], [1,  0,  1, 1]], // mid
					[[-1,  1,  1, 1], [0,  1,  1, 1], [1,  1,  1, 1]]  // down
				]
			]
		];

		try {
			directions.forEach(function(wDir, wInd) {
				wDir.forEach(function(zDir, zInd) {
					zDir.forEach(function(yDir, yInd) {
						yDir.forEach(function(xDir, xInd) {
							if(xDir[0] !== 0 || xDir[1] !== 0 || xDir[2] !== 0 || xDir[3] !== 0) {
								let workX = x + xDir[0];
								let workY = y + xDir[1];
								let workZ = z + xDir[2];
								let workW = w + xDir[3];
								let interestCube;
								try {
									interestCube = grid[workW][workZ][workY][workX][0];
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
			currentCell = grid[w][z][y][x];
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

	function step4() {
		let workHypergrid = [];
		for(let w = -1; w <= grid.length; w++) {
			let workGrid = [];
			for(let z = -1; z <= grid[0].length; z++) {
				let workPlane = [];
				for(let y = -1; y <= grid[0][0].length; y++) { // they're all the same length, it should be ok
					let workLine = [];
					for(let x = -1; x <= grid[0][0][0].length; x++) { // ...right?
						// -1 and length to expand the grid by one every step.
						workLine.push(life4(x, y, z, w) ? "#" : ".");
					}
					workPlane.push(workLine);
				}
				workGrid.push(workPlane);
			}
			workHypergrid.push(workGrid);
		}

		grid = workHypergrid;
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
	console.log(sum); // part 1

	grid = storeGrid.slice();

	displayText("step 0");
	for(let w = 0; w < grid.length; w++) {
		for(let z = 0; z < grid[w].length; z++) {
			displayText(`z-index ${z}, w-index ${w}`);
			for(let y = 0; y < grid[w][z].length; y++) {
				displayText(grid[w][z][y].join(""));
			}
		}
	}
	displayText();

	for(let i = 0; i < iterations; i++) {
		console.time(`step4 ${i + 1}`);
		step4();
		console.timeEnd(`step4 ${i + 1}`);

		displayText(`step4 ${i + 1}`);
		for(let w = 0; w < grid.length; w++) {
			for(let z = 0; z < grid[w].length; z++) {
				displayText(`z-index ${z}, w-index ${w}`);
				for(let y = 0; y < grid[w][z].length; y++) {
					displayText(grid[w][z][y].join(""));
				}
			}
		}
		displayText();
	}
	let flatGrid4 = grid.flat(4);
	let sum4 = flatGrid4.reduce(function(acc, value) {
		if(value === "#") {
			return acc + 1;
		} else {
			return acc;
		}
	}, 0);
	console.log(sum4); // part 2
}
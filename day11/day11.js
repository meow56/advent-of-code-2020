"use strict";

function day11(text) {
	let regex = /[L.#]+/gm;
	let entry = regex.exec(text);
	let seats = [];
	while(entry) { // loop over the text with that regex
		let row = entry[0];
		let rowSeats = [];
		for(let i = 0; i < row.length; i++) {
			rowSeats.push(row[i]);
		}
		seats.push(rowSeats);
		entry = regex.exec(text);
	}

	let oldSeats = seats.slice();

	while(true) {
		let newSeats = [];
		let isSame = true;
		let totalOccupied = 0;
		seats.forEach(function(row, rowIndex) {
			let newRow = [];
			row.forEach(function(seat, seatIndex) {
				let upLeft, upMid, upRight, midLeft, midRight, downLeft, downMid, downRight;
				if(rowIndex === 0) {
					upLeft = ".";
					upMid = ".";
					upRight = ".";
					if(seatIndex === 0) {
						midLeft = ".";
						downLeft = ".";
						midRight = seats[rowIndex][seatIndex + 1];
						downMid = seats[rowIndex + 1][seatIndex];
						downRight = seats[rowIndex + 1][seatIndex + 1];
					} else if(seatIndex === row.length - 1) {
						midRight = ".";
						downRight = ".";
						midLeft = seats[rowIndex][seatIndex - 1];
						downLeft = seats[rowIndex + 1][seatIndex - 1];
						downMid = seats[rowIndex + 1][seatIndex];
					} else {
						midLeft = seats[rowIndex][seatIndex - 1];
						midRight = seats[rowIndex][seatIndex + 1];
						downLeft = seats[rowIndex + 1][seatIndex - 1];
						downMid = seats[rowIndex + 1][seatIndex];
						downRight = seats[rowIndex + 1][seatIndex + 1];
					}
				} else if(rowIndex === seats.length - 1) {
					downLeft = ".";
					downMid = ".";
					downRight = ".";
					if(seatIndex === 0) {
						midLeft = ".";
						upLeft = ".";
						midRight = seats[rowIndex][seatIndex + 1];
						upMid = seats[rowIndex - 1][seatIndex];
						upRight = seats[rowIndex - 1][seatIndex + 1];
					} else if(seatIndex === row.length - 1) {
						midRight = ".";
						upRight = ".";
						midLeft = seats[rowIndex][seatIndex - 1];
						upLeft = seats[rowIndex - 1][seatIndex - 1];
						upMid = seats[rowIndex - 1][seatIndex];
					} else {
						upLeft = seats[rowIndex - 1][seatIndex - 1];
						upMid = seats[rowIndex - 1][seatIndex];
						upRight = seats[rowIndex - 1][seatIndex + 1];
						midLeft = seats[rowIndex][seatIndex - 1];
						midRight = seats[rowIndex][seatIndex + 1];
					}
				} else {
					upLeft = seats[rowIndex - 1][seatIndex - 1];
					upMid = seats[rowIndex - 1][seatIndex];
					upRight = seats[rowIndex - 1][seatIndex + 1];
					midLeft = seats[rowIndex][seatIndex - 1];
					midRight = seats[rowIndex][seatIndex + 1];
					downLeft = seats[rowIndex + 1][seatIndex - 1];
					downMid = seats[rowIndex + 1][seatIndex];
					downRight = seats[rowIndex + 1][seatIndex + 1];
				}

				let sum = 0;
				sum += upLeft === "#" ? 1 : 0;
				sum += upMid === "#" ? 1 : 0;
				sum += upRight === "#" ? 1 : 0;
				sum += midLeft === "#" ? 1 : 0;
				sum += midRight === "#" ? 1 : 0;
				sum += downLeft === "#" ? 1 : 0;
				sum += downMid === "#" ? 1 : 0;
				sum += downRight === "#" ? 1 : 0;
				switch(seat) {
					case "L":
						if(sum === 0) {
							newRow.push("#");
						} else {
							newRow.push("L");
						}
						break;
					case "#":
						if(sum >= 4) {
							newRow.push("L");
						} else {
							newRow.push("#");
						}
						break;
					case ".":
						newRow.push(".");
						break;
					default:
						throw "Not L, #, .";
				}
				if(isSame) {
					if(newRow[seatIndex] !== seat) {
						isSame = false;
					}
					if(newRow[seatIndex] === "#") {
						totalOccupied++;
					}
				}
			});
			newSeats.push(newRow);
		});

		if(isSame) {
			console.log(totalOccupied);
			break;
		}
		seats = newSeats;
	}

	seats = oldSeats.slice();

	let runs = 0;
	while(true) {
		if(devMode) {
			displayText("");
			displayText("Iteration " + ++runs);
		}
		let newSeats = [];
		let isSame = true;
		let totalOccupied = 0;
		seats.forEach(function(row, rowIndex) {
			let newRow = [];
			row.forEach(function(seat, seatIndex) {
				let directions = [
					// left      mid     right
					[[-1, -1], [0, -1], [1, -1]], // up
					[[-1,  0], [0,  0], [1,  0]], // mid
					[[-1,  1], [0,  1], [1,  1]]  // down
				];
				let sum = 0;
				directions.forEach(function(vertDir, vertIndex) {
					vertDir.forEach(function(horizDir, horizIndex) {
						if(horizDir[0] !== 0 || horizDir[1] !== 0) {
							let workingRowIndex = rowIndex;
							let workingSeatIndex = seatIndex;
							let lookingSeat;
							try {
								do {
									workingRowIndex += horizDir[1];
									workingSeatIndex += horizDir[0];
									lookingSeat = seats[workingRowIndex][workingSeatIndex];
									lookingSeat[0]; // This is just to check the bounds.
								} while (lookingSeat === ".");
								if(lookingSeat === "#") {
									sum++;
								}
							} catch (e) {
								// The only way an error occurs is if we exceed the bounds.
								// So just do nothing, since the person can't see a seat.
							}
						}
					});
				});

				switch(seat) {
					case "L":
						if(sum === 0) {
							newRow.push("#");
						} else {
							newRow.push("L");
						}
						break;
					case "#":
						if(sum >= 5) {
							newRow.push("L");
						} else {
							newRow.push("#");
						}
						break;
					case ".":
						newRow.push(".");
						break;
					default:
						throw "Not L, #, .";
				}
				if(isSame) {
					if(newRow[seatIndex] !== seat) {
						isSame = false;
					}
					if(newRow[seatIndex] === "#") {
						totalOccupied++;
					}
				}
			});
			newSeats.push(newRow);
		});

		if(devMode) {
			for(let i = 0; i < newSeats.length; i++) {
				displayText(newSeats[i].join(""));
			}
		}

		if(isSame) {
			console.log(totalOccupied);
			break;
		}
		seats = newSeats;
	}
}
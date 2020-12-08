"use strict";

function day8(text) {
	let regex = /(acc|jmp|nop) (\+[0-9]+|-[0-9]+)/gm;
	let entry = regex.exec(text);
	let instructions = [];
	while(entry) { // loop over the text with that regex
		instructions.push(entry);
		entry = regex.exec(text);
	}

	let instPointer = 0;
	let accumulator = 0;
	let pastVisits = [];
	let dontStop = true;

	while(dontStop) {
		pastVisits.forEach(function(visit) {
			if(instPointer === visit) { 
				console.log(accumulator); 
				dontStop = false; 
			}
		});
		pastVisits.push(instPointer);

		let curInst = instructions[instPointer][1];
		let curNum = Number(instructions[instPointer][2]);

		switch(curInst) {
			case "acc":
				accumulator += curNum;
			case "nop":
				instPointer++;
				break;
			case "jmp":
				instPointer += curNum;
		}

	}
}
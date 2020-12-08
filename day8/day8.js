"use strict";

function day8(text) {
	let regex = /(acc|jmp|nop) (\+[0-9]+|-[0-9]+)/gm;
	let entry = regex.exec(text);
	let instructions = [];
	while(entry) { // loop over the text with that regex
		instructions.push(entry);
		entry = regex.exec(text);
	}

	function runCode(code) {
		let instPointer = 0;
		let accumulator = 0;
		let pastVisits = [];
		let dontStop = true;

		while(dontStop) {
			pastVisits.forEach(function(visit) {
				if(instPointer === visit) { 
					console.log("Infinite loop occured, accumulator: " + accumulator); 
					dontStop = false;
				}
			});
			pastVisits.push(instPointer);

			if(instPointer >= code.length) {
				console.log("Program terminated, accumulator: " + accumulator);
				dontStop = false;
				return "done";
			}
			let curInst = code[instPointer][1];
			let curNum = Number(code[instPointer][2]);

			switch(curInst) {
				case "acc":
					accumulator += curNum;
				case "nop":
					instPointer++;
					break;
				case "jmp":
					instPointer += curNum;
					break;
			}
		}
	}
	runCode(instructions);
	instructions.forEach(function(inst, index) { // good ol' brute force saving the day
		if(inst[1] === "jmp") {
			let instCopy = instructions.slice();
			instCopy[index] = [inst[0], "nop", inst[2]];
			let done = runCode(instCopy);
			if(done === "done") {
				throw "Screw this, I'm outta here!";
			}
		} else if(inst[1] === "nop") {
			let instCopy = instructions.slice();
			instCopy[index] = [inst[0], "jmp", inst[2]];
			let done = runCode(instCopy);
			if(done === "done") {
				throw "Screw this, I'm outta here!";
			}
		}
	}) 
}
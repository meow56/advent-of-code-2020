"use strict";

function day14(text) {
	let regex = /(mem\[([0-9]+)\]|mask) = ([0X1]{36}|[0-9]+\b)/gm;
	let entry = regex.exec(text);
	let instructions = [];
	while(entry) { // loop over the text with that regex
		if(entry[2]) {
			instructions.push([+entry[2], +entry[3]]);
		} else {
			instructions.push([entry[1], entry[3]]);
		}
		entry = regex.exec(text);
	}

	let mem = [];
	let curMask;

	instructions.forEach(function(inst) {
		let type = inst[0];
		if(type === "mask") {
			curMask = inst[1];
		} else {
			let bin = decimalToBinary(inst[1]);
			bin = applyBitmask(bin, curMask);
			mem[type] = binaryToDecimal(bin);
		}
	});

	let finalSum = 0;
	for(let i = 0; i < mem.length; i++) {
		if(typeof mem[i] !== "undefined") {
			finalSum += mem[i];
		}
	}
	console.log(finalSum); // part 1

	let trueMem = [];

	instructions.forEach(function(inst) {
		let type = inst[0];
		if(type === "mask") {
			curMask = inst[1];
		} else {
			let bin = decimalToBinary(inst[0]);
			bin = applyBitmask(bin, curMask, true);
			bin.forEach(address => trueMem[binaryToDecimal(address)] = inst[1]);
		}
	});

	let finalSum2 = 0;
	let defined = Object.keys(trueMem);
	defined.forEach(index => finalSum2 += trueMem[index]);
	console.log(finalSum2); // part 1

	function decimalToBinary(num) {
		/*
			Converts an integer into a 36-length binary string.
		*/
		let result = "";
		let power = 0;
		if(num !== Math.floor(num) || num <= 0) {
			throw "Input " + num + " is not a positive integer.";
		}
		while(2 ** power <= num) {
			power++;
		}
		while(power !== -1) {
			if(2 ** power <= num) {
				result = result + "1";
				num -= 2 ** power;
			} else {
				result = result + "0";
			}
			power--;
		}
		while(result.length < 36) {
			result = "0" + result;
		}
		return result;
	}

	function binaryToDecimal(number, zero = "0", one = "1") {
		// number: string with the binary representation of the number
		// zero: character that represents 0
		// one: character that represents 1
		let sum = 0;
		for(let i = 0; i < number.length; i++) {
			let power = 2 ** (number.length - 1 - i);
			if(number[i] === one) {
				sum += power;
			} else if(number[i] !== zero) {
				throw "Character in string is not zero or one";
			}
		}
		return sum;
	}

	function applyBitmask(num, mask, part2 = false, index = 0) {
		if(num.length !== mask.length) {
			throw "Number and mask are not the same length.";
		}
		if(!part2) {
			let result = num;
			for(let i = 0; i < mask.length; i++) {
				if(mask[i] === "1") {
					result = result.slice(0, i) + "1" + result.slice(i + 1);
				} else if(mask[i] === "0") {
					result = result.slice(0, i) + "0" + result.slice(i + 1);
				}
			}
			return result;
		} else {
			if(devMode) {
				console.log("Number " + num + " with mask " + mask + ". Current index: " + index);
			}
			let working = num;
			let result = [];
			for(let i = index; i < mask.length; i++) {
				if(mask[i] === "1") {
					working = working.slice(0, i) + "1" + working.slice(i + 1);
				} else if(mask[i] === "X") {
					let answer0 = applyBitmask(working.slice(0, i) + "0" + working.slice(i + 1), mask, true, i + 1);
					let answer1 = applyBitmask(working.slice(0, i) + "1" + working.slice(i + 1), mask, true, i + 1);
					answer0.forEach(res => result.push(res));
					answer1.forEach(res => result.push(res));
				}
			}
			if(result.length === 0) {
				result = [working];
			}
			return result;
		}
	}
}
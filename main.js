"use strict";

const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
	const input = this.files[0];
	input.text().then(text => detDay(text));

	function detDay(text) {
		const dayInput = document.getElementById("dayNum");
		const dayNum = dayInput.value;
		switch(dayNum) {
			case "1":
				day1(text);
				break;
			case "2":
				day2(text);
				break;
			case "3":
				day3(text);
				break;
			case "4":
				day4(text);
				break;
			case "5":
				day5(text);
				break;
			case "6":
				day6(text);
				break;
			case "7":
				day7(text);
				break;
			case "8":
				day8(text);
				break;
			case "9":
				day9(text);
				break;
			case "10":
				day10(text);
				break;
			case "11":
				day11(text);
				break;
			case "12":
				day12(text);
				break;
			case "13":
				day13(text);
				break;
			case "14":
				day14(text);
				break;
			case "15":
				day15(text);
				break;
			case "16":
				day16(text);
				break;
			case "17":
				day17(text);
				break;
			case "18":
				day18(text);
				break;
			case "19":
				day19(text);
				break;
			case "20":
				day20(text);
				break;
			case "21":
				day21(text);
				break;
			case "22":
				day22(text);
				break;
			case "23":
				day23(text);
				break;
			case "24":
				day24(text);
				break;
			case "25":
				day25(text);
				break;
		}
	}
}

function displayText(text) {
	const displayDiv = document.getElementById("displayDiv");
	const displayP = document.createElement("SPAN");
	displayP.textContent = text;
	displayDiv.appendChild(displayP);
	displayDiv.appendChild(document.createElement("BR"));
}

function clearText() {
	const displayDiv = document.getElementById("displayDiv");
	while(displayDiv.firstChild !== null) {
		displayDiv.removeChild(displayDiv.firstChild);
	}
}


const devMode = false;
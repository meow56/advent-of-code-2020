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
		}
	}
}
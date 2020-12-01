"use strict";

const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
  const input = this.files[0];
  input.text().then(text => doStuff(text));

  function doStuff(text) {
  	let regex = /\b\d+\b/g;
  	let entry = regex.exec(text);
  	let numbers = [];
  	while(entry) {
  		numbers.push(entry);
  		entry = regex.exec(text);
  		if(numbers.length > 1000) {
  			throw "loop too long";
  		}
  	}
  	console.log(numbers);
  	for(let i = 0; i < numbers.length; i++) {
  		for(let j = i + 1; j < numbers.length; j++) {
  			if(Number(numbers[i][0]) + Number(numbers[j][0]) === 2020) {
  				console.log(Number(numbers[i][0]) * Number(numbers[j][0]));
  			}
  		}
  	}
  }
}


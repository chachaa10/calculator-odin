const historyDisplay = document.querySelector(".history");
const resultDisplay = document.querySelector(".result");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const signButton = document.querySelector(".sign");
const copyright = document.querySelector(".copyright");

let currentInput = "0";
let previousInput = "";
let operator = "";

function updateDisplay() {
	resultDisplay.value = currentInput;
	historyDisplay.value =
		previousInput + (operator ? " " + operator + " " : "");
}

function clear() {
	currentInput = "0";
	previousInput = "";
	operator = "";
	updateDisplay();
}

function deleteLast() {
	currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
	updateDisplay();
}

function appendNumber(number) {
	if (currentInput === "0") {
		currentInput = number;
	} else {
		currentInput += number;
	}
	updateDisplay();
}

function appendDecimal() {
	if (!currentInput.includes(".")) {
		currentInput += ".";
	}
	updateDisplay();
}

function setOperator(op) {
	if (previousInput && currentInput) {
		calculate();
	}
	operator = op;
	previousInput = currentInput;
	currentInput = "0";
	updateDisplay();
}

function calculate() {
	let result = 0;
	const prev = parseFloat(previousInput);
	const curr = parseFloat(currentInput);

	if (isNaN(prev) || isNaN(curr)) return;

	switch (operator) {
		case "+":
			result = prev + curr;
			break;
		case "-":
			result = prev - curr;
			break;
		case "x":
			result = prev * curr;
			break;
		case "÷":
			if (curr === 0) {
				result = "Error";
			} else {
				result = prev / curr;
			}
			break;
		default:
			return;
	}

	currentInput = result.toString();
	previousInput = "";
	operator = "";
	updateDisplay();
}

function changeSign() {
	if (currentInput !== "0") {
		currentInput = (parseFloat(currentInput) * -1).toString();
		updateDisplay();
	}
}

function displayCopyright() {
	const date = new Date().getFullYear();
	copyright.textContent = `Made by Chalex ${date}`;
}

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		if (button.textContent === ".") {
			appendDecimal();
		} else {
			appendNumber(button.textContent);
		}
	});
});

operatorButtons.forEach((button) => {
	button.addEventListener("click", () => {
		setOperator(button.textContent);
	});
});

equalButton.addEventListener("click", calculate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteLast);
signButton.addEventListener("click", changeSign);

updateDisplay(); // Initial display update
displayCopyright();

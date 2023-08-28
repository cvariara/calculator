let firstNum;
let operator;
let secondNum;
let displayValue = "";

const userInput = document.querySelector(".user-input");
const result = document.querySelector(".result");
const allButtons = document.querySelector(".buttons");
const buttons = document.querySelectorAll("button");

const allClear = document.querySelector(".all-clear");
const clear = document.querySelector(".clear");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => handleButtonClick(btn));
});

function handleButtonClick(btn) {
  const btnText = btn.textContent;
  const btnClass = btn.className;

  userInput.textContent += btnText;
  if (btnClass === "numbers" || btnClass === "decimal") {
    displayValue += btnText;
  }
  if (btnClass === "operators") {
    handleOperatorClick(btnText);
  }
  if (btnClass === "equals" && firstNum) {
    handleEqualsClick();
  }
  if (btnClass === "all-clear") {
    handleAllClearClick();
  }
  if (btnClass === "clear") {
    displayValue = displayValue.substring(0, displayValue.length - 1);
    userInput.textContent = displayValue;
  }
  console.log("displayValue: " + displayValue);
  console.log("firstNum: " + firstNum);
  console.log("secondNum: " + secondNum);
}

function handleOperatorClick(operatorText) {
  firstNum = parseFloat(displayValue);
  operator = operatorText;
  displayValue = "";
}

function handleEqualsClick() {
  secondNum = parseFloat(displayValue);
  result.textContent = operate(operator, firstNum, secondNum);
}

function handleAllClearClick() {
  result.textContent = "";
  userInput.textContent = "0";
  displayValue = "";
  firstNum = undefined;
  secondNum = undefined;
  operator = undefined;
}

function handleClearClick() {

}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      break;
  }
}

let firstNum;
let operator;
let secondNum;
let displayValue = "";

const userInput = document.querySelector(".user-input");
const result = document.querySelector(".result");
const buttons = document.querySelectorAll("button");

const allClear = document.querySelector(".all-clear");
const clear = document.querySelector(".clear");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => handleButtonClick(btn));
});

function handleButtonClick(btn) {
  const btnText = btn.textContent;
  const btnClass = btn.className;

  if (userInput.textContent === "0") {
    userInput.textContent = "";
  }

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
    handleClearClick();
  }
}

function handleOperatorClick(operatorText) {
  firstNum = parseFloat(displayValue);
  operator = operatorText;
  displayValue = "";
}

function handleEqualsClick() {
  secondNum = parseFloat(displayValue);
  const calcResult = operate(operator, firstNum, secondNum);
  console.log(calcResult)
  if (Number.isInteger(calcResult) || typeof calcResult === 'string') {
    result.textContent = calcResult;
  } else {
    result.textContent = calcResult.toFixed(2);
  }
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
  if (result.textContent !== "") {
    handleAllClearClick();
    return;
  }
  if (displayValue.length > 0) {
    displayValue = displayValue.slice(0, -1);
    userInput.textContent = displayValue;
  } else {
    userInput.textContent = "0";
  }
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
  if (num2 === 0) return 'Infinity';
  return num1 / num2;
}

function remainder(num1, num2) {
  return num1 % num2;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
    case "%":
      return remainder(num1, num2);
    default:
      break;
  }
}

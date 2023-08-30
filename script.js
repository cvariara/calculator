let firstNum;
let operator;
let secondNum;
let displayValue = "";
let intermediateResult = null;
// good

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

  // if result is infinity, don't do calculations
  // unless clear or all clear button is clicked
  if (result.textContent === "Infinity") {
    if (btnClass === "clear" || btnClass === "all-clear") {
      handleAllClearClick();
    }
    return;
  }

  if (userInput.textContent.includes("=")) {
    if (!isNaN(btnText)) { 
      handleAllClearClick();
    }
    userInput.textContent = result.textContent;
    result.textContent = "";
  }

  // if you hit equals too early
  if (btnClass === "equals" && !firstNum) {
    userInput.textContent = "0";
    return;
  }

  userInput.textContent += btnText;
  
  if (btnClass === "numbers" || btnClass === "decimal") {
    displayValue += btnText;
  }
  if (btnClass === "operators") {
    if (userInput.textContent === "") {
      handleAllClearClick();
      return;
    }
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
  // If two operators are clicked back to back, nothing happens
  if (isNaN(userInput.textContent.charAt(userInput.textContent.length - 2))) {
    userInput.textContent = userInput.textContent.slice(0, -1);
    return;
  }

  // If an intermediate result already exists, use that as first number
  if (intermediateResult !== null) {
    firstNum = intermediateResult;
    intermediateResult = null;
  } else {
    firstNum = parseFloat(displayValue);
  }

  if (operator !== undefined) {
    const currentNum = parseFloat(displayValue);
    console.log(`firstNum: ${firstNum}`)
    intermediateResult = operate(operator, firstNum, currentNum);
    console.log(`intRes: ${intermediateResult}`)

    if (Number.isInteger(intermediateResult) || typeof intermediateResult === 'string') {
      result.textContent = intermediateResult;
    } else {
      result.textContent = intermediateResult.toFixed(2);
    }

    console.log(`displayValue: ${displayValue}`)
    displayValue = intermediateResult.toString();
  }

  operator = operatorText;
  displayValue = "";
}

function handleEqualsClick() {
  if (intermediateResult === null) {
    intermediateResult = firstNum;
  }

  if (operator !== undefined) {
    const currentNum = parseFloat(displayValue);
    intermediateResult = operate(operator, intermediateResult, currentNum);
  
    if (Number.isInteger(intermediateResult) || typeof intermediateResult === 'string') {
      result.textContent = intermediateResult;
    } else {
      result.textContent = intermediateResult.toFixed(2);
    }
  }

  displayValue = "";
  firstNum = undefined;
  secondNum = undefined;
  operator = undefined;
}

function handleAllClearClick() {
  result.textContent = "";
  userInput.textContent = "0";
  displayValue = "";
  firstNum = undefined;
  secondNum = undefined;
  operator = undefined;
  intermediateResult = null;
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

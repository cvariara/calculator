let firstNum;
let operator;
let secondNum;
let displayValue = '';

const userInput = document.querySelector('.user-input');
const result = document.querySelector('.result');
const allButtons = document.querySelector('.buttons');
const buttons = document.querySelectorAll('button');

const allClear = document.querySelector('.all-clear');
const clear = document.querySelector('.clear');

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    // console.log(btn.textContent);
    userInput.textContent += btn.textContent;
    if (btn.className === 'numbers' || btn.className === 'decimal') {
      displayValue += btn.textContent.toString()
    }
    if (btn.className === 'operators') {
      firstNum = parseFloat(displayValue);
      operator = btn.textContent;
      displayValue = '';
    }
    if (btn.className === 'equals' && firstNum) {
      secondNum = parseFloat(displayValue);
      // console.log(operate(operator, firstNum, secondNum));
      result.textContent = operate(operator, firstNum, secondNum);
    }
    if (btn.className === 'all-clear') {
      result.textContent = '';
      userInput.textContent = '';
      displayValue = '';
      firstNum = undefined;
      secondNum = undefined;
      operator = undefined;
    }
    console.log('displayValue: ' + displayValue)
    console.log('firstNum: ' + firstNum)
    console.log('secondNum: ' + secondNum)
  })
})



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
  switch(operator) {
    case '+':
      return add(num1, num2);
      break;
    case '-':
      return subtract(num1, num2);
      break;
    case 'x':
      return multiply(num1, num2);
      break;
    case '/':
      return divide(num1, num2);
      break;
    default:
      break;
  }
}
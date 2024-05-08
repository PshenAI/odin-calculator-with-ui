function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(firstNum, secondNum, operator) {
    switch(operator.textContent) {
        case '+':
            return add(firstNum, secondNum);
        case '-':
            return subtract(firstNum, secondNum);
        case '*':
            return multiply(firstNum, secondNum);
        case '/':
            return divide(firstNum, secondNum);
    }
}

function clearInput() {
    displayInput = '0';
    firstNum = 0;
    secondNum = 0;
    lastOperation = '-';

    if(operator !== undefined) {
        operator.classList.remove('active');
    }
    operator = undefined;

    const display = document.querySelector('.display');
    display.textContent = displayInput;
}

function removeLastDigit() {
    displayInput = displayInput.slice(0, displayInput.length - 1);

    const display = document.querySelector('.display');
    display.textContent = displayInput;
}

function roundNumber(num) {
    if(num % 1 !== 0) {
        return num.toFixed(2);
    } else {
        return num;
    }
}

function validateAction(event) {
    if(event.target.textContent === '=' && (firstNum === 0 || operator === undefined)) {
        alert('Invalid input! Try again.');
        clearInput();
        return false;
    }

    return true;
}

function validateInput(event) {
    if(event.target.textContent === '.' && displayInput.includes('.')) {
        alert(`Invalid input! Several dots aren't allowed.`);
        return false;
    }

    return true;
}

function action(event) {
    const display = document.querySelector('.display');

    if(operator !== undefined && operator !== '') {
        operator.classList.remove('active');
    }

    if(clearDisplay) {
        displayInput = '0';
    }

    if(event.target.classList.contains('action')) {
        let actionValidation = validateAction(event);
        if(lastOperation === 'action' && actionValidation) {
            secondNum = Number(displayInput);

            firstNum = roundNumber(operate(firstNum, secondNum, operator));
            operator = event.target;
            operator.classList.add('active');
            displayInput = firstNum;
            secondNum = 0;

            if(operator.textContent === '=') {
                lastOperation = 'input';
            } else {
                lastOperation = 'action';
                clearDisplay = true;
            }

        } else if(actionValidation) {
            operator = event.target;
            operator.classList.add('active');
            firstNum = Number(displayInput);

            displayInput = '';
            lastOperation = 'action';
        }
    } else {
        if(validateInput(event)) {
            displayInput === '0' ? displayInput = event.target.textContent : displayInput += event.target.textContent;
        }
        clearDisplay = false;
    }

    display.textContent = displayInput;
}

let firstNum = 0;
let secondNum = 0;
let operator;
let lastOperation = '-';
let clearDisplay = false;

let displayInput = '';

const calcButtons = document.querySelectorAll('.calc-button');
calcButtons.forEach(a => a.addEventListener('click', action));

const clearButton = document.querySelector('.clear-button');
clearButton.addEventListener('click', clearInput);

const backspaceButton = document.querySelector('.backspace-button');
backspaceButton.addEventListener('click', removeLastDigit);


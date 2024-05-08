function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function sum(arr) {
    return arr.reduce((total, current) => total + current, 0);
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function power(a, b) {
    return Math.pow(a, b);
}

function factorial(fact) {
    if(fact === 0) return 1;

    let result = fact;

    for (let i = fact; i > 1; i--) {
        result *= i - 1;
    }

    return result;
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

function action(event) {
    const display = document.querySelector('.display');

    if(operator !== undefined && operator !== '') {
        operator.classList.remove('active');
    }

    if(clearDisplay) {
        displayInput = '0';
    }

    if(event.target.classList.contains('action')) {
        if(lastOperation === 'action') {
            secondNum = Number(displayInput);

            firstNum = operate(firstNum, secondNum, operator);
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

        } else {
            operator = event.target;
            operator.classList.add('active');
            firstNum = Number(displayInput);

            displayInput = '';
            lastOperation = 'action';
        }
    } else {
        displayInput === '0' ? displayInput = event.target.textContent : displayInput += event.target.textContent;
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


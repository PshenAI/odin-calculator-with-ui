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

    operator.classList.remove('active');
    operator = '';

    const display = document.querySelector('.display');
    display.textContent = displayInput;
}

function action(event) {
    const display = document.querySelector('.display');

    if(event.target.classList.contains('action')){
        if(event.target.textContent === '=') {
            secondNum = Number(displayInput);
            firstNum = operate(firstNum, secondNum, operator);
            secondNum = 0;
            displayInput = firstNum;
        } else {
            let number = Number(displayInput);
            firstNum === 0 ? firstNum =  number: secondNum = number;
            if(secondNum !== 0){
                firstNum = operate(firstNum, secondNum, operator);
                secondNum = 0;
                displayInput = firstNum;
            } else {
                displayInput = '';
            }
            operator = event.target;
            event.target.classList.add('active');
        }
        lastOperation = 'action';
    } else {
        if(lastOperation === 'action' || lastOperation === '-'){
            displayInput = `${event.target.textContent}`;
            lastOperation = 'input';
            if(operator !== undefined) {
                operator.classList.remove('active');
            }
        } else {
            displayInput += `${event.target.textContent}`;
            lastOperation = 'input';
        }
    }

    display.textContent = displayInput;
}

let firstNum = 0;
let secondNum = 0;
let operator;
let lastOperation = '-';

let displayInput = '';

const calcButtons = document.querySelectorAll('.calc-button');

calcButtons.forEach(a => a.addEventListener('click', action));

const clearButton = document.querySelector('.clear-button');
clearButton.addEventListener('click', clearInput);


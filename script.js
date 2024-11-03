const calculator = document.querySelector('.calculator');

const flipButton = document.querySelector('#flip');

function flipCalculator() {
    const flipClass = flipButton.classList;
    const state = calculator.classList;
    const isFlipped = state.contains('calculator-flip');

    if (isFlipped) {
        state.remove('calculator-flip');
        flipClass.add('flip-tooltip');
        return;
    };

    state.add('calculator-flip');
    flipClass.remove('flip-tooltip');
};

flipButton.addEventListener('click', () => {
        flipCalculator()
    });

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const isNumber = button.classList.contains('number');
            const isOperator = button.classList.contains('operator');
            const isModifier = button.classList.contains('modifier');
            const isAction = button.classList.contains('action');
            const isEvaluate = button.classList.contains('evaluate');
            
            if (isNumber) collectNumbers(button.id);
            if (isOperator) setOperator(button.id);
            if (isModifier) applyModifier(button.id);
            if (isAction) action(button.id);
            if (isEvaluate) evaluate();
        });
    });

const num = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
};

let


function collectNumbers (id) {
    if (operator == undefined) return firstOperand.push(num[id]);
    if (operator !== undefined) return secondOperand.push(num[id]);
};

function setOperator(id) {operator = id};

function applyModifier(id) {
    if (id == 'percent') {
        console.log('make percentage')
    };

    if (id == 'plusmn') {
        if (operator == undefined) return firstOperand.unshift('-');
        if (operator !== undefined) return secondOperand.unshift('-');
        return;
    };
}

function action(id) {
    if (id == 'delete') {
        if (operator == undefined) return firstOperand.pop();
        if (operator !== undefined) return secondOperand.pop();
        return;
    };

    if (id == 'clear') {
        firstOperand = [];
        operator = null;
        secondOperand = [];
        return;
    };
};

const screen = document.querySelector('screen')

function printMath() {
    const newSpan = document.createElement('span');

    if (screen.lastChild) screen.removeChild(screen.lastChild);

    newSpan.textContent = convertOperandToString(firstOperand)
}

function convertOperandToString(arr) {
    return arr.join('').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function evaluate() {
    const a = firstOperand.join('');

    const b = secondOperand.join('');

    if (operator == 'plus') console.log(a + b);
    if (operator == 'minus') console.log(a - b);
    if (operator == 'time') console.log(a * b);
    if (operator == 'divide') console.log(a / b);
};
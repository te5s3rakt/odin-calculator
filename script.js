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

const numberButtons = document.querySelectorAll('button.number');

numberButtons.forEach((button) => {
        button.addEventListener('click', () => {
            resetScreen(true);
            collectNumber(button);
        })
    });

const screen = document.querySelector('.screen');

function collectNumber(button) {
    const value = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, period: '.' };

    let newChar = value[button.id];

    if (
        screen.childElementCount == 0 ||
        screen.childElementCount == 2
    ) screen.appendChild(document.createElement('span'));

    let currentValue = screen.lastChild.textContent

    if (
        currentValue.includes('.') &&
        newChar == '.'
    ) newChar = '';

    if (
        currentValue.length == 0 &&
        newChar == '.'
    ) currentValue = 0;

    screen.lastChild.textContent = currentValue + newChar
};

const operatorButtons = document.querySelectorAll('button.operator')

operatorButtons.forEach((button) => {
        button.addEventListener('click', () => {
            resetScreen();
            collectOperand(button);
        });
    });

function collectOperand(button) {
    let newSpan = document.createElement('span')

    if ( screen.childElementCount == 3 ) evaluate();

    if ( screen.childElementCount == 1 ) screen.appendChild(newSpan);

    screen.lastChild.textContent = button.textContent;
    screen.lastChild.classList.add(button.id);
}

function evaluate() {
    let a = Number(screen.children[0].textContent);
    let operand = screen.children[1].classList[0];
    let b = Number(screen.children[2].textContent);

    let result

    switch (operand) {
        case 'plus':
            result = a + b;
            break;
        case 'minus':
            result = a - b;
            break;
        case 'times':
            result = a * b;
            break;
        case 'divide':
            result = a / b;
            break;
    };

    while (screen.firstChild) screen.removeChild(screen.firstChild);
    
    let printResult = document.createElement('span');

    if (isFinite(result)) {
        screen.id = 'result';
        printResult.textContent = result;
    };

    if (result == 'Infinity') {
        screen.id = 'error';
        printResult.innerHTML = "F**kin'<br>huge<br>mate!";
    };

    if (result == 'NaN') {
        screen.id = 'error';
        printResult.innerHTML = "Great work!<br>you broke it.";
    };

    screen.appendChild(printResult);
};

const evaluateButton = document.querySelector('#equals')

evaluateButton.addEventListener('click', () => {
    resetScreen();
    if(screen.childElementCount == 3) evaluate();
});

const clearButton = document.querySelector('#clear')

clearButton.addEventListener('click', () => {
    resetScreen();
    while (screen.firstChild) screen.removeChild(screen.firstChild);
});

function resetScreen(number) {
    if (screen.id == 'error') {
        while (screen.firstChild) screen.removeChild(screen.firstChild);
    };

    if (screen.id == 'result' && !number) {
        screen.appendChild(document.createElement('span'))
    };

    if (screen.id == 'result' && number) {
        while (screen.firstChild) screen.removeChild(screen.firstChild);
    };
    
    screen.removeAttribute('id');
}

const negativeButton = document.querySelector('#plusmn')

negativeButton.addEventListener('click', () => {
        resetScreen();
        negateNumber();
    });

function negateNumber() {
    if (
        screen.childElementCount == 0 ||
        screen.childElementCount == 1
    ) screen.appendChild(document.createElement('span'));

    let currentValue = screen.lastChild.textContent

    if ( currentValue.includes('-') ) return;

    screen.lastChild.textContent = '-' + currentValue;
}

const percentButton = document.querySelector('#percent')

percentButton.addEventListener('click', () => {
        resetScreen();
        percentNumber();
    });

function percentNumber() {
    let currentValue = screen.lastChild.textContent;

    screen.lastChild.textContent = currentValue / 100;
}
const calculator = document.querySelector('.calculator');

const screen = document.querySelector( '.screen' );

const buttons = document.querySelectorAll( 'button' );

const flipButton = document.querySelector('#flip');

const numberButtons = document.querySelectorAll( 'button.number' );

const operandButtons = document.querySelectorAll( 'button.operator' );

const evaluateButton = document.querySelector( '#equals' )

const clearButton = document.querySelector( '#clear' )

const deleteButton = document.querySelector( '#delete' )

const negativeButton = document.querySelector( '#plusmn' );

const percentButton = document.querySelector( '#percent' );

flipButton.addEventListener('click', flipCalculator );

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

buttons.forEach(( button ) => {
        button.addEventListener( 'click', function() {
            if ( button.id == 'flip' ) return;
            if ( screen.id == 'error' ) resetScreen();
        })
    });

numberButtons.forEach(( button ) => {
        button.addEventListener( 'click', function() {
            collectNumber( button.id );
        })
    });

function collectNumber( id ) {
    const number = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 };

    let isNumber = number[ id ] != undefined;

    if ( isNumber ) printValue( number[ id ] );

    try {
        activeNumberIsFloat = screen.lastChild.textContent.includes( '.' );
    }
    catch(err) {
        activeNumberIsFloat = false;
    }

    if ( id == 'period' && !activeNumberIsFloat ) {
        printValue( '.' );
    };
};

function printValue( value ) {
    createNumberPrintSpace();

    screen.lastChild.textContent += value;

    mathRain ( value );
};

function createNumberPrintSpace() {
    const printCount = screen.childElementCount;

    if ( printCount == 0 || printCount == 2 ) {
        screen.appendChild( document.createElement('span') )
    };

    return printCount;
};

operandButtons.forEach(( button ) => {
        button.addEventListener( 'click', function() {
            printOperand( button );
        })
    });

function printOperand( button ) {
    const value = button.textContent;
    const printCount = screen.childElementCount;

    if ( printCount == 3 ) evaluate();

    if ( printCount == 2 ) screen.removeChild( screen.lastChild );

    if ( createNumberPrintSpace() == 0 ) screen.lastChild.textContent = 0;

    const span = document.createElement('span');
    span.classList.add(button.id);
    span.textContent = value;

    screen.appendChild( span );

    mathRain ( value );
};

evaluateButton.addEventListener('click', evaluate );

function evaluate() {
    if ( screen.childElementCount != 3 ) return;

    let a = Number( screen.children[0].textContent );
    let operand = screen.children[1].classList[0];
    let b = Number( screen.children[2].textContent );

    let result

    switch ( operand ) {
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

    printResult( result );
};

function printResult( value ) {
    resetScreen();
    
    let print = document.createElement('span');

    if ( isFinite( value ) ) {
        print.textContent = Number(value.toFixed( 10 ));
    } else {
        screen.id = 'error';

        if ( value == 'Infinity ') {
            print.innerHTML = "F**kin'<br>huge<br>mate!"
        } else {
            print.innerHTML = "Great work!<br>you broke it<br>dumbass"
        };
    };

    screen.appendChild( print );

    mathRain ( value );
};

clearButton.addEventListener( 'click', resetScreen );

function resetScreen() {
    while (screen.firstChild) screen.removeChild(screen.firstChild);

    screen.id = '';
};

deleteButton.addEventListener( 'click', deleteCharacter );

function deleteCharacter() {
    const print = screen.lastChild;

    if ( print == null ) return;

    const value = print.textContent;

    if ( 
        print.textContent == '' ||
        value.length == 1
    ) screen.removeChild( print );

    if ( value.length > 1 ) print.textContent = value.slice( 0, -1 );
};

negativeButton.addEventListener( 'click', negateNumber );

function negateNumber() {
    createNumberPrintSpace();

    const print = screen.lastChild;

    let value = print.textContent;

    if ( value.includes( '-' ) ) {
        print.textContent = value.slice( 1 );
    } else {
        print.textContent = '-' + value;
    };
};

percentButton.addEventListener( 'click', percentNumber );

function percentNumber() {
    createNumberPrintSpace();
    
    const print = screen.lastChild;

    let value = Number(print.textContent) + 0;

    print.textContent = value / 100;
};

document.addEventListener( 'keydown', function( event ) {
    event.stopPropagation();
    translateKeyboard( event.key );
});

function translateKeyboard( key ) {
    const map = {
        '0': 'zero',
        '1': 'one',
        '2': 'two',
        '3': 'three',
        '4': 'four',
        '5': 'five',
        '6': 'six',
        '7': 'seven',
        '8': 'eight',
        '9': 'nine',
        '.': 'period',

        '+': 'plus',
        '-': 'minus',
        '*': 'times',
        'x': 'times',
        '/': 'divide',
        
        '(': 'plusmn',
        ')': 'plusmn',
        '%': 'percent',
        '=': 'equals',
        'Enter': 'equals',

        'Backspace': 'delete',
        'Escape': 'clear',

        'ArrowRight': 'flip',
        'ArrowDown': 'flip',
        'ArrowUp': 'flip',
        'ArrowLeft': 'flip'
    };

    if( map[ key ] != undefined ) document.querySelector( '#' + map[ key ] ).click();
};

function mathRain( value ) {
    const chars = value.toString().split('');

    chars.forEach( ( char, index ) => {
            setTimeout(
                function() { mathDroplet( char ) },
                index * 50
            );
        });
};

function mathDroplet( value ) {
    const droplet = document.createElement( 'div' );
    droplet.className = 'math-drop';
    droplet.textContent = value;
    droplet.style.left = Math.random() * window.innerWidth + 'px';

    document.body.appendChild( droplet );

    droplet.addEventListener( 'transitionend', function() { 
            if ( parseInt( droplet.style.top ) >= window.innerHeight ) {
                document.body.removeChild( droplet );
            }
        });

    setTimeout(
        function() { droplet.style.top = window.innerHeight + 'px' },
        50
    );
}
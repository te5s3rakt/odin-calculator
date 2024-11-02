const traditionalButtonLayout = [
    clear,
    plusmn,
    percent,
    divide,
    seven,
    eight,
    nine,
    times,
    four,
    five,
    six,
    minus,
    one,
    two,
    three,
    plus,
    zero,
    period,
    equals
];

const gaugeButtonLayout = [ 1, 0, 2, 5, 3, 4, 6, 7, 9, 8 ];
// const gaugeButtonLayout = [ 'one', 'zero', 'two', 'five', 'three', 'four', 'six', 'seven', 'nine', 'eight' ];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Example usage:
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const shuffledArray = shuffleArray(array);
console.log(shuffledArray);

console.log('In JS');

$(document).ready(onReady);

let mathSymbol = '';
let firstValue = '';
let secondValue = '';
let mathResults = 0;

function onReady() {
    console.log('On ready!');
    $('#equalsBtn').on('click', onAddNumbers);
    $('.mathSymbols').on('click', addMathType);
    $('#clearBtn').on('click', clearInputs);
    // Added for stretch goals
    $('.numberBtn').on('click', numbersDisplayScreen);
    $('#equalsBtn').on('click', clearHistory);

    loadNumbers();
}

function onAddNumbers(evt) {
    evt.preventDefault();
    console.log('In onAddNumbers!');

    let calculateNumbers = {
        firstValue: $('#firstValue').text(),
        mathSymbol: mathSymbol,
        secondValue: $('#secondValue').text(),
        mathResults: 0
    };

    $.ajax({
        url: '/addSomeNumbers',
        method: 'POST',
        data: calculateNumbers
    })
     .then((response) => {
        console.log('In POST response', response);

    })
    .catch((err) => {
        console.log('In POST, something went wrong!', err);
    });
        loadNumbers();
}

function loadNumbers() {
    $.ajax({
        url: '/addSomeNumbers',
        method: 'GET'
    })
     .then((response) => {
        console.log('GET response', response);

        renderCalculation(response);
    })
    .catch((err) => {
        console.log('In GET, something went wrong!', err);
    });
}

function renderCalculation(calculateNumbers) {
    console.log('In renderCalculation!');
    $('#displayAnswer').empty();

    for (let number of calculateNumbers) {
        $('#displayAnswer').append(`
            <h2>${number.mathResults}</h2>
            <li>
                ${number.firstValue} ${number.mathSymbol} ${number.secondValue}
                = ${number.mathResults}
            </li>
        `);
    }
    $('#firstValue').text('');
    $('#secondValue').text('');
    $('#mathSymbol').text('');
}

function addMathType() {
    console.log('Adding mathSymbol + - * / ', mathSymbol);

    mathSymbol = $(this).text();
    $('#mathSymbol').empty();
    $('#mathSymbol').append(mathSymbol);
}

// This clears any number or mathSymbol
// on the calculator display screen
function clearInputs() {
    $('#firstValue').text('');
    $('#secondValue').text('');
    $('#mathSymbol').text('');
}

// This clears the recent mathematical
// equation after click "="
function clearHistory() {
    location.reload($(this).text);
}

// Added for stretch goals
 function numbersDisplayScreen() {
    if (mathSymbol === '') {
        firstValue = firstValue + $(this).text();
        console.log(firstValue);

        $('#firstValue').empty();
        $('#firstValue').append(firstValue);
    } 
    else {
        secondValue += $(this).text()

        console.log(secondValue);
        $('#secondValue').empty();
        $('#secondValue').append(secondValue);

    }
}
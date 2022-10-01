console.log('In JS');

$(document).ready(onReady);

let mathType = '';

function onReady() {
    console.log('On ready!');
    $('#equalsBtn').on('click', onAddNumbers);
    $('.mathSymbol').on('click', addMathType);

    loadNumbers();
}

function onAddNumbers(evt) {
    evt.preventDefault();
    console.log('In onAddNumbers!');

    let calculateNumbers = {
        firstValue: $('#firstValue').val(),
        secondValue: $('#secondValue').val(),
        mathResults: 0,
        mathType: mathType
    };

    $.ajax({
        url: '/numbers',
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
        url: '/numbers',
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
                ${number.firstValue} ${number.mathType} ${number.secondValue}
            </li>
        `);
    }
    $('#firstValue').val('');
    $('#secondValue').val('');
}

function addMathType(evt) {
    evt.preventDefault();
    console.log('Adding mathSymbol + - * / ', mathType);

    mathType = $(this).text();
}
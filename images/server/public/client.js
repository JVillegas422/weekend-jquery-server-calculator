console.log('In JS');

$(document).ready(onReady);

let mathType = '';

function onReady() {
    console.log('On ready!');
    $('#equalsBtn').on('click', onAddNumbers);
    $('.mathSymbol').on('click', addMathType);

    // renderCalculation();
}

function onAddNumbers(evt) {
    evt.preventDefault();
    console.log('In onAddNumbers!');

    let calculateNumbers = {
        firstValue: $('#firstValue').val(),
        secondValue: $('#secondValue').val(),
        mathType: mathType,
        mathResults: 0,
    };

    // clear Inputs 
    $('#firstValue').val('');
    $('#secondValue').val('');

    $.ajax({
        url: '/calculator',
        method: 'POST',
        data: calculateNumbers
    })
      .then((response) => {
        console.log('In POST response', response);

        loadNumbers();
      })
        .catch((err) => {
            console.log('In POST, something went wrong!', err);
        });
}

function loadNumbers() {
    $.ajax({
        url: '/calculator',
        method: '/GET'
    })
      .then((response) => {
        console.log('/GET respponse', response);

        $('#displayAnswer').empty();

        for (let numbers of response) {
            $('#displayAnswer').append(`
                <h2></h2>
                <li>
                    ${numbers.firstValue} ${numbers.secondValue}
                </li>
            `);
        }

        // renderCalculation(response);
      })
        .catch((err) => {
            console.log('In GET, something went wrong!', err);
        });
}

function renderCalculation() {
    console.log('In renderCalculation!');
    $('#displayAnswer').empty();

    for (let numbers of calculateNumbers) {
        $('#displayAnswer').append(`
            <h2 id="displayAnswer"></h2>
            <li id="displayHistory">
                ${numbers.firstValue} ${numbers.secondValue}
            </li>
        `)
    }
    // $('#firstValue').val('');
    // $('#secondValue').val('');
}

function addMathType(evt) {
    evt.preventDefault();
    console.log('Adding mathSymbol + - * / ', mathType);

    mathType = $(this).text();
}
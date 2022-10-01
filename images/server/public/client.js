console.log('In JS');

$(document).ready(onReady);

function onReady() {
    console.log('On ready!');
    $('#equalsBtn').on('click', onAddNumbers);

    renderCalculation();
}

function onAddNumbers(evt) {
    evt.preventDefault();
    console.log('In onAddNumbers!');

    let calculateNumbers = {
        firstValue: $('#firstValue').val(),
        secondValue: $('#secondValue').val(),
    };
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

        renderCalculation(response);
      })
        .catch((err) => {
            console.log('In GET, something went wrong!', err);
        });
}

function renderCalculation(calculateNumbers) {
    console.log('In renderCalculation!');
    $('#displayAnswer').empty();

    for (let numbers of calculateNumbers) {
        $('#displayAnswer').append(`
            <h2 id="displayAnswer"></h2>
            <li id="displayHistory"></li>
        `)
    }
    $('#firstValue').val('');
    $('#secondValue').val('');
}
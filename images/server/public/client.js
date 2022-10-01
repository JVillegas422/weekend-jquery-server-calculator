console.log('In JS');

$(document).ready(onReady);

function onReady() {
    console.log('On ready!');
    $('#equalsBtn').on('click', onAddNumbers);

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

        renderItems();
      })
        .catch((err) => {
            console.log('In GET, something went wrong!', err);
        });
}

function renderItems() {
    console.log('In render items!');

}
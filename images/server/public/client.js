console.log('In JS');

$(document).ready(onReady);

function onReady() {
    console.log('On ready!');

}

function addItemsHere() {
    let items = {
        someItems: 'someItems',
        description: 'description'
    };
    $.ajax({
        url: '/calculator',
        method: 'POST',
        data: items
    })
      .then((response) => {
        console.log('In POST response', response);

        loadItemsHere();
      })
        .catch((err) => {
            console.log('In POST, something went wrong!', err);
        });
}

function loadItemsHere() {
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
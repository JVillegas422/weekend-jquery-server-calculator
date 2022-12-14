const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));

// Serve up static files
app.use(express.static('./server/public'));

let numbersHistory = [];

// GET & POST

// GET server endpoint for array of objects 
app.get('/addSomeNumbers', (req, res) => {
    console.log('GET the info!')

    res.send(numbersHistory);
});

// POST server endpoint which will take the objects
// from the client side & add to current array of objects
app.post('/addSomeNumbers', (req, res) => {
    console.log('POST request');

    calculateNumbersResult(req.body);
    numbersHistory.push(req.body);
    console.log(numbersHistory);

    res.sendStatus(201);
});

// This function will check & calculate answer
function calculateNumbersResult(object) {
    console.log('Running calculateNumbersResult!');

    if (object.mathSymbol === '+') {
        object.mathResults = Number(object.firstValue) + Number(object.secondValue);
    }
    else if (object.mathSymbol === '-') {
        object.mathResults = Number(object.firstValue) - Number(object.secondValue);
    }
    else if (object.mathSymbol === '*') {
        object.mathResults = Number(object.firstValue) * Number(object.secondValue);
    }
    else if (object.mathSymbol === '/') {
        object.mathResults = Number(object.firstValue) / Number(object.secondValue);
    }
    else {
        return false;
    }
}


app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
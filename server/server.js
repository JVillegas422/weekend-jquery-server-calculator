const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: true }));

// Serve up static files
app.use(express.static('./server/public'));

let numbersHistory = [];

// GET & POST

app.get('/numbers', (req, res) => {
    console.log('GET the info!')

    res.send(numbersHistory);
});

app.post('/numbers', (req, res) => {
    console.log('POST request');

    numbersHistory.push(req.body);
    console.log(numbersHistory);

    calculateNumbersResult(numbersHistory);

    res.sendStatus(201);
});

function calculateNumbersResult(object) {
    console.log('Running calculateNumbersResult!');

    if (object.mathType === '+') {
        object.mathResults = object.firstValue + secondValue;
    }
    else if (object.mathType === '-') {
        object.mathResults = object.firstValue - secondValue;
    }
    else if (object.mathType === '*') {
        object.mathResults = object.firstValue * secondValue;
    }
    else if (object.mathType === '/') {
        object.mathResults = object.firstValue / secondValue;
    }
    else {
        return false;
    }
}


app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
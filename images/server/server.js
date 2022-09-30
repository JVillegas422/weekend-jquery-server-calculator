const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;


app.use(bodyParser.urlencoded({extended:true}));

// Serve up static files
app.use(express.static('server/public'));

// GET & POST
app.post('/calculator', (req, res) => {
    console.log('POST request');

    res.sendStatus(201);
});

app.get('/calculator', (req, res) => {
    console.log('GET the info!')

    res.send(response)
});


app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
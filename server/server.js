var express = require('express');
var app = express();
var port = process.env.PORT || 7237

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('server/public'));

app.listen(port, function () {
    console.log('listening on port ', port);
});

//creating global variables to use later
var answer
var numberOne;
var numberTwo;
var math;
var result;
var history = [];

//get the information and send the answer back
app.post('/equation', function (req, res) {
    numberOne = Number(req.body.x);
    numberTwo = Number(req.body.y);
    math = req.body.math;
    console.log(numberOne ,  math  , numberTwo);
    mathEquation(numberOne, math, numberTwo);
    result = {
        x: numberOne,
        y: numberTwo,
        math: math,
        answer: answer
    }
    history.unshift(result);
    console.log(result);
    console.log(history);
    res.send(history);
});

//this function does the math
function mathEquation(x, f, y) {
    if (f === '/') {
        answer = x / y
    }
    else if (f === '-') {
        answer = x - y
    }
    else if (f === 'x') {
        answer = x * y
    }
    else{
        answer = x + y
    }
    return answer
};
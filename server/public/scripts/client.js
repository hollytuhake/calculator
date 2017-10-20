$(document).ready(start);
function start(){
    console.log('jquery loaded');
    $(".action").on('click',$(this),transferData);
    $("#equals").on('click',getData);
    //$("#clearAll").on('click',clearData);
    $("#clearCalc").on('click',clearInputs);
    $(".numberButton").on('click', numberClicked);
}

//creating global variables to use later
var x = ''
var y = ''
var math
var displayedAnswer = entry;
var entry = ''

function numberClicked(){
    entry += $(this).data().number;
    console.log(entry);
    $("#display").text(entry);
}

//this function creates data for the math var once the equal button is clicked, taken from the last button pushed
function transferData(){
    $(".action").css('color', 'white');
    $(this).css('color', 'red');
    x = entry;
    math = $(this).data('action');
    entry = "";
    console.log(math);
}

//this function creates data from the input fields
function getData(){
    x = x
    y = entry
    math = math
    onceClicked();
}


//this sends the data via JSON to server.js
function onceClicked(){
$.ajax({
    method: "POST",
    url: "/equation",
    data: {
        x: x,
        y: y,
        math: math
    }
})
// this receives the answer and writes it in the dom (just realized during lecture the history was supposed
// to be stored in the server...)
.done(function (response) {
    console.log(response);
    displayedAnswer = response[0].answer;
    $("#answer").text(displayedAnswer);
    $("#history").empty();
    for (i=0; i < response.length; i += 1) {
        $("#history").append('<p> ' + response[i].x + ' ' + response[i].math + ' ' + response[i].y + ' ' + ' = ' + response[i].answer + '</p>');
    }
    entry = ''
    x = ''
    y = ''
    
});
}

//clearing the calculator
function clearInputs (){
    $('#inputOne').val("");
    $('#inputTwo').val("");
    x = '';
    y = '';
    math = '';
    $(".action").css('color', 'white');
    $("#answer").text('');
}
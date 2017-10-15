$(document).ready(start);
function start(){
    console.log('jquery loaded');
    $(".action").on('click',$(this),transferData);
    $("#equals").on('click',getData);
    $("#clearAll").on('click',clearData);
    $("#clearCalc").on('click',clearInputs);
}
var x = 0
var y = 0
var math
var displayedAnswer = 0

//this function creates data for the math var once the equal button is clicked, taken from the last button pushed
function transferData(){
    $(".action").css('color', 'white');
    $(this).css('color', 'red');
    math = $(this).data('action');
    console.log(math);
}

//this function creates data from the input fields
function getData(){
    x = $('#inputOne').val();
    y = $('#inputTwo').val();
    console.log('x = ', x, ' y = ', y);
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
//this receives the answer and writes it in the dom
.done(function (response) {
    var displayedAnswer = response.answer;
    $("#answer").text(displayedAnswer);
    $("#history").append('<p>'+ x + math + y+ '=' +displayedAnswer+'</p>');
});
}

function clearData(){
    $("#history").text("");
    $('#inputOne').val("");
    $('#inputTwo').val("");
    x = '';
    y = '';
    math = '';
    $("#answer").text('');
    $(".action").css('color', 'white');
}

function clearInputs (){
    $('#inputOne').val("");
    $('#inputTwo').val("");
    x = '';
    y = '';
    math = '';
    $(".action").css('color', 'white');
    $("#answer").text('');
}
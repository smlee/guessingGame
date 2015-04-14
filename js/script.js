/**
 * Created by Sangmin on 3/30/2015.
 */

function initializeGame(){
    //When a game begins, there should be a random number generated between 1-100.
    this.guessAnswer = Math.floor(Math.random()*99+1);
    this.guessArray = [];
    this.numOfTries = 5;
    this.hintClick = 0;

    //Messages
    this.message = {
        very_cold: "You're very cold. Guess ", //>20
        cold: "You're cold. Guess ", //20
        warm: "You're warm. Guess ", //15
        hot: "You're hot. Guess ", //10
        very_hot: "You're very hot. Guess ", //5
        repeat: "You already tried this number. Guess again!",
        empty: "Enter a number between 1 and 100.",
        nan: "This is not a valid number.",
        invalid: "Please pick between 1 and 100",
        won: "YOU WON!",
        lost: "Better luck next time!"
    };
    $('#message').removeClass('alert-danger alert-warning').text('Guess a number between 1 and 100.');
    $('.guesses h1').text(this.numOfTries);
    $('#guess').focus();
    //console.log(this.guessAnswer);
}

initializeGame.prototype.isValidGuess = function(num){
    if (num == '') {
        $('#message').removeClass('alert-danger').addClass("alert alert-warning").text(this.message.empty);
        return false;
    } else if (isNaN(num)){
        $('#message').removeClass('alert-danger').addClass("alert alert-warning").text(this.message.nan);
        return false;
    } else if (num > 100 || num < 1) {
        $('#message').removeClass('alert-danger').addClass("alert alert-warning").text(this.message.invalid);
        return false;
    }
    for(var i=0;i<this.guessArray.length;i++)
        if(this.guessArray[i] == num) {
            $('#message').removeClass('alert-danger').addClass("alert alert-warning").text(this.message.repeat);
            return false;
        }
    return true;
};

initializeGame.prototype.messageHandler = function(guess) {
    var diff = Math.abs(guess - this.guessAnswer);
    $('#message').removeClass('alert-warning alert-danger alert-info');
    if (diff == 0) {
        $('#myModal').modal('show');
        $('#myModalLabel').text("Congrats!");
        $('.modal-body').text(this.message.won);
        return this.message.won;
    }
    else if (diff <= 5) {
        $('#message').addClass("alert alert-danger");
        return guess > this.guessAnswer ? this.message.very_hot + "lower." : this.message.very_hot + "higher.";
    }
    else if(diff <= 10) {
        $('#message').addClass("alert alert-danger");
        return guess > this.guessAnswer ? this.message.hot + "lower." : this.message.hot + "higher.";
    }
    else if (diff <=15) {
        $('#message').addClass("alert alert-warning");
        return guess > this.guessAnswer ? this.message.warm + "lower." : this.message.warm + "higher.";
    }
    else if (diff <=20) {
        $('#message').addClass("alert alert-info");
        return guess > this.guessAnswer ? this.message.cold + "lower." : this.message.cold + "higher.";
    }
    $('#message').addClass("alert alert-info");
    return guess > this.guessAnswer ? this.message.very_cold + "lower." : this.message.very_cold + "higher.";
};

initializeGame.prototype.guesses = function(){
    var guesses =' Your guesses: ';
    for (var i =0; i<this.guessArray.length; i++)
        guesses += this.guessArray[i] + " ";
    return guesses;
}

initializeGame.prototype.checkGuess = function(){
    var currentInput = $('#guess:text').val();
    var currentGuess = Number(currentInput);
    if (this.isValidGuess(currentInput) && this.numOfTries > 0) {
        this.numOfTries -= 1;
        this.guessArray.push(currentGuess);
        $('#message').html("<p>" + this.messageHandler(currentGuess) + "<p>" +this.guesses());
        //console.log(this.messageHandler(currentGuess));
        $('.guesses h1').text(this.numOfTries);
        //console.log(this.guessArray);
        if(this.numOfTries === 0) {
            $('#message').text(this.message.lost);
            $('#myModal').modal('show');
            $('#myModalLabel').text("Sorry :'(");
            $('.modal-body').text(this.message.lost);
        }
    }
    this.clear();
};

initializeGame.prototype.giveHint = function() {
    switch (this.hintClick) {
        case 0:
            if (this.guessAnswer % 2 == 0) $('#message').text('The answer is an even number. Click Hint again for another hint.');
            else $('#message').text('The answer is an odd number. Click Hint again for another hint.');
            this.hintClick +=1;
            break;
        case 1:
            if (this.guessArray.length > 0)
                $('#message').html("<p> Difference between the answer and your last guess is " +
                    Math.abs(this.guessArray[this.guessArray.length-1] - this.guessAnswer) +
                    "<p>"+this.guesses());
            else $('#message').text("Guess a number before getting another hint");
            break;
        default:
            break;
    }
};

initializeGame.prototype.clear = function(){
    $('#guess').val("");
    $('#guess').focus();
};
$(function() {
    $.contra(function () {
        begin.numOfTries += 10;
        $('.guesses h1').text(begin.numOfTries);
        $('#message').text("You've unlocked the easter egg.")
    })
});

var begin = new initializeGame();

function restart(){
    begin = new initializeGame();
    $('#myModal').modal('hide');
};
$('#guess').keypress(function(e) {
    if (e.which == 13)
        begin.checkGuess();
});




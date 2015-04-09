/**
 * Created by Sangmin on 3/30/2015.
 */

function initializeGame(){
    //When a game begins, there should be a random number generated between 1-100.
    this.guessAnswer = Math.floor(Math.random()*99+1);
    this.guessArray = [];
    this.numOfTries = 5;

    //Messages
    this.message = {
        very_cold: "You're very cold. Guess ", //>20
        cold: "You're cold. Guess ", //20
        warm: "You're warm. Guess ", //15
        hot: "You're hot. Guess ", //10
        very_hot: "You're very hot. Guess ", //5
        repeat: "You already tried this number. Guess again!",
        empty: "Enter a number.",
        nan: "This is not a valid number.",
        invalid: "Please pick between 1 and 100",
        won: "YOU WON!",
        lost: "Better luck next time!"
    };
    $('.guesses h1').text(this.numOfTries);
    $('#guess').focus();
    console.log(this.guessAnswer);
}

initializeGame.prototype.isValidGuess = function(num){
    if (num == '') {
        $('#message').removeClass('alert-danger').addClass("alert alert-warning").text((this.message.empty));
        return false;
    } else if (isNaN(num)){
        console.log(this.message.nan);
        return false;
    } else if (num > 100 || num < 1) {
        console.log(this.message.invalid);
        return false;
    }
    for(var i=0;i<this.guessArray.length;i++)
        if(this.guessArray[i] == num) {
            console.log(this.message.repeat);
            return false;
        }
    return true;
};

initializeGame.prototype.messageHandler = function(guess) {
    var diff = Math.abs(guess - this.guessAnswer);
    $('#message').removeClass('alert-warning').addClass("alert alert-danger");
    if (diff == 0)
        return this.message.won;
    else if (diff <= 5)
        return guess > this.guessAnswer ? this.message.very_hot + "lower." : this.message.very_hot + "higher.";
    else if(diff <= 10)
        return guess > this.guessAnswer ? this.message.hot + "lower." : this.message.hot + "higher.";
    else if (diff <=15)
        return guess > this.guessAnswer ? this.message.warm + "lower." : this.message.warm + "higher.";
    else if (diff <=20)
        return guess > this.guessAnswer ? this.message.cold + "lower." : this.message.cold + "higher.";
    return guess > this.guessAnswer ? this.message.very_cold + "lower." : this.message.very_cold + "higher.";
};

initializeGame.prototype.checkGuess = function(){
    var currentInput = $('#guess:text').val();
    var currentGuess = Number(currentInput);
    console.log(currentGuess);
    if (this.isValidGuess(currentInput)) {
        this.guessArray.push(currentGuess);
        $('#message').text(this.messageHandler(currentGuess));
        console.log(this.messageHandler(currentGuess));
        $('#guess').val("");
        $('#guess').focus();
        this.numOfTries -= 1;
        $('.guesses h1').text(this.numOfTries);
        console.log(this.guessArray);
    }
    console.log($('.guesses h1').text());
};

$(function() {
    $.contra(function () {
        begin.numOfTries += 10;
        $('.guesses h1').text(begin.numOfTries);
        $('#message').text("You've unlocked the easter egg.")
    })
});

var begin = new initializeGame();
$('#guess').keypress(function(e) {
    if (e.which == 13)
        begin.checkGuess();
});
//After the user submits a guess, indicate whether their guess is 'hot' or 'cold'. Let the user know if they need to guess higher or lower.
//Allow the user to guess only a certain amount of times. When they run out of guesses let them know the game is over.
//Feel free to use prompts to get user input on your first version.
//For the final version of your project, you'll need to create an HTML-based interface for getting user inputs and giving feedback on guesses.
//Validate inputs that they are real numbers between 1-100.
//Create a new game button that resets the game.
//Store all of the guesses and create a way to check if the guess is a repeat.
//Track the user's previous guess. Let them know if they are getting “hotter” or “colder” based on their previous guess.
//Create a button that provides the answer (Give me a Hint).
//Submit the guess by pressing enter or clicking the submit button.
//After a user guesses a number keep a visual list of Hot and Cold answers that the user




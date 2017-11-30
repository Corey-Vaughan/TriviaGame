var playArea = $("#gameArea");
var countStartNumber = 15;

//CLICK EVENTS

//Reset Game
$(document).on("click", "#startOver", function(e) {
    game.reset();
});

//When answer is clicked..
$(document).on("click", ".answerButton", function(e) {
    game.clicked(e);
});

//When start button is clicked display question and timer
$(document).on("click", "#startGame", function(e) {
    $("#tagLine").hide();
    $("#innerContainer").prepend("<h2>Time Remaining: <span id='counterNumber'>15</span> Seconds</h2>");
    game.loadQuestion();
});

//Questions

var questions = [{
        question: "What band was Freddy Mercury in?",
        answers: ["Queen", "Nirvana", "Back Street Boys", "None of These"],
        correctAnswer: "Queen",
        image: "assets/images/queen.jpg"
    },
    {
        question: "What band's music was made into a play and a movie?",
        answers: ["Michael Jackson", "Abba", "The Beatles", "Spice Girls"],
        correctAnswer: "Abba",
        image: "assets/images/abba.jpg"
    },
    {
        question: "What year did Lynyrd Skynyrds plane crash?",
        answers: [1971, 1973, 1975, 1977],
        correctAnswer: 1977,
        image: "assets/images/lynyrdskynyrd.jpg"
    },
    {
        question: "Who was Led Zeppelin's lead guitarist?",
        answers: ["Jimmy Page", "Slash", "Bob Dylan", "Frank Zappa"],
        correctAnswer: "Jimmy Page",
        image: "assets/images/ledzep.jpg"
    },
    {
        question: "What band's dummer lost an arm but continued playing afterwards?",
        answers: ["Guns & Roses", "AC/DC", "Def Leppard", "Stix"],
        correctAnswer: "Def Leppard",
        image: "assets/images/deflep.jpg"
    },
    {
        question: "What band was started by the recently deceased Malcolm Young?",
        answers: ["Aerosmith", "Boston", "Black Sabbath", "AC/DC"],
        correctAnswer: "AC/DC",
        image: "assets/images/acdc.jpg"
    },
    {
        question: "What year did MTV launch?",
        answers: [1981, 1979, 1983, 1985],
        correctAnswer: 1981,
        image: "assets/images/mtv.jpg"
    },
    {
        question: "Who is the King of Rock & Roll?",
        answers: ["Jerry Lee Lewis", "Johnny Cash", "Elvis Presley", "Michael Jackson"],
        correctAnswer: "Elvis Presley",
        image: "assets/images/elvis.jpg"
    },
    {
        question: "What year was the album 'Hotel California' released?",
        answers: [1976, 1974, 1972, 1978],
        correctAnswer: 1976,
        image: "assets/images/hotelcali.jpg"
    },
    {
        question: "What is the guitarist known as Slash real name?",
        answers: ["William Bailey", "Michael McKagan", "Saul Hudson", "Darren Reed"],
        correctAnswer: "Saul Hudson",
        image: "assets/images/slash.jpg"
    }
];

var game = {
    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,
    countdown: function() {
        game.counter--;
        $("#counterNumber").html(game.counter);

        if (game.counter === 0) {
            console.log("Out of time");
            game.timeUp();
        }
    },
    //Display first question after starting game
    loadQuestion: function() {
        $("#gameHeader").text("Question #" + (this.currentQuestion + 1));
        timer = setInterval(game.countdown, 1000);
        playArea.html('<h2>' + questions[this.currentQuestion].question + '</h2>');
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            playArea.append('<button class="answerButton" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] + '</button>');
        }
    },
    //Load next question
    nextQuestion: function() {
        game.counter = countStartNumber;
        $("#counterNumber").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    //When player runs out out of time display correct answer
    timeUp: function() {
        clearInterval(timer);
        $("#counterNumber").html(game.counter);

        playArea.html("<h2>Out of Time!</h2>");
        playArea.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
        playArea.append('<img src="' + questions[this.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    //Shows the player their final number of correct and incorrect answers
    results: function() {
        clearInterval(timer);

        playArea.html("<h2>All done, heres how you did!</h2>");
        $("#counterNumber").html(game.counter);
        playArea.append("<h3>Correct Answers: " + game.correct + "</h3>");
        playArea.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
        playArea.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
        playArea.append('<br><button id="start-over">Start Over?</button>');
    },
    //Stop timer when showing results
    clicked: function(e) {
        clearInterval(timer);

        if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },
    //When the player guesses incorrectly display the correct answer
    answeredIncorrectly: function() {
        game.incorrect++;
        clearInterval(timer);
        playArea.html("<h2>Nope!</h2>");
        playArea.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + '</h3>');
        playArea.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    //When the player guesses correctly display message acknowledging it
    answeredCorrectly: function() {
        clearInterval(timer);
        game.correct++;
        playArea.html("<h2>Correct!</h2>");
        playArea.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    //Function to reset the game after Start Over is clicked
    reset: function() {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};
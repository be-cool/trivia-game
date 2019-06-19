$(document).on('click', '#start', function () {
    console.log("start!");

});

// creating a timer to be put in the remaining time id on the html page
// function startTimer(duration, display) {
//     var timer = duration, minutes, seconds;
//     setInterval(function(){
//         minutes = parseInt(timer / 60,10);
//         seconds = parseInt(timer % 60, 10);

//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;

//         display.textContent = minutes + ":" + seconds;

//         if (--timer < 0) {
//             timer = duration;
//         }
//     }, 1000);
//     window.onload = function () {
//         console.log("hi")
//         var twoMinutes = 60*2,
//         display = document.getElementById('#timer');
//         startTimer(twoMinutes, display);
//     };
// }

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        // if less than ten seconds left, add a zero in front of the seconds
        if (seconds < 10) {
            $('#timer').prepend("0")
        }

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            showResults();
        }
    }, 1000);


}

window.onload = function () {
    var twoMinutes = 60 * 0.2,
        display = document.querySelector('#timer');
    startTimer(twoMinutes, display);
};

var answerContainers = [];
var quizContainer = [];


function theQuiz() {
    var output = [];
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            // empty array to store all of the answers from the quiz
            var answers = [];
            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>`
            );
        }
    );
    quizContainer.innerHTML = output.join('');
};

function showResults() {
    var answerContainers = quizContainer.querySelectorAll('.answers');
    var numCorrect = 0;
    myQuestions.forEach((currentQuestion, questionNumber) => {
        var answerContainer = answerContainers[questionNumber];
        var selector = 'input[name=question' + questionNumber + ']:checked';
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainers[questionNumber].style.color = 'green';
        }
        else {
            answerContainers[questionNumber].style.color = 'red';
        }
    });
    resultsContainer.innerHTML = 'You got ' + numCorrect + ' out of ' + myQuestions.length + ' correct!!'
}

// storing references to the elements in these variables
var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var submitButton = document.getElementById("submit");


// questions to be listed in order on the quiz 
var myQuestions = [
    {
        question: "Whose family is known for celebrating Festivus?",
        answers: {
            a: "Jerry",
            b: "Elaine",
            c: "George",
            d: "Kramer"
        },
        correctAnswer: 'c'
    },
    {
        question: "Which character is known for only liking the top half of a muffin?",
        answers: {
            a: "Jerry",
            b: "Elaine",
            c: "George",
            d: "Kramer"
        },
        correctAnswer: 'b'
    },
    {
        question: "What action figure is shown in every episode of Seinfeld?",
        answers: {
            a: "Batman",
            b: "Superman",
            c: "The Incredible Hulk",
            d: "Spiderman"
        },
        correctAnswer: 'b'
    },
    {
        question: "Who has a long running feud with their mailman, Newman?",
        answers: {
            a: "Jerry",
            b: "Elaine",
            c: "George",
            d: "Kramer"
        },
        correctAnswer: 'a'
    },
    {
        question: "Which character went into business with George's father to create a line of men's bras?",
        answers: {
            a: "Jerry",
            b: "Elaine",
            c: "George",
            d: "Kramer"
        },
        correctAnswer: 'd'
    },
    {
        question: "Who spent time working for the New York Yankees?",
        answers: {
            a: "Jerry",
            b: "Elaine",
            c: "George",
            d: "Kramer"
        },
        correctAnswer: 'c'
    },
];

// display the quiz
theQuiz();

$("#submitButton").on('click', showResults);


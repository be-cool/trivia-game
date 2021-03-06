$(document).on('click', '#start', function () {
    console.log("start!");

});


// function startTimer(duration, display) {
//     var timer = duration, minutes, seconds;
//     setInterval(function () {
//         minutes = parseInt(timer / 60, 10);
//         seconds = parseInt(timer % 60, 10);

//         // if less than ten seconds left, add a zero in front of the seconds. otherwise just show the double digit number
//         if (seconds < 10) {
//             display.textContent = minutes + ":0" + seconds;
//         }
//         else{
//         display.textContent = minutes + ":" + seconds;
//         }

//         // when the timer gets to 0, and the user has not yet hit the submit button, show the results of the trivia.
//         if (--timer < 0) {
//             showResults();
//         }
//     }, 1000);

//     // trying to stop the timer at 0 and not let it drag into negatives
//     clearInterval(timer);
// }

// // when the window opens, the timer immediately starts running 
// window.onload = function () {
//     var twoMinutes = 60 * 0.2,
//         display = document.querySelector('#timer');
//     startTimer(twoMinutes, display);
// };

// used code concept from activity 9 in week 5 instead of above code to make it simpler with the clear interval
var number = 61
var intervalId;

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
    console.log("yo")
  }

  function decrement() {

    number--;

    // show the number in the timer area
    $("#timer").html(number);


    if (number === 0) {
      stop();
      showResults();
    }
  }

  //  The stop function ends the timer at 0
  function stop() {
    clearInterval(intervalId);
  }
//   start the run function right when the page is loaded
  window.onload = run;



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
    // put all of the selected answers into a answer container array to match up against correct answers
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


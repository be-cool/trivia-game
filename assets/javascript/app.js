$(document).on('click', '#start', function () {
    console.log("start!");
    
});

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

var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var submitButton = document.getElementById("submit");
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
    }
];

theQuiz();

$("#submitButton").on('click', showResults);


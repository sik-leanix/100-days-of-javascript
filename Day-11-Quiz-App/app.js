/**
 * Methods prefixed with "_" are considered private and should not be used on the outside.
 * The only methods an outside consumer would need are Quiz.start and Quiz.guess.
 */
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    start() {
        this.displayQuestion();
    }

    guess(answer) {
        if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
        if (quiz.isEnded()) {
            this._showScores();
        }

    }

    _isEnded() {
        return this.questionIndex === this.questions.length;
    }

    _getCurrentQuestion() {
        return this.questions[this.questionIndex];
    }

    _updateProgress() {
        const currentQuestionNumber = quiz.questionIndex + 1;
        const ProgressElement = document.getElementById("progress");
        ProgressElement.innerHTML =
            `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
    }

    _displayQuestion() {
        // show question
        const questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getCurrentQuestion().text;

        // show options
        const choices = quiz.getCurrentQuestion().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            this._registerSelectGuessListener("btn" + i, choices[i])
        }
        this._updateProgress();
    }

    _registerSelectGuessListener(buttonId, guess) {
        const button = document.getElementById(buttonId);
        button.onclick = function() {
            quiz.guess(guess);
            displayQuestion();
        }
    }

    _showScores() {
        const quizEndHTML = `
          <h1>Quiz Completed</h1>
          <h2 id='score'>You scored: ${quiz.score} of ${quiz.questions.length}</h2>
          <div class="quiz-repeat">
            <a href="index.html">Take Quiz Again</a>
          </div>
        `;
        const quizElement = document.getElementById("quiz");
        quizElement.innerHTML = quizEndHTML;
    }
}


// Create a question Class
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

// create questions here
let questions = [
    new Question(
        "Hyper Text Markup Language Stands For?", ["JQuery", "XHTML", "CSS", "HTML"], "HTML"
    ),
    new Question(
        "Cascading Style sheet stands for?", ["HTML", "JQuery", "CSS", "XML"], "CSS"
    ),
    new Question(
        "Which is a JavaScript Framework?", ["React", "Laravel", "Django", "Sass"], "React"
    ),
    new Question(
        "Which is a backend language?", ["PHP", "HTML", "React", "All"], "PHP"
    ),
    new Question(
        "Which is best for Artificial intelligence?", ["React", "Laravel", "Python", "Sass"], "Python"
    )
];

// INITIALIZE quiz
const quiz = new Quiz(questions);
quiz.start()

// Add A CountDown for the Quiz
let time = 10;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            while (sec < 10) {
                sec = "0" + sec
                counting.innerHTML = `TIME: ${min} : ${sec}`;
                return sec
            }
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000);
}

startCountdown();
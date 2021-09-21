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
        this._displayQuestion();
        this._startCountdown();
    }

    guess(answer) {
        if (this._getCurrentQuestion().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
        if (this._isEnded()) {
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
        const currentQuestionNumber = this.questionIndex + 1;
        const ProgressElement = document.getElementById("progress");
        ProgressElement.innerHTML =
            `Question ${currentQuestionNumber} of ${this.questions.length}`;
    }

    _displayQuestion() {
        if (this._isEnded()) {
            return;
        }
        // show question
        const questionElement = document.getElementById("question");
        questionElement.innerHTML = this._getCurrentQuestion().text;

        // show options
        const choices = this._getCurrentQuestion().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            this._registerSelectGuessListener("btn" + i, choices[i])
        }
        this._updateProgress();
    }

    _registerSelectGuessListener(buttonId, guess) {
        const button = document.getElementById(buttonId);
        button.onclick = () => {
            this.guess(guess);
            // Calling displayQuestion after guess() will show the next question.
            this._displayQuestion();
        }
    }

    _showScores() {
        const quizEndHTML = `
          <h1>Quiz Completed</h1>
          <h2 id='score'>You scored: ${this.score} of ${this.questions.length}</h2>
          <div class="quiz-repeat">
            <a href="index.html">Take Quiz Again</a>
          </div>
        `;
        const quizElement = document.getElementById("quiz");
        quizElement.innerHTML = quizEndHTML;
    }

    _startCountdown() {
        const time = 10;
        const quizTimeInMinutes = time * 60 * 60;
        let quizTime = quizTimeInMinutes / 60;

        const countdownElement = document.getElementById("count-down");
        const quizTimer = setInterval(() => {
            if (quizTime <= 0) {
                clearInterval(quizTimer);
                this._showScores();
            } else {
                quizTime--;
                let sec = Math.floor(quizTime % 60);
                let min = Math.floor(quizTime / 60) % 60;
                while (sec < 10) {
                    sec = "0" + sec
                    countdownElement.innerHTML = `TIME: ${min} : ${sec}`;
                    return sec
                }
                countdownElement.innerHTML = `TIME: ${min} : ${sec}`;
            }
        }, 1000);
    }
}

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
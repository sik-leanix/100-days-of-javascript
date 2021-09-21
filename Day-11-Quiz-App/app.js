/**
 * Methods prefixed with "_" are considered private and should not be used on the outside.
 * The only methods an outside consumer would need are Quiz.start and Quiz.guess.
 * 
 * How to use: include this Quiz class on your website and add a <div>
 */
class Quiz {
    quizHtmlBody = `
        <h1>Sports Quiz App</h1>
        <div class="quiz-header">
            <p id="progress">Question x of y</p>
            <p id="count-down">TIME: 10 : 00</p>
        </div>
        <p id="question"></p>

        <div class="buttons">
            <button class="btn" id="btn0">A. <span id="choice0"></span></button>
            <button class="btn" id="btn1">B. <span id="choice1"></span></button>
            <button class="btn" id="btn2">C. <span id="choice2"></span></button>
            <button class="btn" id="btn3">D. <span id="choice3"></span></button>
        </div>
        <button class="btn" id="quitQuizButton">Quit</button>
        <hr>
        <p>You will see your score at the end of the Quiz.</p>
    `

    constructor(questions, entryElementId = 'sik-quiz') {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
        this.containerElement = document.getElementById(entryElementId);
    }

    start() {
        this.containerElement.innerHTML = this.quizHtmlBody;
        this._displayQuestion();
        this._startCountdown();
        const button = document.getElementById('quitQuizButton');
        button.onclick = () => this.quit();
        const startEvent = new Event("SidneyQuiz:start");
        this.containerElement.dispatchEvent(startEvent);
    }

    quit() {
        this.containerElement.textContent = '';
        this.score = 0;
        this.questionIndex = 0;
        const quitEvent = new Event("SidneyQuiz:quit");
        this.containerElement.dispatchEvent(quitEvent);
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

    _reset() {
        this.score = 0;
        this.questionIndex = 0;
        this.start();
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
            <button class="btn" id="restartQuizButton">Take Quiz Again</button>
          </div>
        `;
        this.containerElement.innerHTML = quizEndHTML;
        const restartButton = document.getElementById("restartQuizButton");
        restartButton.addEventListener("click", () => this._reset());
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
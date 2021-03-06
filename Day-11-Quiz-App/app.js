function InvalidQuizInputException(message) {
    this.message = message;
    this.name = "InvalidQuizInputException";
}

/**
 * Methods prefixed with "_" are considered private and should not be used on the outside.
 * The only methods an outside consumer would need are Quiz.start and Quiz.guess.
 * 
 * How to use: include this Quiz class on your website and add a <div>
 */
class Quiz {
    static getQuestionsFromJson(jsonString) {
        const convertJSONtoObject = JSON.parse(jsonString).map(question =>{
            if (question.text && question.answer && typeof question.choices === "object" && question.choices.length > 0) {
                return new Question(question.text, question.choices, question.answer)
            }
            throw new InvalidQuizInputException("You need to provide questions to start a Quiz");
        } );
        return convertJSONtoObject
    }

    _userHasAlreadyGuessedForCurrentQuestion = false;

    constructor(questions, entryElementId = 'sik-quiz', quizTitle = 'Quiz App') {
        if (typeof questions === 'string') {
            this.questions = Quiz.getQuestionsFromJson(questions)
        } else {
            this.questions = questions
        }
        this.score = 0;
        this.questionIndex = 0;
        this.quizTitle = quizTitle;
        this._containerElement = document.getElementById(entryElementId);
    
    }

    start() {
        this._containerElement.classList.add("sidneyQuizContainer");
        this._containerElement.innerHTML = this._quizHtmlBody();
        this._displayQuestion();
        this._startCountdown();
        const button = document.getElementById('quitQuizButton');
        button.onclick = () => this.quit();
        const startEvent = new Event("SidneyQuiz:start");
        this._containerElement.dispatchEvent(startEvent);
    }

    quit() {
        this._containerElement.classList.remove("sidneyQuizContainer");
        this._containerElement.textContent = '';
        this.score = 0;
        this.questionIndex = 0;
        const quitEvent = new Event("SidneyQuiz:quit");
        this._containerElement.dispatchEvent(quitEvent);
        clearInterval(this.quizTimer);
    }

    guess(answer) {
        const isCorrectGuess = this._getCurrentQuestion().isCorrectAnswer(answer);
        if (this._getCurrentQuestion().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
        return isCorrectGuess;
    }

    _reset() {
        this.score = 0;
        this.questionIndex = 0;
        this._userHasAlreadyGuessedForCurrentQuestion = false;
        this.start();
    }

    _quizHtmlBody() {
        return `
        <h1>${this.quizTitle}</h1>
        <div class="quiz-header">
            <p id="progress">Question x of y</p>
            <p id="count-down">TIME: 10 : 00</p>
        </div>
        <p id="question"></p>

        <div id="choiceContainer"></div>
        <button class="btn" id="quitQuizButton" style="text-align: center; background-color:#3399ff;" >Quit</button>
        <hr>
        <p>You will see your score at the end of the Quiz.</p>
    `
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
            return this._showScores();
        }
        // show question
        const questionElement = document.getElementById("question");
        questionElement.textContent = this._getCurrentQuestion().text;

        // show options
        const choices = this._getCurrentQuestion().choices;
        const choiceContainer = document.getElementById("choiceContainer");
        choiceContainer.textContent = "";
        for (let i = 0; i < choices.length; i++) {
            const buttonElement = document.createElement("button");
            buttonElement.className = "btn";
            const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
            buttonElement.textContent = `${alphabet[i]}. ${choices[i]}`
            this._registerSelectGuessListener(buttonElement, choices[i]);
            choiceContainer.appendChild(buttonElement);    
        }
        this._updateProgress();
    }

    _registerSelectGuessListener(buttonElement, guess) {
        buttonElement.style.backgroundColor = "#ddd"; // reset button background as it might have been changed on the previous guess
        buttonElement.onclick = () => {
            if (this._userHasAlreadyGuessedForCurrentQuestion) {
                return;
            }
            this._userHasAlreadyGuessedForCurrentQuestion = true;
            const isCorrect = this.guess(guess);
            buttonElement.style.backgroundColor = isCorrect ? "green" : "red";
            setTimeout(() => {
                this._displayQuestion();
                this._userHasAlreadyGuessedForCurrentQuestion = false;
            }, 1500);
        }
    }

    _showScores() {
        const quizEndHTML = `
          <h1>Quiz Completed</h1>
          <h2 id='score'>You scored: ${this.score} of ${this.questions.length}</h2>
          <div class="quiz-repeat">
            <button class="btn" id="restartQuizButton" style="text-align: center; background-color:#3399ff;">Take Quiz Again</button>
            <button class="btn" id="quitQuizButtonEnd" style="text-align: center; background-color:#3399ff;" >Quit</button>
            <hr>
          </div>
        `;
        this._containerElement.innerHTML = quizEndHTML;
        const restartButton = document.getElementById("restartQuizButton");
        const quitButton = document.getElementById("quitQuizButtonEnd");
        quitButton.addEventListener("click", () => this.quit());
        restartButton.addEventListener("click", () => this._reset());
        clearInterval(this.quizTimer);
    }

    _startCountdown() {
        const time = 0.5;
        const quizTimeInMinutes = time * 60 * 60;
        let quizTime = quizTimeInMinutes / 60;

        const countdownElement = document.getElementById("count-down");
        this.quizTimer = setInterval(() => {
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




class QuizBuilder {
    constructor(entryElementId) {
        this.containerElement = document.getElementById(entryElementId)
    }

    _quizBuilderHTMLBody() {
        return `
        <h1>Quiz Builder</h1>
        <form>
            <div>
                <h2 id="quizNameHeader"> Enter a Quiz Name:</h2>
            </div>
            <hr>
            <h2>Questions</h2>
            <hr>
            <div id="questionsContainer">
            </div>
        </form>
        <hr>
        <button class="btn" id="saveQuiz" style="text-align: center; background-color:#3399ff;" >Save</button>
        <button class="btn" id="quizBuilderQuit" style="text-align: center; background-color:#3399ff;" >Quit</button>
    `
    }

    start() {
        this.containerElement.innerHTML = this._quizBuilderHTMLBody();
        this._createInputElements();
        const button = document.getElementById('quizBuilderQuit');
        button.onclick = () => this.quit();
        const startEvent = new Event("QuizBuilder:start");
        this.containerElement.dispatchEvent(startEvent);
    }

    _createInputElements() {
        const newQuestionButton = document.createElement("button");
        const questionsContainer = document.getElementById("questionsContainer");
        const quizNameHeader = document.getElementById("quizNameHeader");

        const quizNameInput = document.createElement("input");
        const questionText = document.createElement("input");
        const choices = document.createElement("input");
        const answer = document.createElement("input");

        const questionTextHeader = document.createElement("text");
        const choicesHeader = document.createElement("text");
        const answerHeader = document.createElement("text");

        quizNameHeader.appendChild(quizNameInput);
        questionsContainer.appendChild(questionTextHeader);
        questionsContainer.appendChild(questionText);
        questionsContainer.appendChild(choicesHeader);
        questionsContainer.appendChild(choices);
        questionsContainer.appendChild(answerHeader);
        questionsContainer.appendChild(answer);
        questionsContainer.appendChild(newQuestionButton);

        questionTextHeader.innerHTML = "Type in a question:";
        choicesHeader.innerHTML = "Type in the choices (comma separated): ";
        answerHeader.innerHTML = "Type in an answer:";

        quizNameInput.placeholder = "Type in a quiz name..."
        questionText.placeholder = "Type in a question...";
        choices.placeholder = "Type in the choices...";
        answer.placeholder = "Type in an answer...";

        questionTextHeader.className = "inputHeaderStyle"
        questionTextHeader.className = "inputHeaderStyle";
        choicesHeader.className = "inputHeaderStyle";
        answerHeader.className = "inputHeaderStyle";
        quizNameInput.className = "inputStyles";
        questionText.className = "inputStyles";
        choices.className = "inputStyles";
        answer.className = "newQuestionButton";
        newQuestionButton.className = "newQuestionButton"
        
    }

    save() {

    }

    addQuestion() {

    }

    quit() {
        this.containerElement.textContent = '';
        const quitEvent = new Event("QuizBuilder:quit");
        this.containerElement.dispatchEvent(quitEvent);
    }
}
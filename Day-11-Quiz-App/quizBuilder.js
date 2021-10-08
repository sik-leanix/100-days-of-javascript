class QuizBuilder {
    _addQuestionButtonId = "newQuestionButton";
    _saveQuizButtonId = "saveQuizButton";
    allQuestionsAreValid = true;
    constructor(entryElementId, questionsContainerMaxHeight) {
        this.containerElement = document.getElementById(entryElementId)
        this.questionsContainerMaxHeight = questionsContainerMaxHeight;
    }

    _quizBuilderHTMLBody() {
        return `
        <h1>Quiz Builder</h1>
        <form>
            <div>
                <h2 id="quizNameHeader"> Enter a Quiz Name:</h2>
                <input id="quizTitle" class="inputStyles questionTitle" placeholder = "Type in a quiz name..." required></input>
            </div>
            <hr>
            <h2>Questions</h2>
            <div id="questionsContainer">
            </div>
            <div>
                <button type="button" id="${this._addQuestionButtonId}">+ Add Question</button>
            </div>  
        <hr>
        <button type="submit" class="btn" id="${this._saveQuizButtonId}" style="text-align: center; background-color:#3399ff;">Save</button>
        </form>
        <button class="btn" id="quizBuilderQuit" style="text-align: center; background-color:#3399ff;" >Quit</button>
    `
    }

    start() {
        this.containerElement.classList.add("quizBuilderContainer");
        this.containerElement.innerHTML = this._quizBuilderHTMLBody();
        this.addQuestionButton = document.getElementById(this._addQuestionButtonId);
        this.saveButton = document.getElementById(this._saveQuizButtonId);
        this._createInputElements();
        const button = document.getElementById('quizBuilderQuit');
        button.onclick = () => this.quit();
        const startEvent = new Event("QuizBuilder:start");
        this.containerElement.dispatchEvent(startEvent);
        this._registerFormSubmitListener();
        this._registerAddQuestionButtonListener();
        if (this.questionsContainerMaxHeight) {
            this._addOverflowStylesToQuestionContainer();
        }
        this._registerSubmitFromSelect();
    }

    _registerSubmitFromSelect() {
        const button = document.getElementById("editQuizButton");
        const select = document.getElementById("editQuizSelect")
        console.log(select.value)
        button.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log(select.value);
        })
    }

    _registerFormSubmitListener() {
        const form = this.containerElement.getElementsByTagName("form")[0];
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.save();
        }) 
    }

    _registerAddQuestionButtonListener() {
        this.addQuestionButton.addEventListener("click", () => {
            this.addQuestion();
        })
    }

    save() {
        if (this.allQuestionsAreValid) { 
            const questions = this._getQuestionsArrayFromInputValues();
            const quizTitle = document.getElementById('quizTitle').value;
            const quiz = {
                title: quizTitle,
                questions,
            };
            const existingQuizzesString = localStorage.getItem('SidneyQuiz:custom');
            if (existingQuizzesString) {
                const existingQuizzes = JSON.parse(existingQuizzesString);
                localStorage.setItem('SidneyQuiz:custom', JSON.stringify(existingQuizzes.concat(quiz)));
            } else {
                localStorage.setItem('SidneyQuiz:custom', JSON.stringify([quiz]));
            }
            this.quit()
        }
        
    }
    addQuestion() {
        this.newHR = document.createElement("hr");
        this.questionsContainer.appendChild(this.newHR);
        this._createInputElements()
    }

    quit() {
        this.containerElement.classList.remove("quizBuilderContainer");
        this.containerElement.textContent = '';
        const quitEvent = new Event("QuizBuilder:quit");
        this.containerElement.dispatchEvent(quitEvent);
    }

    _createInputElements() {
        this.questionsContainer = document.getElementById("questionsContainer");

        const removeQuestionButton = document.createElement("button");
        const questionText = document.createElement("input");
        const choices = document.createElement("input");
        const answer = document.createElement("input");
        const error = document.createElement("span");
        questionText.setAttribute("required", "");
        choices.setAttribute("required", "");  
        answer.setAttribute("required", "");  

        this._registerInputValidation(choices, answer, error)
        

        const questionTextHeader = document.createElement("text");
        const choicesHeader = document.createElement("text");
        const answerHeader = document.createElement("text");

        this.questionsContainer.appendChild(removeQuestionButton);
        this.questionsContainer.appendChild(questionTextHeader);
        this.questionsContainer.appendChild(questionText);
        this.questionsContainer.appendChild(choicesHeader);
        this.questionsContainer.appendChild(choices);
        this.questionsContainer.appendChild(answerHeader);
        this.questionsContainer.appendChild(answer);
        this.questionsContainer.appendChild(error);


        // Shows removeQuestionButton 
        removeQuestionButton.textContent = "Remove Questions";
        removeQuestionButton.className = "removeQuestionButton";
        choicesHeader.style.display = "inline-block";

        removeQuestionButton.addEventListener("click", (event) => {
            event.preventDefault();
            removeQuestionButton.remove();
            questionTextHeader.remove();
            questionText.remove();
            choicesHeader.remove();
            choices.remove();
            answerHeader.remove();
            answer.remove();
            error.remove();
            this.newHR.remove();
        })
        
        questionTextHeader.textContent = "Type in a question:";
        choicesHeader.textContent = "Type in the choices (comma separated): ";
        answerHeader.textContent = "Type in an answer:";

        questionText.placeholder = "Type in a question...";
        choices.placeholder = "Type in the choices...";
        answer.placeholder = "Type in an answer...";

        questionTextHeader.className = "inputHeaderStyle"
        questionTextHeader.className = "inputHeaderStyle";
        choicesHeader.className = "inputHeaderStyle";
        answerHeader.className = "inputHeaderStyle";
        questionText.className = "inputStyles questionText";
        choices.className = "inputStyles questionChoices";
        answer.className = "inputStyles questionAnswer";
        error.className = "error"
    }

    _registerInputValidation(choicesElement, answerElement, errorElement) {
        const validateAnswer = () => {
            const answerValue = answerElement.value;
            const choicesValue = choicesElement.value;  
            const arrayChoices = choicesValue.split(",").map((choice) => choice.trim());
            const answerIsInChoices = arrayChoices.includes(answerValue.trim())
            if (answerIsInChoices) {
                this.allQuestionsAreValid = true;
                errorElement.style.display = "none";
                this.saveButton.disabled = false;
                answerElement.style.borderColor = "";
            } else {
                errorElement.style.display = "block";
                errorElement.textContent = "This answer is not available as a choice";
                this.allQuestionsAreValid = false;
                this.saveButton.disabled = true;
                answerElement.style.borderColor = "red";
            }
        }
        answerElement.addEventListener('input', validateAnswer);
        choicesElement.addEventListener('input', validateAnswer);
    }

    _getQuestionsArrayFromInputValues() {
        // Step 1: We select all the input elements that contain the info that we need to construct our question objects.
        // querySelectorAll returns the elements in the order as they are in the HTML.
        const formElements = document.querySelectorAll('.questionText, .questionChoices, .questionAnswer');
        // Step 2: we create an empty object where we can write the properties of the questions into, until one question is complete, at which point we empty it again.
        // This is just a "helper object"
        let tempQuestion = {};
        
        // Step 3: document.querySelectorAll returns a NodeList object, which does not support any of the array function we are used to.
        // We use Array.from() to convert it into an Array.
        const formElementsArray = Array.from(formElements);
        
        // Step 4: Loop over each element, get their value and put it into the matching Question property based on their CSS class.
        return formElementsArray.reduce((questions, element) => {
            // we can rely on the order of the three inputs to know
            // when one question ends and a new one starts
            if (element.classList.contains('questionText')) {
                // since this element has the .questionText CSS class we know that its value should be the text of the question.
                tempQuestion.text = element.value;
            } else if (element.classList.contains('questionChoices')) {
                // since this element has the .questionChoices CSS class we know that its value should be the choices of the question.
                tempQuestion.choices = element.value
                .split(',') // Turn it into an array, where comma is the delimeter.
                .map((choice) => choice.trim()); // trim cuts of spaces to the left and right of a choice
            } else if (element.classList.contains('questionAnswer')) {
                // since this element has the .questionAnswer CSS class we know that its value should be the answer of the question.
                tempQuestion.answer = element.value;
                // At this point our tempQuestion object contains a complete question and we can push it into our questions array.
                // If there are input elements remaining in the formElementsArray then the element in
                // the next iteration will be the .questionText input of the next question.
                questions.push(tempQuestion);
        
                // We empty our helper object to be ready for the next question content if there are more elements to loop over.
                tempQuestion = {};
            }
            return questions;
        }, []);
    }

    _addOverflowStylesToQuestionContainer() {
        if (this.questionsContainerMaxHeight) {
            this.containerElement.style.setProperty('--questions-max-height', this.questionsContainerMaxHeight);
            this.questionsContainer.classList.add("overflowScroll");
        }
    }
}
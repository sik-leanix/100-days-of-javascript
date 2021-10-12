class QuizBuilder {
    _addQuestionButtonId = "newQuestionButton";
    _saveQuizButtonId = "saveQuizButton";
    _allQuestionsAreValid = true;
    constructor(entryElementId, quizDataToEdit, questionsContainerMaxHeight) {
        this._containerElement = document.getElementById(entryElementId)
        this.questionsContainerMaxHeight = questionsContainerMaxHeight;
        this.quizDataToEdit = quizDataToEdit;
    }

    _quizBuilderHTMLBody() {
        return `
        <h1>Quiz Builder</h1>
        <form>
            <div>
                <h2 id="quizNameHeader"> Enter a Quiz Name:</h2>
                <input id="quizTitle" class="inputStyles questionTitle" placeholder = "Type in a quiz name..." required></input>
            </div>
            <h2>Questions</h2>
            <hr>
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
        this._containerElement.classList.add("quizBuilderContainer");
        this._containerElement.innerHTML = this._quizBuilderHTMLBody();
        this._addQuestionButton = document.getElementById(this._addQuestionButtonId);
        this._saveButton = document.getElementById(this._saveQuizButtonId);
        this._createInputElements();
        const button = document.getElementById('quizBuilderQuit');
        button.onclick = () => this.quit();
        const startEvent = new Event("QuizBuilder:start");
        this._containerElement.dispatchEvent(startEvent);
        this._registerFormSubmitListener();
        this._registerAddQuestionButtonListener();
        if (this.questionsContainerMaxHeight) {
            this._addOverflowStylesToQuestionContainer();
        }
        this._registerSubmitFromSelect();
    }

    save() {
        if (this._allQuestionsAreValid) { 
            const questions = this._getQuestionsArrayFromInputValues();
            const quizTitle = document.getElementById('quizTitle').value;
            const quiz = {
                title: quizTitle,
                questions,
            };
            const existingQuizzesString = localStorage.getItem('SidneyQuiz:custom');
            if (existingQuizzesString) {
                const existingQuizzes = JSON.parse(existingQuizzesString);
                if (this.quizDataToEdit) {
                    localStorage.setItem('SidneyQuiz:custom', JSON.stringify(existingQuizzes.map(existingQuiz => {
                        if (existingQuiz.title === this.quizDataToEdit.title) {
                            existingQuiz.questions = questions
                        }
                        return existingQuiz;
                    })));
                } else {
                    localStorage.setItem('SidneyQuiz:custom', JSON.stringify(existingQuizzes.concat(quiz)));
                }
            } else {
                localStorage.setItem('SidneyQuiz:custom', JSON.stringify([quiz]));
            }
            this.quit()
        }
    }

    quit() {
        this._containerElement.classList.remove("quizBuilderContainer");
        this._containerElement.textContent = '';
        const quitEvent = new Event("QuizBuilder:quit");
        this._containerElement.dispatchEvent(quitEvent);
    }

    _registerSubmitFromSelect() {
        const button = document.getElementById("editQuizButton");
        this._editQuizSelect = document.getElementById("editQuizSelect")
        button.addEventListener("submit", (event) => {
            event.preventDefault();
        })
    }

    _registerFormSubmitListener() {
        const form = this._containerElement.getElementsByTagName("form")[0];
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.save();
        }) 
    }

    _registerAddQuestionButtonListener() {
        this._addQuestionButton.addEventListener("click", () => {
            this._addQuestion();
        })
    }

    _addQuestion() {
        const newHR = document.createElement("hr");
        this._questionsContainer.appendChild(newHR);
        this._addInputElementsForOneQuestion()
    }

    _createInputElements() {
        if (this.quizDataToEdit) {
            const quizTitle = document.getElementById("quizTitle");
            quizTitle.disabled = true
            quizTitle.value = this.quizDataToEdit.title;
            this.quizDataToEdit.questions.forEach((question) => {
                this._addInputElementsForOneQuestion(question);
            })
        } else {
            this._addInputElementsForOneQuestion();
        }
    }

    _addInputElementsForOneQuestion(questionData) {
        this._questionsContainer = document.getElementById("questionsContainer");

        const questionText = document.createElement("input");
        const choices = document.createElement("input");
        const answer = document.createElement("input");
        const error = document.createElement("span");
        questionText.setAttribute("required", "");
        choices.setAttribute("required", "");  
        answer.setAttribute("required", "");  

        if (questionData) {
            choices.value = questionData.choices;
            answer.value = questionData.answer;
            questionText.value = questionData.text;
        }

        this._registerInputValidation(choices, answer, error)
        

        const questionTextHeader = document.createElement("text");
        const choicesHeader = document.createElement("text");
        const answerHeader = document.createElement("text");

        this._questionsContainer.appendChild(questionTextHeader);
        this._questionsContainer.appendChild(questionText);
        this._questionsContainer.appendChild(choicesHeader);
        this._questionsContainer.appendChild(choices);
        this._questionsContainer.appendChild(answerHeader);
        this._questionsContainer.appendChild(answer);
        this._questionsContainer.appendChild(error);
        
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
                this._allQuestionsAreValid = true;
                errorElement.style.display = "none";
                this._saveButton.disabled = false;
                answerElement.style.borderColor = "";
            } else {
                errorElement.style.display = "block";
                errorElement.textContent = "This answer is not available as a choice";
                this._allQuestionsAreValid = false;
                this._saveButton.disabled = true;
                answerElement.style.borderColor = "red";
                answerElement.style.borderRadius = "5px"
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
            this._containerElement.style.setProperty('--questions-max-height', this.questionsContainerMaxHeight);
            this._questionsContainer.classList.add("overflowScroll");
        }
    }
}
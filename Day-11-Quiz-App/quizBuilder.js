class QuizBuilder {
    constructor() {
        const containerElement = document.getElementById("createQuiz")

    }

    _quizBuilderHTMLBody() {
        return `
        <h1>Quiz Builder</h1>
        <form> 
            <div class="form-group">
                <label for="inputName">Enter a Quiz Name</label>
                <input type="Quizname" class="form-control form-control-lg" id="inputName" placeholder="Enter a name...">
                <small>Ja</small>
            </div>
            <hr>
            <h2>Questions</h2>
            <hr>
            <div class="inputQuestions">\
                <input type="text" class="input-" placeholder="Type in a question..." />
                <input type="text" class="input-" placeholder="Type in the choices..." />
                <input type="text" class="input-" placeholder="Type in the correct answer..." />
            </div>
        </form>
        <hr>
        <button class="btn" id="quitQuizButtonEnd" style="text-align: center; background-color:#3399ff;" >Quit</button>
    `
    }

    _displayInputField() {
        
    }

    start() {
        const containerElement = document.getElementById("createQuiz")
        containerElement.innerHTML = this._quizBuilderHTMLBody();
        // const button = document.getElementById('quitQuizButton');
        // button.onclick = () => this.quit();
        // const startEvent = new Event("SidneyQuiz:start");
        // this.containerElement.dispatchEvent(startEvent);
    }
}
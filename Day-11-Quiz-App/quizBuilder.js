class QuizBuilder {
    constructor() {
        const containerElement = document.getElementById("createQuiz")

    }

    _quizBuilderHTMLBody() {
        return `
        <h1>Quiz Builder</h1>
        <input type="text" class="input-" placeholder="Enter a word..." />
        <hr>
        <div class="inputQuestions">
        <hr>
        <button class="btn" id="quitQuizButtonEnd" style="text-align: center; background-color:#3399ff;" >Quit</button>
    `
    }

    _displayInputField() {
        
    }

    start() {
        
        this.containerElement.innerHTML = this._quizBuilderHTMLBody();
        const button = document.getElementById('quitQuizButton');
        button.onclick = () => this.quit();
        const startEvent = new Event("SidneyQuiz:start");
        this.containerElement.dispatchEvent(startEvent);
    }
}
# QuizApp Framework
This is my QuizApp Framework repository. It contains a framework for building a quiz, which you can use to query what has been learned or just for a funny friday evening with your friends. 

## Demo
You can see a demo on [this Website](https://sik-leanix.github.io/100-days-of-javascript/Day-11-Quiz-App/index.html).

## Install Quiz App
You can easily use the QuizApp by adding this to your HTML file:

```HTML 
 <script src="https://sik-leanix.github.io/100-days-of-javascript/Day-11-Quiz-App/app.js"></script>
```

Don't forget to include the CSS File in your Header:

```HTML
 <link rel="stylesheet" href="https://sik-leanix.github.io/100-days-of-javascript/Day-11-Quiz-App/quizFramework.css">
```

## How to use it

In the example you can see there are two questions with four different choices. The correct answer is described next to the choices. If you want to change or add questions just stick to the pattern. You can add a custom amount of choices. You change the name of the quiz in the section ``quizName``. 


```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Quiz</title>
    <link rel="stylesheet" href="https://sik-leanix.github.io/100-days-of-javascript/Day-11-Quiz-App/quizFramework.css">
</head>
  <body>
    <div class="container">
        <div class="quiz-box">
            <div id="quizChooser" style="padding-top: 20px;">
                <button class="btn" id="startQuiz" style="text-align: center">Start the Quiz</button>
            </div>
            <div id="quiz"></div>
        </div>
     
    </div>
      <script src="https://sik-leanix.github.io/100-days-of-javascript/Day-11-Quiz-App/app.js"></script>
      <script>
          const questions = `[
              {"text":"What is 1 + 1 ?", "choices":["1", "2", "50", "40"], "answer":"2"},
              {"text":"What is 2 + 2 ?", "choices":["1", "2", "3", "4"], "answer":"4"}
            ]`;
          const quizName = 'Demo';
          const quizElementId = 'quiz';
          const startQuizButton = document.getElementById("startQuiz");
          startQuizButton.addEventListener("click", () => {
              new Quiz(questions, quizElementId, quizName).start()
          });
          const quizElement = document.getElementById('quiz');
          quizElement.addEventListener("SidneyQuiz:start", () => {
              startQuizButton.style.display = "none";
          });
          quizElement.addEventListener("SidneyQuiz:quit", () => {
              startQuizButton.style.display = "block";
          });
      </script>
  </body>
</html>
```

## API

* `Quiz`
  * [`new Quiz(questions ,quizElementId, quizName)`](#new)
  * [`.guess(answer)`](#guess-answer)
  * [`.start()`](#start)
  * [`.quit()`](#quit)
  * [`.getQuestionsFromJson(jsonString)`](#check-JSON)


* `Question`
  * [`.new Question(text, choices, answer)`](#new-Question)
  * [`.isCorrectAnswer(choice)`](#correctAnswer)


* * *

<a name="new"></a>
#### `new Quiz(questions, quizElementId, quizName)`

Initialize new quiz. The questions can be provided in two ways:

```Javascript
const questions = [
        new Question(
                "How many times has Roger Federer won Wimbledon playing singles?", ["7", "10", "8", "5"], "8"
            ),
        new Question(
            "How long does a quarter go in the NBA?", ["8 Minutes", "10 Minutes", "12 Minutes", "15 Minutes"], "12 Minutes"
        ),
``` 

Or: (more recommended)

```Javascript 
const questions = `[
              {"text":"What is 1 + 1 ?", "choices":["1", "2", "50", "40"], "answer":"2"},
              {"text":"What is 2 + 2 ?", "choices":["1", "2", "3", "4"], "answer":"4"}
            ]`;
```

| Param | Type | Description |
| --- | --- | --- |
| questions | `Question[] | JSON string` | Input for definded questions in an array |
| quizElementId | `String` | ID of the element to mount the quiz into |
| quizName | `String` | Title of the quiz. Displayed on top |

* * *

<a name="guess-answer"></a>
#### `guess(answer)`

Use to select a choice of the active question.

| Param | Type | Description |
| --- | --- | --- |
| answer | `String` |  Chosen answer  |

* * *

<a name="start"></a>
#### `Quiz.start()`

Start quiz. At this point the quiz HTML will be inserted into the provived element.

Dispatches the `SidneyQuiz:start` event on the quiz container for you to react to from the outside.

* * *

<a name="quit"></a>
#### `Quiz.quit()`

Quits the quiz.

Dispatches the `SidneyQuiz:quit` event on the quiz container for you to react to from the outside.

* * *

<a name="check-JSON"></a>
#### `getQuestionsFromJson(jsonString)`

Checks if the JSON String contains all the requirements (Text, choices, answer).
If not it throws an error.

Returns an array of `Question` objects that were parsed to the JSON string.

* * *

<a name="new-Question"></a>
### `new Question(text, choices, answer)`

| Param | Type | Description |
| --- | --- | --- |
| text | `String` | Input Question |
| choices | `String[]` | Selection choices |
| answer | `String` | Correct Answer |

*** 

<a name="correctAnswer"></a>
### `.isCorrectAnswer(choice)`

Returns if the given choice is the correct answer.

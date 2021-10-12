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
  * [`Quiz.guess(answer)`](#guess-answer)
  * [`Quiz.start()`](#start)
  * [`Quiz.quit()`](#quit)
  * [`Quiz.getQuestionsFromJson(jsonString)`](#check-JSON)
  * [`Quiz.score`](#score)
  * [`Quiz.questionIndex`](#questionIndex)
  * [`Quiz.questions`](#questions)
  * [`Quiz.quizTitle`](#quizTitle)
* `Question`
  * [`.new Question(text, choices, answer)`](#new-Question)
  * [`Question.isCorrectAnswer(choice)`](#correctAnswer)
* `QuizBuilder`
  * [`.new Question(text, choices, answer)`](#new-Question)


* * *

## Quiz

*** 
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
| questions | `Question[]` or JSON string | Input for definded questions in an array |
| quizElementId | `String` | ID of the element to mount the quiz into |
| quizName | `String` | Title of the quiz. Displayed on top |

* * *

<a name="guess-answer"></a>
#### `Quiz.guess(answer)`

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
#### `Quiz.getQuestionsFromJson(jsonString)`

Checks if the JSON String contains all the requirements (Text, choices, answer).
If not it throws an error.

Returns an array of `Question` objects that were parsed to the JSON string.

* * *

<a name="score"></a>
#### `Quiz.score`
**Type** `Number`

The `score` property is a number, which starts at 0 and counts up by 1, if the user answers a question correctly. If the quiz is completed the user will see the achieved score. 

*** 

<a name="questionIndex"></a>
#### `Quiz.questionIndex`
**Type** `Number`

The `questionIndex` property is a number, which also starts at 0. Every time the user completes a question no matter if the user is right or wrong, the `questionIndex` increases by one.

*** 

<a name="questions"></a>
#### `Quiz.questions`
**Type** `Question[]`

The `questions` property contains all the questions of the quiz that the were provided in the `constructor`.

*** 

<a name="quizTitle"></a>
#### `Quiz.quizTitle`
**Type** `String`

The `quizTitle` property contains the title of the quiz as a string. The user has the opportunity to provide a `quizTitle` in the `constructor`. If no title is given, the default value is "Quiz App". 

*** 
## Question 

*** 

<a name="new-Question"></a>
#### `new Question(text, choices, answer)`

| Param | Type | Description |
| --- | --- | --- |
| text | `String` | Input Question |
| choices | `String[]` | Selection choices |
| answer | `String` | Correct Answer |

*** 

<a name="correctAnswer"></a>
#### `Question.isCorrectAnswer(choice)`

Returns if the given choice is the correct answer.

*** 

### QuizBuilder

***

<a name=""></a>
#### ``

r

*** 
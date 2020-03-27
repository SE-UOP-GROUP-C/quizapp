let questionNo = 0;
let score = 0;
let noCorrect = 0;

// Uses the Fisher-Yates algorithm to shuffle an array
function shuffle(array) {
  var m = array.length,
    t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
}

// Function for finding an object within an array using its properties
function findWithAttr(array, attr, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}

let questions = [];
async function loadQuestions(topic) {
  document.body.innerHTML = '';
  const url = '/quiz/load?t=' + topic;
  const res = await fetch(url);
  questions = await res.json();
  displayQuestion();
}

async function displayQuestion() {
  shuffle(questions[questionNo].options); // Shuffles the answer to prevent the correct answer appearing in the same place every time
  const questionContainer = document.createElement('div');
  questionContainer.setAttribute('class', 'question');
  document.body.appendChild(questionContainer);

  const questionText = document.createElement('h2');
  questionText.setAttribute('id', 'questionText');
  questionText.textContent = questions[questionNo].question;
  questionContainer.appendChild(questionText);

  // Loops through all the answers and generates HTML elements for them
  for (var i = 0; i < questions[questionNo].options.length; i++) {
    const div = document.createElement('div');
    div.setAttribute('class', 'answer');
    div.textContent = questions[questionNo].options[i];
    questionContainer.appendChild(div);
  }
}

async function checkAnswer(target) {
  const question = findWithAttr(questions, 'question', document.querySelector('#questionText').innerHTML); // Finds the current question within the 'questions' JSON object
  let url = '/quiz/answer?q=' + answer + '&a=' + target.textContent; // Sends request to server containing the current question and the answer the user selected
  const res = await fetch(url);
  result = await res.json(); // Server checks whether the answer is correct and sends either "Correct" or "Incorrect" back

  if (result == "Correct") {
    target.style.backgroundColor = 'green';
    noCorrect += 1;
    score += 10;
  } else if (result == "Incorrect") {
    score -= 10;
    target.style.backgroundColor = 'red';
  }
  nextQuestion() // Regardless of whether the user was correct, the next question is loaded
}

function nextQuestion() {
  setTimeout(function() { // Delays loading the next question by half a second
    document.body.removeChild(document.querySelector(".question")); // Removes the previous question's HTML

    // Checks if the number of questions shown is less than 5 (500 milliseconds)
    if (questionNo < 4) { // If yes, move onto the next question
      questionNo += 1;

      displayQuestion();
    } else { // If no, end the quiz and display the score
      const scoreDisplay = document.createElement('p');
      scoreDisplay.innerHTML = "No. Correct(+10): " + (noCorrect) + "</br>No. Incorrect(-10): " + (5 - noCorrect) + "</br>Final Score: " + score;
      document.body.appendChild(scoreDisplay);
    }
  }, 500);

}



window.addEventListener('load', function() {
  document.addEventListener('click', function(e) {
    // If the user clicks one of the topics, use its value as the topicID and run loadQuestions()
    if (e.target && e.target.className == 'topicSelect') {
      loadQuestions(e.target.getAttribute("data-value"));
    }
  });
  document.addEventListener('click', function(e) {
    // If the user clicks an answer, use it as a paramater and run checkAnswer()
    if (e.target && e.target.className == 'answer') {
      checkAnswer(e.target);
    }
  });
});

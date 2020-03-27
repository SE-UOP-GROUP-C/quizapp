let questionNo = 0;
let currentTopic = "";
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

function loadQuestions(topic) {
  currentTopic = topic;
  const section = document.querySelector('section');
  document.body.removeChild(section);
  console.log("qweqwe");
  const url = './assets/json/questions/' + topic + '.json';
  fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      displayQuestion(data);
    });

}

async function displayQuestion(data) {
  shuffle(data[questionNo].options);
  const questionContainer = document.createElement('section');
  questionContainer.setAttribute('class', 'question');
  document.body.appendChild(questionContainer);

  const questionText = document.createElement('h2');
  questionText.setAttribute('id', 'questionText');
  questionText.textContent = data[questionNo].question;
  questionContainer.appendChild(questionText);

  // Loops through all the answers and generates HTML elements for them
  for (var i = 0; i < data[questionNo].options.length; i++) {
    const div = document.createElement('div');
    div.setAttribute('class', 'answer');
    div.textContent = data[questionNo].options[i];
    questionContainer.appendChild(div);
  }
}

async function checkAnswer(target) {

  const url = './assets/json/questions/' + currentTopic + '.json';
  fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      const question = findWithAttr(data, 'question', document.querySelector('#questionText').innerHTML); // Finds the current question within the 'questions' JSON object

      if (target.textContent == data[question].correct) {
        target.style.backgroundColor = 'rgb(67, 181, 129)';
        noCorrect += 1;
        score += 10;
      }
      else {
        score -= 10;
        target.style.backgroundColor = 'rgb(240, 71, 71)';
      }
    });

    nextQuestion() // Regardless of whether the user was correct, the next question is loaded
}

function nextQuestion() {
  const url = './assets/json/questions/' + currentTopic + '.json';
  fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      setTimeout(function() { // Delays loading the next question by half a second
        document.body.removeChild(document.querySelector(".question")); // Removes the previous question's HTML

        // Checks if the number of questions shown is less than 5 (500 milliseconds)
        if (questionNo < 4) { // If yes, move onto the next question
          questionNo += 1;

          displayQuestion(data);
        } else { // If no, end the quiz and display the score
          const section = document.createElement('section');
          const scoreDisplay = document.createElement('p');
          const returnHome = document.createElement('a');
          returnHome.setAttribute('id','back');
          returnHome.setAttribute('class', 'link');
          returnHome.setAttribute('href','home.html');
          returnHome.textContent = 'Return Home';
          scoreDisplay.innerHTML = "No. Correct(+10): " + (noCorrect) + "</br>No. Incorrect(-10): " + (5 - noCorrect) + "</br>Final Score: " + score;
          document.body.appendChild(section);
          section.appendChild(scoreDisplay);
          section.appendChild(returnHome);
        }
      }, 500);
    });



}

window.addEventListener('load', function() {
  document.addEventListener('click', function(e) {
    // If the user clicks one of the topics, use its value as the topicID and run loadQuestions()
    if (e.target && e.target.id == 'topicSelect') {
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

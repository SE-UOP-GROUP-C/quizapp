// This will change with the use of UUIDs but it works for now
let questionNo = 1;
let questionID = 1

// This is just to make adding attributes quicker
function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

// Gets the questions info and puts it onto the page
async function loadQuestion() {
  const url = '/load?q=' + questionID;
  const res = await fetch(url);
  const result = await res.json();

  const form = document.createElement('form');
  setAttributes(form, {
    'method': 'get',
    'class': 'question',
    'id': 'question' + questionNo
  });
  document.body.appendChild(form);

  const heading = document.createElement('h2');
  heading.textContent = result.question;
  form.appendChild(heading);

  // Loops through all the answers and generates HTML elements for them
  for (var i = 0; i < result.options.length; i++) {
    let id = "option" + (i + 1);
    const div = document.createElement('div');
    div.setAttribute('class', 'answer');
    const radio = document.createElement('input'); // Used radio buttons as they share one name so getting the value is easier
    setAttributes(radio, {
      "name": "a",
      "id": id,
      "value": result.options[i],
      "type": "radio"
    });
    const radioLabel = document.createElement('label');
    setAttributes(radioLabel, {
      "for": id,
      "id": id + "label"
    })
    radioLabel.textContent = result.options[i];
    form.appendChild(div);
    div.appendChild(radio);
    div.appendChild(radioLabel);
  }
}

async function checkAnswer() {
  const ele = document.getElementsByName('a');
  for (i = 0; i < ele.length; i++) { // Iterates through the radio buttons and tests if they're checked
    if (ele[i].checked) {
      const answer = ele[i].value; // Answer is assigned the value of the checked radio button
      let url = '/answer?q=' + questionID + '&a=' + answer; // Sends request with questionID and answer as parameters
      const res = await fetch(url);
      const result = await res.json(); // Server checks whether the answer is correct and sends something back
      alert(result);
    }
  }


  // Following part removes the current question from the page and loads the next one
  const questionForm = '#question' + questionNo;
  document.body.removeChild(document.querySelector(questionForm));
  if (questionNo < 5) {
    questionNo += 1;
    questionID += 1;
    loadQuestion()
  } else {
    const scoreDisplay = document.createElement('p');
    scoreDisplay.textContent = "Here is where the score would be displayed";
    document.body.appendChild(scoreDisplay);
  };

}


window.addEventListener('load', loadQuestion);
window.addEventListener('load', function() {
  document.addEventListener('click', function(e) {
    if (e.target && e.target.name == 'a') { // As the element is dynamically generated, element.addEventListener doesn't work
      checkAnswer();
    }
  });
});

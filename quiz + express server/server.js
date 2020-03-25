const fs = require('fs');
const express = require('express');
const app = express();
const fetch = require('node-fetch');
app.use(express.static('client')); // Sets the scope of what users can see to the 'client' folder
app.listen(80);

// Adds the PostgreSQL database
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'main',
  password: 'postgres',
  port: 5432
})


let questionsArray = [];

app.get('/quiz', (req, res) => {
  res.sendFile(__dirname + '/fact/quizSelect.html'); //Loads quizSelect.html when user goes to URL/quiz
});

app.get('/quiz/answer', (req, res) => { // Checks received answer against database and responds to client
  const questionID = req.query.q;
  const answer = '' + req.query.a;
  if (answer == questionsArray[questionID].correct) {
    res.json("Correct");
  }
  else {
    res.json("Incorrect");
  }
});



app.get('/quiz/load', (req, res) => {
  topicID = req.query.t;
  questionsArray.length = 0;
  let previousIDs = [];
  pool.query('SELECT question, ans, dum1, dum2 FROM questions WHERE topicID = $1', [topicID], (error, results) => { // Queries database for questions and answers based on the topic received from client
    if (error) {
      throw error;
    }


    for (var i = 0; i < 5; i++) { // Chooses 5 questions
    let q = {};
    let questionID = Math.floor(Math.random() * (results.rows.length)); // Picks random number between 0 and the table size
    while (previousIDs.indexOf(questionID) != -1) { // Checks that ID hasn't already been chosen
      questionID = Math.floor(Math.random() * (results.rows.length)); // If it has, pick again
    }
    // Puts everything into a JSON object and puts that into an array
    q.question = (results.rows[questionID].question);
    q.options = [results.rows[questionID].ans, results.rows[questionID].dum1, results.rows[questionID].dum2];
    q.correct = (results.rows[questionID].ans)
    questionsArray.push(q);
    previousIDs.push(questionID);
  }
  res.json(questionsArray); //Sends the array to the client
  });
});

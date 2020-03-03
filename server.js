const fs = require('fs');
const express = require('express');
const app = express();
const fetch = require('node-fetch');
app.use(express.static('fact')); // If you change the folder name then you need to change this too
app.listen(8080);

// Database credentials need to be changed as this is my own local db
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'main',
  password: 'postgres',
  port: 5432 // Leave this alone as the database will almost definitely use this port
})

// For the following, if you want to change the url then just change the '/whatever' part
// The only one that the client will see is '/quiz' but the others show up in the browser's network tab
app.get('/quiz', (req, res) => {
  res.sendFile(__dirname + '/fact/quizGenerate.html');
});

app.get('/answer', (req, res) => {
  const questionID = req.query.q;
  const answer = '' + req.query.a;
  let questionNo = 1;

  fetch('http://localhost:8080/load?q=' + questionID)
    .then(res => res.json())
    .then(data => {
      if (answer == data.correct) {
        res.json("Correct");
      } else {
        res.json("Incorrect");
      }
    })
    .catch(err => {
      console.log(err)
    });
});


app.get('/load', (req, res) => {
  const questionID = req.query.q;
  let q = {};

  pool.query('SELECT question, options, correct FROM questions WHERE topicID = $1', [2], (error, results) => { // This is how you do queries
    if (error) {
      throw error;
    } // If you want to use the values of the query then make sure it is within the curly brackets (inside 'pool.query')
    q.question = (results.rows[questionID - 1].question); // Results are given in array form so you need the square brackets
    q.options = (results.rows[questionID - 1].options);
    q.correct = (results.rows[questionID - 1].correct)
    res.json(q);
  });
});

const express = require ('express');
const mongoose = require ('mongoose');
var Schema = mongoose.Schema;
const port = 80;
const app = express();

function SetupServer()
{
  //Place server-init methods here
  //Once server has been setup, display a message in console
  console.log("Server hosted on port " + port)
}

app.listen(port, SetupServer(), );


//Define Schemas for use with MongoDB
var userSchema = new Schema({
  email: String,
  username: String,
  admin: Boolean,
  noti_email: Boolean,
  noti_push: Boolean,
  noti_time: Number,
  score: Number
});

var factSchema = new Schema({
  topic: Number,
  text: String,
  sub_id: String
})

var submittedFactSchema = new Schema({
  userID: String,
  text: String
})

var questionSchema = new Schema({
  dum1: String,
  dum2: String,
  ans: String,
  text: String,
  topic: Number
})

//Create a connection to the database
mongoose.connect('mongodb://localhost:27017/app', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    console.log('Successfully connected to database.');
    console.log("Displaying contents of the database");
  })
  .catch((error)=>{
    console.log("Unable to connect to database");
    console.log(error);
  });
let db = mongoose.connection;

//Create models for interacting with database based on previously defined
//schemas.
var userModel = db.model("User", userSchema);
var factModel = db.model("Fact", factSchema);
var questionModel = db.model("Question", questionSchema);
var submissionModel = db.model("Submission", submittedFactSchema)

function populateFacts(){
  //Brute force method - can be simplified?
  var fact = new factModel({topic: 1, text: 'Napoleon Was Once Attacked By a Horde of Bunnies.', sub_id: '-1'});
  fact.save(function(err){
    if (err) return console.log(err);
  });

  fact = new factModel({topic: 1, text: 'Thomas Edison Didnt Invent the Light Bulb.', sub_id: '-1'});
  fact.save(function(err){
    if (err) return console.log(err);
  });

  fact = new factModel({topic: 1, text: 'Cleopatra Was Greek', sub_id: '-1'});
  fact.save(function(err){
    if (err) return console.log(err);
  });

  fact = new factModel({topic: 1, text: 'All British tanks since 1945 have included equipment to make tea.', sub_id: '-1'});
  fact.save(function(err){
    if (err) return console.log(err);
  });

  fact = new factModel({topic: 2, text: 'California has more people than all of Canada.', sub_id: '-1'});
  fact.save(function(err){
    if (err) return console.log(err);
  });

  fact = new factModel({topic: 2, text: 'Australia is wider than the moon.', sub_id: '-1'});
  fact.save(function(err){
    if (err) return console.log(err);
  });

  fact = new factModel({topic: 2, text: 'Vatican City is the smallest country in the world.', sub_id: '-1'});
  fact.save(function(err){
    if (err) return console.log(err);
  });

  fact = new factModel({topic: 3, text: 'The average human body carries ten times more bacterial cells than human cells.', sub_id: '-1'});
  fact.save(function(err){
    if (err) return console.log(err);
  });

  fact = new factModel({topic: 3, text: 'Water can boil and freeze at the same time.', sub_id: '-1'});
  fact.save(function(err){
    if (err) return console.log(err);
  });

  fact = new factModel({topic: 3, text: '20% of Earth’s oxygen is produced by the Amazon rainforest.', sub_id: '-1'});
  fact.save(function(err){
    if (err) return console.log(err);
  });
}
function populateQuestions(){
  var question = new questionModel({dum1: 'Elephants', dum2: 'Horses', ans: 'Bunnies',
                                    text: 'Napoleon Was Once Attacked By a Horde of ___', topic: 1});
  question.save(function(err){
    if (err) return console.log(err);
  });

  question = new questionModel({dum1: 'Phonograph', dum2: 'Movie camera', ans: 'Light bulb',
                                    text: 'Thomas Edison Didnt Invent the ___', topic: 1});
  question.save(function(err){
    if (err) return console.log(err);
  });

  question = new questionModel({dum1: 'Egyptian', dum2: 'Roman', ans: 'Greek',
                                    text: 'Cleopatra Was ___', topic: 1});
  question.save(function(err){
    if (err) return console.log(err);
  });

  question = new questionModel({dum1: 'Bombs', dum2: 'coffee', ans: 'Tea',
                                    text: 'All British tanks since 1945 have included equipment to make ___', topic: 1});
  question.save(function(err){
    if (err) return console.log(err);
  });

  question = new questionModel({dum1: 'South Africa', dum2: 'India', ans: 'Canada',
                                    text: 'California has more people than all of ___', topic: 2});
  question.save(function(err){
    if (err) return console.log(err);
  });

  question = new questionModel({dum1: 'The planet Mars', dum2: 'The planet Venus', ans: 'The moon',
                                    text: 'Australia is wider than ___', topic: 2});
  question.save(function(err){
    if (err) return console.log(err);
  });

  question = new questionModel({dum1: 'Malta', dum2: 'Cyprus', ans: 'Vatican City',
                                    text: 'The smallest country in the world is ___', topic: 2});
  question.save(function(err){
    if (err) return console.log(err);
  });

  question = new questionModel({dum1: '12', dum2: '15', ans: '10',
                                    text: 'The average human body carries ___ times more bacterial cells than human cells', topic: 3});
  question.save(function(err){
    if (err) return console.log(err);
  });

  question = new questionModel({dum1: 'extinguish', dum2: 'evaporate', ans: 'freeze',
                                    text: 'Water can boil and ___ at the same time', topic: 3});
  question.save(function(err){
    if (err) return console.log(err);
  });

  question = new questionModel({dum1: '10', dum2: '15', ans: '20',
                                    text: '___% of Earth’s oxygen is produced by the Amazon rainforest', topic: 3});
  question.save(function(err){
    if (err) return console.log(err);
  });
}

//If an error occurs when connecting to the database display in console
db.on('error', console.error.bind(console, 'connection error: '));
//Once connected to the database
db.once('open', function(){

  //Display contents of each model
  userModel.find(function(err, contents){
    if (err) return console.console.error(err);
    console.log("==============================");
    console.log("User Model");
    console.log("==============================");
    console.log(contents);
  })
  factModel.find(function(err, contents){
    if (err) return console.console.error(err);
    console.log("==============================");
    console.log("Fact Model");
    console.log("==============================");
    console.log(contents);

    //Check if contents empty
    if (contents.length == 0) {
      console.log("Facts Model is empty. Populating with data.")
      populateFacts()
    }
  })
  questionModel.find(function(err, contents){
    if (err) return console.console.error(err);
    console.log("==============================");
    console.log("Question Model");
    console.log("==============================");
    console.log(contents);

    //Check if contents empty
    if (contents.length == 0) {
      console.log("Questions Model is empty. Populating with data.")
      populateQuestions()
    }
  })
  });


app.post(window.location.href, function(request, response){
  console.log("a");
  if (request.type == "check") {
    results = userModel.find(function (err, contents){
      if (err) return console.console.error(err);
      if (contents.length == 0) {

      }
  });
  }
})

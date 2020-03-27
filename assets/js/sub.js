/**
this function was created to validate the inputs from the user
*/
function validate(){
  /* declaring the variables using id's */
  var topic = document.getElementById("topic").value;
  var fact = document.getElementById("fact").value;
  var email = document.getElementById("email").value;
  var status = document.getElementById("status");

/*
Conditions for email making sure that an @ and a . must be included and also having more that 5 characters to insure the email is correct, if the email does not meet one of the criteria a text message below the input boxes will appear informing the user about the email being invalid, so the user can rewrite a correct email.
*/
  if(email.indexOf("@") == -1 || email.length < 5 || email.indexOf(".") == -1){
    text = "Please enter valid email";
    status.innerHTML = text;
    return false;
  }
/*
 Having topic length to 3 to insure that the topic is a word with more than 3 words, and an error message indicating if that clause is not met write more than 3 words.
*/
  if(topic.length <= 2){
    text = "Please enter a valid topic, more than 3 characters ";
    status.innerHTML = text;
    return false;
  }
/*
 Having fact being more than 10 characters to give enough information to make it a sentence that is about a fact with relevent enough information that the admin can validate and determine that the fact is valid.
*/
  if(fact.length <= 10){
    text = "Please enter more than 10 characters";
    status.innerHTML = text;
    return false;
  }

/*
Alerting the user with a pop up message informing them that they need to click on send and their fact will be reviewed, then they can reset the form and send another fact if they wish.
*/
    alert("Press send and your fact will be submitted for review");
    return true;

  }



/*

personal sources i used to help me with coding:
https://flaviocopes.com/how-to-string-contains-substring-javascript/
https://www.w3schools.com/jsref/dom_obj_var.asp
https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
https://www.w3schools.com/tags/tag_div.asp
https://www.w3schools.com/jsref/jsref_if.asp
*/

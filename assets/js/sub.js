
function validate(){
  /* declaring the variables*/
  var topic = document.getElementById("topic").value;
  var fact = document.getElementById("fact").value;
  var email = document.getElementById("email").value;
  var status = document.getElementById("status");

/* conditions to insure the information is correct*/
  if(email.indexOf("@") == -1 || email.length < 5){
    text = "Please enter valid email";
    status.innerHTML = text;
    return false;
  }

  if(topic.length <= 3){
    text = "Please enter a valid topic, more than 3 characters ";
    status.innerHTML = text;
    return false;
  }

  if(fact.length <= 20){
    text = "Please enter more than 20 characters";
    status.innerHTML = text;
    return false;
  }


    alert("Your fact was submitted for review");
    return true;

  }



/*
it suppose to be that all 3 valuation need to
 be true so it goes through

sources i used
https://flaviocopes.com/how-to-string-contains-substring-javascript/
https://www.w3schools.com/jsref/dom_obj_var.asp
https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
https://www.w3schools.com/tags/tag_div.asp
https://www.w3schools.com/jsref/jsref_if.asp
*/

/**
 *  This is a demonstration of how the fact page would present and store facts.
 *  Future for this would be to have the 'seen' array submit to the database and
 *  pulling data would not be done through multiple 'facts' being in the same json file.
 */
const main = document.querySelector('main');
const select = document.querySelector('select');
const label = document.querySelector('label');
const p = document.createElement('p');
let req = new XMLHttpRequest();
let tVal = 0; // topic value that is selected on the drop down and then 'submit'
let count = 0;
let list = []; // this stores the topic_id's in which they are randomly selected according to index, then display the fact.text under them.
let seen = ["tom"]; // this would be called from the database and then updated, at the end of the session it would then be posted back
/**
 *  TEST CASE - seen array
 *  "tom" under topic_1 aka value "1"
 *  as well as this the document logs its
 *  steps as the console.log()'s are set off
 */

let topics = ["History", "Geography", "Science"]; // hard coded
            // 1,2,3 eg
let url = [
    "/quizapp/assets/json/topic_1.json",
    "/quizapp/assets/json/topic_2.json",  // Example facts
    "/quizapp/assets/json/topic_3.json"
]

/**
 *  This function checks which topic has been selected, the corrisponding value is
 *  passed to which the specific JSON file is used and then calls getMain() function
 */
function getTopic() {
    tVal = document.getElementById("topic").value;
    if (tVal !== "0" && count >= 0){
        let indexVal = tVal - 1;
        getMain(url[indexVal]);
        document.getElementById("subT").remove();
    }
    else {
      alert("Please select a topic!");
    }
    return tVal;
}

// listener for button submit
document.addEventListener("DOMContentLoaded", function () {
    let item1 = document.getElementById("subT");
    item1.addEventListener("click", getTopic);
});
// listener for button new fact
document.addEventListener("DOMContentLoaded", function () {
    let item2 = document.getElementById("nFact");
    item2.addEventListener("click", rePushHead);
});
// listener for button reload
document.addEventListener("DOMContentLoaded", function () {
    let item3 = document.getElementById("nTopic");
    item3.addEventListener("click", reloadPage);
});

/**
 *  This function takes the location of the topic JSON file and then makes a 'GET' XMLHttpRequest
 */
function getMain(url) {
    req.open('GET', url, true);
    req.onerror = function () {
      alert("Error: Please check your connection and refresh.");
    }
    req.responseType = 'json';
    req.send();
}

// this assigns the request reponse into a const called data which is then passed to pushMain()
req.onload = function(){
  const data = req.response;
  pushMain(data);
}

/**
 *  This function gets a random integer between 0 and n-1, which n is == max
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 *  This function takes the JSON file and runs throught the array adding the
 *  topic_id data to list array, it checks if a user has already seen a topic_id
 *  and if it has it skips adding the topic_id data to the list. It then chooses a
 *  random index number from the list, it then displayes this in the main tag.
 *  The topic_id is then pushed into the seen array and pandsFunc() is called.
 */
function pushMain(data) {
    const raw = data['raw'];
    count++;
    console.log(count);
    // the loop count the amount of facts under that topic
    for( let i = 0; i < raw.length; i++){
        // specific topic filter
        if (count >= 1 && raw[i].topic == tVal) {
          /**
           *  The test case for this is the topic_id that is called "tom" (within topic_1 JSON)
           *  This should in this case have "tom" within the seen array (line 14), from here the
           *  specific fact "Thomas Edison Didnt Invent the Light Bulb." should not show.
           */
          // check if .topic_id is in seen array
          if (seen.includes(raw[i].topic_id) == false){
            // appending that to a temp index list.
              list.push(raw[i].topic_id);
          }
          // skip out if already in seen list
        }
    }
    // select a random fact from the topic list that was just populated
    let factLocation = getRandomInt(list.length);

    console.log("list " + list.toString());
    console.log("location " + factLocation);

    // gets fact text under the topic_id
    //let out = list[factLocation];
    //console.log(out);
    let factText = "";
    for (let j = 0; j < raw.length; j++){
        if(raw[j].topic_id == list[factLocation]){
          factText = raw[j].fact.text;
          console.log(factText);
        }
    }
    // pushes the topic_id to the seen array
    seen.push(list[factLocation]);
    // Stops list from underflowing
    pandsFunc(factLocation, factText);
}

/**
 *  This function is the 'new fact' button, in which the array is re assigned a const.
 *  Then a random index is chosen again, the topic_id is checked against the index
 *  element and then displayed onto the main tag. The topic_id is then pushed into
 *  the seen array and pandsFunc() is called.
 */
function rePushHead() {
    count++;
    console.log(count);
    const data = req.response;
    const raw = data['raw'];
    let factLocation = getRandomInt(list.length);
    console.log("list " + list.toString());
    console.log("location " + factLocation);
    let factText = "";
    for (let j = 0; j < raw.length; j++){
        if(raw[j].topic_id == list[factLocation]){
          factText = raw[j].fact.text;
          console.log(factText);
        }
    }
    seen.push(list[factLocation]);
    pandsFunc(factLocation, factText);

}
/**
 *  This function checks if list is long enough to to splice (remove element),
 *  splices the list array and then puts the new content onto the main tag.
 */
function pandsFunc(factLocation, factText) {
  if (list.length > 0) {
    list.splice(factLocation, 1);
    console.log("list " + list.toString());
    console.log("seen " + seen.toString());
    p.textContent = factText;
    main.appendChild(p);
  }
  else {
    // Error handle just incase.
    // Also shows if the array has been diminished
    location.reload();
    alert("Error array is empty!");

  }
}

/**
 *  This function reloads the page when called for 'new topic' button
 */
function reloadPage() {
    location.reload();
}

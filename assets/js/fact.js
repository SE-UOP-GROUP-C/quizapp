/*
    This is a demonstration of how the fact page would present and store facts.
    Future for this would be to have the 'seen' array submit to the database and
    pulling data would not be done through multiple 'facts' being in the same json file.
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

let topics = ["History", "Geography", "Science"]; // hard coded
            // 1,2,3 eg
let url = [
    "/assets/json/topic_1.json",
    "/assets/json/topic_2.json",  // Example facts
    "/assets/json/topic_3.json"
]

function getTopic() {
    tVal = document.getElementById("topic").value;
    if (tVal !== 0 && count == 0){
        let indexVal = tVal - 1;
        getMain(url[indexVal]);
        document.getElementById("subT").remove();
        select.remove();
        label.textContent = "Chosen topic: " + topics[indexVal];

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

function getMain(url) {
    req.open('GET', url, true);
    req.onerror = function () {
      alert("Error: Please check your connection and refresh.");
    }
    req.responseType = 'json';
    req.send();
}

req.onload = function(){
  const data = req.response;
  pushMain(data);
}

// Choose a random topic_id from the list
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function pushMain(data) {
    const raw = data['raw'];
    count++;
    console.log(count);
    // count the amount of facts under that topic
    for( let i = 0; i < raw.length; i++){
        // specific topic filter

        if (count == 1 && raw[i].topic == tVal) {

          // check if .topic_id is in seen array -- test case tom
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

// New fact button! (same topic selected) // in this case it will use the rest of the list
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

// checks if list is long enough to to splice (remove element), splices the list array and then
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
    location.reload();
    alert("Error array is empty!");

  }
}

function reloadPage() {
    location.reload();
}

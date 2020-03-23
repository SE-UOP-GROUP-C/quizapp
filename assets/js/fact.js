const main = document.querySelector('main');
let req = new XMLHttpRequest();
let tVal = null;
let count = 0;
let list = [];
let seen = [];


function getTopic() {
    tVal = document.getElementById("topic").value;
    if (tVal == "null"){
        alert("Please select a topic!");
    }
    else {
        count++;
        if(count == 1){
          getMain();
        }
        return tVal;
    }
}

// listener for button submit
document.addEventListener("DOMContentLoaded", function () {
    let item1 = document.getElementById("subT");
    item1.addEventListener("click", getTopic);
});
// listener for button new fact
document.addEventListener("DOMContentLoaded", function () {
    let item2 = document.getElementById("nFact");
    item2.addEventListener("click", getMain);
});
// listener for button reload
document.addEventListener("DOMContentLoaded", function () {
    let item3 = document.getElementById("nTopic");
    item3.addEventListener("click", getTopic);
});

function getMain() {
    const url = '/assets/fact.json'; // Example to show data on page for what it will do.
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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function pushMain(data) {
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const raw = data['raw'];
    // count the amount of facts under that topic
    for( let i = 0; i < raw.length; i++){
        // specific topic filter
        if(raw[i].topic == tVal){
            // appending that to a temp index list.
            list.push(raw[i].topic_id);
        }

    }

    // select a random fact from that topic
    let factLocation = getRandomInt(list.length);
    console.log(list.toString());
    // checks if the fact has been seen before
    if (seen.includes(factLocation) == false){
      let factText = raw[factLocation].fact.text;
      /*if (factLocation > -1) {
        list.splice(factLocation, 1);
        seen.push()
      }*/
      p.textContent = factText;
      main.appendChild(p);
    }


}

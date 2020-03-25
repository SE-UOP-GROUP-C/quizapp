
data = '[{"id":1,"uname":"Rozanne","score":26},{"id":2,"uname":"Blake","score":28},{"id":3,"uname":"Teodor","score":72},{"id":4,"uname":"Megan","score":28},{"id":5,"uname":"Jeno","score":43},{"id":6,"uname":"Lucina","score":10},{"id":7,"uname":"Guthrey","score":91},{"id":8,"uname":"Eleanora","score":70},{"id":9,"uname":"Marlin","score":14},{"id":10,"uname":"Laure","score":92},{"id":11,"uname":"Amalea","score":29},{"id":12,"uname":"Ive","score":49},{"id":13,"uname":"Lilian","score":22},{"id":14,"uname":"Edwina","score":16},{"id":15,"uname":"Rusty","score":34},{"id":16,"uname":"Emilio","score":93},{"id":17,"uname":"Nancey","score":33},{"id":18,"uname":"Phil","score":63},{"id":19,"uname":"Joelynn","score":11},{"id":20,"uname":"Minor","score":32}]';

function load() {
  var leaderboard
  var someData_notJSON = JSON.parse(data);
  for (i=0;i<10;i++){
      var para = document.createElement("P");               // Create a <p> element
      para.innerText = someData_notJSON[i].uname + " "+someData_notJSON[i].score;               // Insert text
      document.body.appendChild(para);                      // Append <p> to <body>

  console.log(someData_notJSON[i].uname, someData_notJSON[i].score);}
}
load()
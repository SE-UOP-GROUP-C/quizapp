const main = document.querySelector('main');

data = '[{"id":1,"uname":"Rozanne","score":26},{"id":2,"uname":"Blake","score":28},{"id":3,"uname":"Teodor","score":72},{"id":4,"uname":"Megan","score":28},{"id":5,"uname":"Jeno","score":43},{"id":6,"uname":"Lucina","score":10},{"id":7,"uname":"Guthrey","score":91},{"id":8,"uname":"Eleanora","score":70},{"id":9,"uname":"Marlin","score":14},{"id":10,"uname":"Laure","score":92},{"id":11,"uname":"Amalea","score":29},{"id":12,"uname":"Ive","score":49},{"id":13,"uname":"Lilian","score":22},{"id":14,"uname":"Edwina","score":16},{"id":15,"uname":"Rusty","score":34},{"id":16,"uname":"Emilio","score":93},{"id":17,"uname":"Nancey","score":33},{"id":18,"uname":"Phil","score":63},{"id":19,"uname":"Joelynn","score":11},{"id":20,"uname":"Minor","score":32}]';
var table = document.getElementById("leaderboard");

function load() {
  var leaderboardData= JSON.parse(data); /* parses json data*/
  leaderboardData.sort((a, b) => parseFloat(b.score) - parseFloat(a.score)); /*Sorts data in ascending roder by score*/

  for (i=0;i<10;i++){
      var row = table.insertRow(i+1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      cell1.innerHTML = i+1
      cell2.innerHTML = leaderboardData[i].uname;
      cell3.innerHTML = leaderboardData[i].score;
      
      /*Iterates through the top ten elements and adds them to a table with the appropriate ranking.*/
}
}
load() 
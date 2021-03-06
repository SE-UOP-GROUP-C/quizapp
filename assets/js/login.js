function onLogin(googleUser) {
  let dataToSend = undefined;
  if (googleUser != undefined) {
    let profile = googleUser.getBasicProfile();
    window.login.textContent = "ID: " + profile.getId() + "<br>"
    + "Full Name: " + profile.getName() + "<br>"
    + "Given Name: " + profile.getGivenName() + "<br>"
    + "Family Name: " + profile.getFamilyName() + "<br>"
    + "Image URL: " + profile.getImageUrl() + "<br>"
    + "Email: " + profile.getEmail(); + "<br>"

    dataToSend = {type: "check", id: profile.getId()};
  }


  if (googleUser == undefined) {
    dataToSend = {type: "check", id: 1};
  }
  let jsonToSend = JSON.stringify(dataToSend);
  let request = new XMLHttpRequest();
  request.open('POST', 'https://quizapp-se-uop-6c.herokuapp.com/login', true);
  //request.setRequestHeader("Access-Control-Allow-Origin", "https://se-uop-group-c.github.io/")
  request.send(dataToSend);

  if (request.body == false)
  {
    window.login.textContent = request.body;
  }
}

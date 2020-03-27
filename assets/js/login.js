function onLogin(googleUser) {
  if (googleUser != undefined) {
    let profile = googleUser.getBasicProfile();
    window.login.textContent = "ID: " + profile.getId() + "<br>"
    + "Full Name: " + profile.getName() + "<br>"
    + "Given Name: " + profile.getGivenName() + "<br>"
    + "Family Name: " + profile.getFamilyName() + "<br>"
    + "Image URL: " + profile.getImageUrl() + "<br>"
    + "Email: " + profile.getEmail(); + "<br>"
  }

  let dataToSend = undefined;
  if (googleUser == undefined) {
    dataToSend = {type: "check", id: 1};
  } else {
    dataToSend = {type: "check", id: profile.getId()};
  }
  let jsonToSend = JSON.stringify(dataToSend);
  let request = new XMLHttpRequest();
  request.open('POST', '/login', true);
  request.setRequestHeader("Access-Control-Allow-Origin", "https://quizapp-se-uop-6c.herokuapp.com/")
  request.send(dataToSend);
}

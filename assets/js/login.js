function onLogin(googleUser) {
  let profile = googleUser.getBasicProfile();
  window.login.content="ID: " + profile.getID() + "\n"
  + "Full Name: " + profile.getName() + "\n"
  + "Given Name: " + profile.getGivenName() + "\n"
  + "Family Name: " + profile.getFamilyName() + "\n"
  + "Image URL: " + profile.getImageUrl() + "\n"
  + "Email: " + profile.getEmail(); + "\n"

}

$(document).ready(function(){
    $("#login").on("submit", function(){
        event.preventDefault();
        
var userData = {
    email: $("#userEmail").val().trim(),
    password: $("#userPassword").val().trim()
  };
    
  if (!userData.email || !userData.password) {
    return;
  }

  loginUser(userData.email, userData.password);
  $("#userEmail").val("");
  $("#userPassword").val("");
  });

  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace(data);
     
    }).catch(function(err) {
      console.log(err);
    });
  }


});

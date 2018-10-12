$(document).ready(function() {
    $.get("/api/users").then(function(obj) {
      $(".userName").text(obj.body.firstname + " " + obj.body.lastname);
    });
  });

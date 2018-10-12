$(document).ready(function () {
    $("#signup").on("submit", function () {
        event.preventDefault();
       
        var userData = {
            firstname: $("#inputFirstName").val().trim(),
            lastname: $("#inputLastName").val().trim(),
            email: $("#inputEmail").val().trim(),
            password: $("#inputPassword").val().trim(),
            
        };
        if (!userData.email || !userData.password) {
            return;
        }
        saveUser(
            userData.firstname,
            userData.lastname,
            userData.email, 
            userData.password);
        $("#inputFirstName").val("");
        $("#inputLastName").val("");
        $("#inputEmail").val("");
        $("#inputPassword").val("")
      });


function saveUser(firstname, lastname, email, password) {
    $.post("/api/users", {
        firstname:firstname,
        lastname: lastname,
        email: email,
        password: password
    }).then(function (data) {
        window.location.replace(data);
        alert("Success!")
        // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
}

function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
}

});
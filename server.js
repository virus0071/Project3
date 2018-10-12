// require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("./config/passport");
const PORT = process.env.PORT || 3000;

const db = require("./models");

var mysql      = require("mysql");
var db_config = {
  host     : "us-cdbr-iron-east-01.cleardb.net", 
  user     : "b02bc8980bfbea",
  password : "7119316b",
  database : "heroku_7b1914202d5b895"
};
var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config);
  connection.connect(function(err) {              
    if(err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }                                     
  });                                     
                                          
  connection.on("error", function(err) {
    console.log("db error", err);
    if(err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();                         
    } else {
      throw err;                                  
    }
  });
}

handleDisconnect();

// Middleware
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

const syncOptions = { force: false };

//use sessions to keep track login status
app.use(session({
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// If running a test, set syncOptions.force to true
// clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }

// Import our routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;

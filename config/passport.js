const passport = require("passport");
const PassportLocalStrategy = require("passport-local").Strategy;

const db = require("../models");

passport.use(new PassportLocalStrategy(
    {
        usernameField: "email"
    },
    function (email, password, done) {
        db.User.findOne({
            where: {
                email: email
            }
        }).then(function (dbUser) {
            if (!dbUser) {
                return done(null, false, {
                    message: "No user has been registered with this email."
                });
            }
            else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            return done(null, dbUser);
        });
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = passport;
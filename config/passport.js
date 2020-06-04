var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require("dotenv").config();

var db = require("../models");

const callbackURL = process.env.CALLBACK_URL || "http://localhost:3001"

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
        usernameField: "email"
    },
    function (email, password, done) {
        // When a user tries to sign in this code runs
        db.User.findOne({
            where: {
                email: email
            }
        }).then(function (dbUser) {
            // If there's no user with the given email
            if (!dbUser) {
                return done(null, false, {
                    message: "Incorrect email."
                });
            }
            // If there is a user with the given email, but the password the user gives us is incorrect
            else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            // If none of the above, return the user
            return done(null, dbUser);
        });
    }
));

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL + "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        //console.log(profile)
        //console.log("Email is ", profile.emails[0].value)
        db.User.findOrCreate({ where: { googleId: profile.id }, defaults: { googleId: profile.id, email: profile.emails[0].value, userName: profile.displayName } })
            .then(dbUser => {
                return done(null, dbUser)
            });
    }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to mak`e it all work
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});



module.exports = passport;

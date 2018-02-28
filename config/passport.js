// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
// var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var db = require("../model");


module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
      db.User.findById(id).then(function(user){
        done(null, user.dataValues);
      });

    });



    passport.use(
        'local-login',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function(req, username, password, done) {
              db.User.findAll({
                where:{ user_name : username}
              }).then(function(rows){
                console.log(rows);

                if (!rows.length) {

                  return done(null, false,
                    {
                      message:'No user found'
                    }
                    // req.flash('loginMessage', 'No user found.')
                  ); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].dataValues.user_password)) {
                  return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                }
                // // all is well, return successful user
                return done(null, rows[0].dataValues);
              });


               // callback with email and password from our form

            })
    );


};
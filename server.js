// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");

var passport = require('passport');
var flash    = require('connect-flash');
var expressValidator = require('express-validator');

var PORT     = process.env.PORT || 8080;
var app      = express();
var db = require("./model");

// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.use(express.static(__dirname + "/public"));

// set up our express application
app.use(methodOverride("_method"));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

//set handlebars
app.engine("handlebars", exphbs({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// ==========global variable for flash
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



// routes ======================================================================
require('./routes/login-routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("The magic happens on PORT " + PORT);
  });
});
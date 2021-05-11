const express = require("express");
// const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes");
const session = require("express-session");
const passport = require("./config/passport");

//TODO ______________________________s
// var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var User = require('./models/user')
//TODO ______________________________e

const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//TODO ______________________________s
// BodyParser Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//TODO ______________________________e

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//TODO ______________________________s
// We need to use sessions to keep track of our user's login status
// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  proxy: true
}));

// passport connection
app.use(passport.initialize());
app.use(passport.session());
//TODO ______________________________e

// Add routes, both API and view
//TODO ______________________________s
require("./routes/api/api-routes.js")(app);
//TODO ______________________________e
  app.use(routes);
  
  // Connect to the Mongo DB
  mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/rhythmicMachinePatterns",{ 
      useUnifiedTopology: true, 
      useNewUrlParser: true, 
      useCreateIndex: true,
      useFindAndModify: false
    }
    );
    //TODO ______________________________s
    var db = mongoose.connection;

    // Register User
app.post('/register', function(req, res){
  var password = req.body.password;
  var password2 = req.body.password2;

  if (password == password2){
    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      res.send(user).end()
    });
  } else{
    res.status(500).send("{errors: \"Passwords don't match\"}").end()
  }
});
    //TODO ______________________________e

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

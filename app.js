var express = require('express.io');
var path = require('path');

// creates our server
var app = express().http().io();
// configuring our environments
app.configure(function(){
  app.use(express.cookieParser());  
  app.use(express.json());    //for handling post data
  app.use(express.urlencoded());    //for handling post data
  
  // remember the static file server? express does it with one line:
  app.use(express.static(path.join(__dirname, 'public'))); //for handling static contents
  app.use(express.session({secret: 'monkey'})); //for using sessions
  app.set('view engine', 'ejs');
});
//we're going to have /routes/index.js handle all of our routing
var route = require('./routes/index.js')(app);

var port = 6789;
app.listen(port);
console.log('tacos are happening running on port ' + port);
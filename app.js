var express  = require('express');
var app      = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var dbConfig = require('./config/database_config.js')


mongoose.connect(dbConfig.url)

require('./controller/auth/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// required for passport
app.use(session({
    secret: 'mySecretKey', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.use(express.static(__dirname + '/public'))

app.set('views', './views')
app.set('view engine', 'pug')


// Routing
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


io.on('connection', function(socket){
  console.log('a user connected')
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });


  socket.on('b_rook_location', function(msg){
    console.log('peice: ' + msg.peice);
    console.log('x: ' + msg.x_coord);
    console.log('y: ' + msg.y_coord);
    io.emit('b_rook_location', msg);
  });

  socket.on('b_queen_location', function(msg){
    console.log('peice: ' + msg.peice);
    console.log('x: ' + msg.x_coord);
    console.log('y: ' + msg.y_coord);
    io.emit('b_queen_location', msg);
  })
});


//require('./app/routes.js')(app, passport)

http.listen(7000, function () {
  console.log('Example app listening on port 7000!')
})




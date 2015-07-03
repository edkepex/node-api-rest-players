var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


router.get('/aver', function(req, res) {
   res.send("Hello World!");
});

router.get('/', function(req, res) {
   res.send("Hello edkepex");
});


var models = require('./models/player')(app, mongoose);


app.use(router);

var PlayerCtrl = require('./controllers/players');

// API routes
var players = express.Router();

players.route('/players')
  .get(PlayerCtrl.findAllPlayers)
  .post(PlayerCtrl.addPlayer);

players.route('/players/:id')
  .get(PlayerCtrl.findById)
  .put(PlayerCtrl.updatePlayer)
  .delete(PlayerCtrl.deletePlayer);

app.use('/api', players);


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/players', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database de jugadores');
});


//app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;

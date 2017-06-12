'use strict';

// Module dependencies.
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const serveStatic = require('serve-static');
const db = require('./config/connection');
const app = express();
const port = 3000;

var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

require('./config/passport')(passport); // pass passport for configuration

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.set('view engine', 'ejs'); // set up ejs for templating

// Set views path, template engine and default layout
app.use('/lib', serveStatic(path.normalize(__dirname) + '/bower_components'));
app.use(serveStatic(path.normalize(__dirname) + '/public'));

// add request body data under ".body"
app.use(bodyParser.json());
app.use( bodyParser.urlencoded({ extended: true }) );

// Add routes in the application
require('./app/routes/routes')(app, passport);

/*
// Add routes in the application
require('./app/routes/index')(app);
// Default route 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/views/index.html');
});*/

// Start the app by listening on 3000
const server = app.listen(port, function() {
    console.log('Fun Web app started on port ' + port);
});

const io = require('socket.io')(server);

io.on('connection', function (socket) {
	console.log('The socket is on!');

	// When we recieve that a new competition was added send back so we update all opened applications
	socket.on('newCompetition', function (from) {
		socket.broadcast.emit('newCompetition', {
			source: from
		});
	});
});

// Expose app
exports = module.exports = app;
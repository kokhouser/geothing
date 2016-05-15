/**
 * Main app file to configure API routes and run them.
 */

var express = require('express');
var mongoose = require('mongoose');

// Define app using express
var app = express();
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var userModel = require('./models/user');

var config = require('./_config');

// Configure app using bodyParser() to enable reading data during POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setting port
var port = process.env.PORT || 8080; //Default to 8080 unless port parameter is set

// Setting up MongoDB based on environment
mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
	if(err) {
		console.log('Error connecting to the database. ' + err);
	} else {
		//console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
	}
});

// Setting routes ======================================================================================================

var router = express.Router();

var authentication = require('./routes/authentication');
app.use('/api', authentication.router);

// Middleware to use for all requests
router.use(function (req, res, next) {
	if (req.method == "GET" && req.originalUrl == "/api") {
		next();
		return;
	}
	if (req.method == "POST" && req.originalUrl == "/api/users") {
		next();
		return;
	}
	    // check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	// decode token
	if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, config.secret, function(err, decoded) {
	    	if (err) {
	        	return res.json({ success: false, message: 'Failed to authenticate token.' });
	    	} else {
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;
	        next();
	    	}
	    });

	} else {

	    // if there is no token
	    // return an error
	    return res.status(403).send({
	        success: false,
	        message: 'No token provided.'
	    });
	}
});

router.get('/', function (req, res) {
	res.status(200);
    res.json({message: "Welcome to Geothing's API."});
});

// Registering routes ==================================================================================================
app.use('/api', router); // Base route
// Users routes
var users = require('./routes/users');
app.use('/api', users.router);
// Geocaches routes
var geocaches = require('./routes/geocaches');
app.use('/api', geocaches.router);

// Format JSON responses for prettification by setting number of spaces
app.set('json spaces', 2);
app.listen(port);
console.log('Listening on port ' + port);


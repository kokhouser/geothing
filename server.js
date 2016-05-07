// Main app file to configure API routes and run them.
// Created by HaoZhe on 5/7/2016

var express = require ('express'); 
var mongoose = require ('mongoose');
var models = require('./models/geocache');

// Define app using express
var app = express(); 
var bodyParser = require('body-parser');

// Configure app using bodyParser() to enable reading data during POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setting port
var port = process.env.PORT || 8080;

// Setting up MongoDB
mongoose.connect('mongodb://localhost/geothing');

// Setting routes ======================================================================================================

var router = express.Router();

// Middleware to use for all requests
// Future authentication + logging should go here
router.use(function(req, res, next) {
    // Do stuff
    console.log('Something is happening.');
    next(); // Go to other routes
});

router.get('/', function(req, res) {
    res.json({ message: "Welcome to Geothing's API."});   
});

// Registering routes ==================================================================================================
var users = require('./routes/users');
app.use('/api', router);
app.use('/api', users.router);

// Format JSON responses for prettification by setting number of spaces
app.set('json spaces', 2);
app.listen(port);

console.log('Listening on port ' + port);
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

app.set('secret', config.secret)

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

// Middleware to use for all requests
// Authenticate users to generate webtoken
// Note: Authenticate route is outside of middleware so that 
// Inspiration from here -> https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
router.post('/authenticate', function(req, res) {

      // find the user
      userModel.findOne({
        username: req.body.username
      }, function(err, user) {

        if (err) throw err;

        if (!user) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

          // check if password matches
          if (user.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {

            // if user is found and password is right
            // create a token
            var token = jwt.sign(user, app.get('secret'), {
              expiresIn: '24h' // expires in 24 hours
            });

            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });
          }   

        }

      });
    });

router.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  // decode token
	  if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, app.get('secret'), function(err, decoded) {      
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


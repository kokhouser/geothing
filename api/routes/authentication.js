var express = require('express');
var app = express();
var router = express.Router();
var jwt = require('jsonwebtoken');
var userModel = require('../models/user');

var config = require('../_config');
app.set('secret', config.secret);


// Authenticate users to generate webtoken
// Note: Authenticate route is outside of middleware so that
// Inspiration from here -> https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
router.post('/authenticate', function(req, res) {
	/**
	* @api {post} api/authentication Authenticates an existing user
	* @apiName AuthenticateUser
	* @apiGroup Authentication
	*
	* @apiParam {String} username Username of the user
	* @apiParam {String} password Password of the user
	* @apiSuccessExample Success-Response:
	*     HTTP/1.1 200 OK
	*     {
	*       "success": "true",
	*       "message": "Enjoy your token!",
	*       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0T
	*       W9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2Z
	*       VBhdGhzIjp7InBhdGhzIjp7ImVtYWlsIjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsI
	*       nVzZXJuYW1lIjoiaW5pdCIsIm1lbWJlclNpbmNlIjoiaW5pdCIsImdlb2NhY2hlc1Zpc
	*       2l0ZWQiOiJpbml0IiwiZ2VvY2FjaGVzQ3JlYXRlZCI6ImluaXQiLCJfX3YiOiJpbml0I
	*     }
	*/

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
          		res.status(401);
            	res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          	} else {

	            // if user is found and password is right
	            // create a token
	            var token = jwt.sign(user, app.get('secret'), {
	              	expiresIn: '24h' // expires in 24 hours
	            });

	            // return the information including token as JSON
	            res.status(200);
	            res.json({
	              	success: true,
	              	message: 'Enjoy your token!',
	              	token: token
	            });
        	}
        }
    });
});

exports.router = router;

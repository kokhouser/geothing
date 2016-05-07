// Routes for user operations.
// Created by HaoZhe on 5/7/2016

var express = require('express');
var router = express.Router();
var models = require('../models/geocache');

// https://{Base URL}/api/users
router.route('/users')
	// Adds a new user
	.post(function (req, res) {
		var user = new models.User();
		user.name = req.body.name;
		user.save(function(err) {
			if (err)
				res.send(err);
			res.json({message: 'User was created.',
						user: user});
		});
	})

	// Gets all users
	.get(function (req, res) {
		models.User.find(function(err, users) {
			if (err)
				res.send(err);
			res.json(users);
		});
	});	

// https://{Base URL}/api/users/{user id}
router.route('/users/:user_id')
	// Gets a user by ID
	.get(function(req,res) {
		models.User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err);
			res.json(user)
		});
	})

	// Updates a user by ID
	.put(function(req, res) {
		models.User.findById(req.params.user_id, function (err, user) {
			if (err)
				res.send(err);
			// Update user info based on request body
			user.name = req.body.name;

			user.save (function(err) {
				if (err)
					res.send(err);
				res.json({message: 'User has been updated.',
							user: user});
			});
		});
	})

	// Deletes a user by ID
	.delete(function(req, res) {
		models.User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err)
				res.send(err);
			res.json({message: 'User sucessfully deleted'});
		});
	});

exports.router = router;
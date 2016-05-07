var express = require('express');
var router = express.Router();
var models = require('../models/geocache');

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
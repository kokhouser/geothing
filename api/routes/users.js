//Routes for user operations.

var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

/**
 * @api {get} api/users Requests all user information
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiSuccess {String} id Unique id of the user
 * @apiSuccess {String} username Username of the user
 * @apiSuccess {String} email Email of the user
 * @apiSuccess {Date} memberSince Date when user joined
 * @apiSuccess {String[]} geocachesVisited Geocaches that the user has logged visits
 * @apiSuccess {String[]} geocachesCreated Geocaches that the user has created
 */
router.route('/users')
    // Adds a new user
    .post(function (req, res) {
        var user = new userModel();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                res.json({message: 'User was created.',
                        user: user});
            }
        });
    })

    // Gets all users
    .get(function (req, res) {
        // Populating geocache data for visited and created
        userModel.find({}).populate('geocachesVisited geocachesCreated')
            .exec(function (err, users) {
            if (err) {
                res.send(err);
            } else {
                res.json(users);
            }
        });
    });

// https://{Base URL}/api/users/{user id}
router.route('/users/:user_id')
    // Gets a user by ID
    .get(function (req, res) {
        // Populating geocache data for visited and created
        userModel.findById(req.params.user_id).populate('geocachesVisited geocachesCreated')
            .exec(function (err, user) {
            if (err) {
                res.send(err);
            } else {
                res.json(user);
            }
        });
    })

    // Updates a user by ID
    .put(function (req, res) {
        userModel.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.send(err);
            } else {
                // Update user info based on request body
                user.username = req.body.username;
                user.email = req.body.email;
                user.save(function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({message: 'User has been updated.',
                                user: user});
                    }
                });
            }
        });
    })

    // Deletes a user by ID
    .delete(function (req, res) {
        userModel.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err) {
                res.send(err);
            } else {
                res.json({message: 'User sucessfully deleted'});
            }
        });
    });

exports.router = router;
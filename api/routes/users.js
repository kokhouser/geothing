/**
 * Routes for user operations.
 */

var express = require('express');
var router = express.Router();
var models = require('../models/geocache');

// https://{Base URL}/api/users
router.route('/users')
    // Adds a new user
    .post(function (req, res) {
        var user = new models.User();
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
        models.User.find(function (err, users) {
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
        models.User.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.send(err);
            } else {
                res.json(user);
            }
        });
    })

    // Updates a user by ID
    .put(function (req, res) {
        models.User.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.send(err);
            } else {
                // Update user info based on request body
                user.name = req.body.name;

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
        models.User.remove({
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
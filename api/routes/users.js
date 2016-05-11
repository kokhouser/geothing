//Routes for user operations.

var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

router.route('/users')
    /**
     * @api {post} api/users Creates a new user
     * @apiName CreateUser
     * @apiGroup Users
     *
     * @apiParam {String} username Username of the new user
     * @apiParam {String} password Password of the new user
     * @apiParam {String} email Email of the new user
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "User was created",
     *       "user": {
     *          "_id": "1q2w3e4r56t7yu8"
     *          "username": "JohnDoe",
     *          "email": "john@examplemail.com"
     *          "geocachesVisited": "[1234wer45rty73e2d, q2w3e4df5t6y879u]"
     *          "geocachesCreated": "[q2w3e4df5t6y879u]"
     *       }
     *     }
     */
    .post(function (req, res) {
        var user = new userModel();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.save(function (err) {
            if (err) {
                res.status(400);
                res.send(err);
            } else {
                res.status(200);
                res.json({message: 'User was created.',
                        user: user});
            }
        });
    })

    /**
     * @api {get} api/users Requests all user information
     * @apiName GetUsers
     * @apiGroup Users
     *
     * @apiSuccess {String} _id Unique id of the user
     * @apiSuccess {String} username Username of the user
     * @apiSuccess {String} email Email of the user
     * @apiSuccess {Date} memberSince Date when user joined
     * @apiSuccess {Geocache[]} geocachesVisited Geocaches that the user has logged visits
     * @apiSuccess {Geocache[]} geocachesCreated Geocaches that the user has created
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *      {
     *          "_id": "1q2w3e4r56t7yu8"
     *          "username": "JohnDoe",
     *          "email": "john@examplemail.com"
     *          "memberSince": "2016-05-10T02:31:09.692Z"
     *          "geocachesVisited": "[]"
     *          "geocachesCreated": "[]"
     *      },
     *      {
     *          "_id": "9u89u7t8eyqwqwdq0"
     *          "username": "JaneDoe",
     *          "email": "jane@examplemail.com"
     *          "memberSince": ""2016-05-10T01:31:19.692Z""
     *          "geocachesVisited": "[]"
     *          "geocachesCreated": "[]"
     *      }
     *     ]
     */
    .get(function (req, res) {
        // Populating geocache data for visited and created
        userModel.find({}).populate('geocachesVisited geocachesCreated')
            .exec(function (err, users) {
            if (err) {
                res.status(400);
                res.send(err);
            } else {
                res.status(200);
                res.json(users);
            }
        });
    });

router.route('/users/:user_id')
    /**
     * @api {get} api/users/{user_id} Requests user information
     * @apiName GetUserFromId
     * @apiGroup Users
     *
     * @apiSuccess {String} _id Unique id of the user
     * @apiSuccess {String} username Username of the user
     * @apiSuccess {String} email Email of the user
     * @apiSuccess {Date} memberSince Date when user joined
     * @apiSuccess {Geocache[]} geocachesVisited Geocaches that the user has logged visits
     * @apiSuccess {Geocache[]} geocachesCreated Geocaches that the user has created
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "_id": "1q2w3e4r56t7yu8"
     *          "username": "JohnDoe",
     *          "email": "john@examplemail.com"
     *          "memberSince": "2016-05-10T02:31:09.692Z"
     *          "geocachesVisited": "[]"
     *          "geocachesCreated": "[]"
     *     }
     */
    .get(function (req, res) {
        // Populating geocache data for visited and created
        userModel.findById(req.params.user_id).populate('geocachesVisited geocachesCreated')
            .exec(function (err, user) {
            if (err) {
                res.status(400);
                res.send(err);
            } else {
                res.status(200);
                res.json(user);
            }
        });
    })

    /**
     * @api {put} api/users/{user_id} Updates a user
     * @apiName UpdateUser
     * @apiGroup Users
     *
     * @apiParam {String} username New username of the user
     * @apiParam {String} email New email of the user
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "User has been updated",
     *       "user": {
     *          "_id": "1q2w3e4r56t7yu8"
     *          "username": "JohnDoel",
     *          "email": "johnnyboy@examplemail.com"
     *          "geocachesVisited": "[1234wer45rty73e2d, q2w3e4df5t6y879u]"
     *          "geocachesCreated": "[q2w3e4df5t6y879u]"
     *       }
     *     }
     */
    .put(function (req, res) {
        userModel.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.status(400);
                res.send(err);
            } else {
                // Update user info based on request body
                user.username = req.body.username;
                user.email = req.body.email;
                user.save(function (err) {
                    if (err) {
                        res.status(400);
                        res.send(err);
                    } else {
                        res.status(200);
                        res.json({message: 'User has been updated.',
                                user: user});
                    }
                });
            }
        });
    })

    /**
     * @api {delete} api/users/{user_id} Deletes a user by id
     * @apiName DeleteUser
     * @apiGroup Users
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "User successfully deleted"
     *     }
     */
    .delete(function (req, res) {
        userModel.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err) {
                res.status(400);
                res.send(err);
            } else {
                res.status(200);
                res.json({message: 'User sucessfully deleted'});
            }
        });
    });

exports.router = router;
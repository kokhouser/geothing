//Routes for geocache operations.

var express = require('express');
var router = express.Router();
var geocacheModel = require('../models/geocache');
var userModel = require('../models/user');

// https://{Base URL}/api/geocaches
router.route('/geocaches')
    /**
     * @api {post} api/geocaches Creates a new geocache
     * @apiName CreateGeocache
     * @apiGroup Geocaches
     *
     * @apiParam {String} name Name of the new geocache
     * @apiParam {String} [description] Description of the new geocache (optional)
     * @apiParam {Number} createdBy User id of the new geocache's creator
     * @apiParam {Number} xCoord X-coordinate of the new geocache
     * @apiParam {Number} yCoord Y-coordinate of the new geocache
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "_id": "57314883c1d0de878fb4f137",
     *       "yCoord": 157.312452463,
     *       "xCoord": -131.31785312,
     *       "createdBy": 234567h8j90o987654,
     *       "description": "Test Description",
     *       "name": "John's Cache",
     *       "__v": 0,
     *       "logs": [],
     *       "updated": "2016-05-10T02:33:39.129Z"
     *     }
     */
    .post(function (req, res) {
        // Check if user exists
        userModel.findById(req.body.createdBy, function (err, user) {
            if (err) {
                res.status(400);
                res.send(err);
            } else {
                var geocache = new geocacheModel();
                geocache.name = req.body.name;
                geocache.description = req.body.description;
                geocache.createdBy = user._id;
                geocache.xCoord = req.body.xCoord;
                geocache.yCoord = req.body.yCoord;
                geocache.save(function (err) {
                    if (err) {
                        res.status(400);
                        res.send(err);
                    } else {
                        user.geocachesCreated.push(geocache._id);
                        user.save(function (error) {
                            if (error) {
                                res.status(400);
                                res.send(error);
                            } else {
                                res.json({message: 'Geocache was created.',
                                        geocache: geocache});
                            }
                        });
                    }
                });
            }
        });
    })

    /**
     * @api {get} api/geocaches Requests all geocache information
     * @apiName GetGeocaches
     * @apiGroup Geocaches
     *
     * @apiSuccess {String} name Name of the geocache
     * @apiSuccess {String} description Description of the geocache
     * @apiSuccess {User} createdBy User information of the geocache's creator
     * @apiSuccess {Number} xCoord X-coordinate of the geocache
     * @apiSuccess {Number} yCoord Y-coordinate of the geocache
     * @apiSuccess {Log[]} logs Array of log information
     * @apiSuccess {Date} updated Date geocache was last updated
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *      {
     *          "_id": "57314883c1d0de878fb4f137",
     *          "yCoord": 157.312452463,
     *          "xCoord": -131.31785312,
     *          "createdBy": {
     *              "id": "573147edc1d0de878fb4f136",
     *              "username": "JohnDoe",
     *              "email": "john@examplemail.com",
     *              "memberSince": "2016-05-10T02:31:09.692Z",
     *              "geocachesVisited": [],
     *              "geocachesCreated": [
     *                  "57314883c1d0de878fb4f137"
     *              ]
     *          },
     *          "description": "Test Description",
     *          "name": "John's Cache",
     *          "__v": 0,
     *          "logs": [],
     *          "updated": "2016-05-10T02:33:39.129Z"
     *      },
     *      {
     *          "_id": "57314883c1d0de878fb4f138",
     *          "yCoord": 157.234452463,
     *          "xCoord": -130.317321412,
     *          "createdBy": {
     *              "id": "573147edc1d0de878fb4f135",
     *              "username": "JaneDoe",
     *              "email": "jane@examplemail.com",
     *              "memberSince": "2015-12-11T02:31:09.692Z",
     *              "geocachesVisited": [],
     *              "geocachesCreated": [
     *                  "57314883c1d0de878fb4f138"
     *              ]
     *          },
     *          "description": "Test Description 2",
     *          "name": "Jane's Cache",
     *          "__v": 0,
     *          "logs": [],
     *          "updated": "2016-05-10T02:33:39.129Z"
     *      }
     *     ]
     */
    .get(function (req, res) {
        // Populate user data for createdBy
        geocacheModel.find({}).populate('createdBy').exec(function (err, geocaches) {
            if (err) {
                res.status(400);
                res.send(err);
            } else {
                res.status(200);
                res.json(geocaches);
            }
        });
    });

// https://{Base URL}/api/geocaches/{geocache id}
router.route('/geocaches/:geocache_id')
    /**
     * @api {get} api/geocaches/{geocache_id} Requests geocache information
     * @apiName GetGeocacheFromId
     * @apiGroup Geocaches
     *
     * @apiSuccess {String} name Name of the geocache
     * @apiSuccess {String} description Description of the geocache
     * @apiSuccess {User} createdBy User information of the geocache's creator
     * @apiSuccess {Number} xCoord X-coordinate of the geocache
     * @apiSuccess {Number} yCoord Y-coordinate of the geocache
     * @apiSuccess {Log[]} logs Array of log information
     * @apiSuccess {Date} updated Date geocache was last updated
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "_id": "57314883c1d0de878fb4f137",
     *         "yCoord": 157.312452463,
     *         "xCoord": -131.31785312,
     *         "createdBy": {
     *             "id": "573147edc1d0de878fb4f136",
     *             "username": "JohnDoe",
     *             "email": "john@examplemail.com",
     *             "memberSince": "2016-05-10T02:31:09.692Z",
     *             "geocachesVisited": [],
     *             "geocachesCreated": [
     *                 "57314883c1d0de878fb4f137"
     *             ]
     *         },
     *         "description": "Test Description",
     *         "name": "John's Cache",
     *         "__v": 0,
     *         "logs": [],
     *         "updated": "2016-05-10T02:33:39.129Z"
     *     }
     */
    .get(function (req, res) {
        // Populate user data for createdBy
        geocacheModel.findById(req.params.geocache_id).populate('createdBy').exec(function (err, geocache) {
            if (err) {
                res.status(400);
                res.send(err);
            } else {
                res.status(200);
                res.json(geocache);
            }
        });
    })

    /**
     * @api {put} api/geocaches/{geocache_id} Updates a geocache
     * @apiName UpdateGeocache
     * @apiGroup Geocaches
     *
     * @apiParam {String} name New name of the geocache
     * @apiParam {String} description New description of the geocache
     * @apiParam {Number} xCoord New X-coordinate of the geocache
     * @apiParam {Number} yCoord New Y-coordinate of the geocache
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "Geocache has been updated",
     *       "user": {
     *         "_id": "57314883c1d0de878fb4f137",
     *         "yCoord": 107.312452463,
     *         "xCoord": -121.31785312,
     *         "createdBy": {
     *             "id": "573147edc1d0de878fb4f136",
     *             "username": "JohnDoe",
     *             "email": "john@examplemail.com",
     *             "memberSince": "2016-05-10T02:31:09.692Z",
     *             "geocachesVisited": [],
     *             "geocachesCreated": [
     *                 "57314883c1d0de878fb4f137"
     *             ]
     *         },
     *         "description": "Trial Description",
     *         "name": "John's Better Cache",
     *         "__v": 0,
     *         "logs": [],
     *         "updated": "2016-05-10T02:33:39.129Z"
     *     }
     */
    .put(function (req, res) {
        geocacheModel.findById(req.params.geocache_id, function (err, geocache) {
            if (err) {
                res.status(400);
                res.send(err);
            } else {
                // Update geocache info based on request body
                geocache.name = req.body.name;
                geocache.description = req.body.description;
                geocache.xCoord = req.body.xCoord;
                geocache.yCoord = req.body.yCoord;
                geocache.save(function (err) {
                    if (err) {
                        res.status(400);
                        res.send(err);
                    } else {
                        res.status(200);
                        res.json({message: 'Geocache has been updated.',
                                geocache: geocache});
                    }
                });
            }
        });
    })

    /**
     * @api {delete} api/geocaches/{geocache_id} Deletes a geocache by id
     * @apiName DeleteGeocache
     * @apiGroup Geocaches
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "Geocache successfully deleted"
     *     }
     */
    .delete(function (req, res) {
        geocacheModel.findById(req.params.geocache_id, function (err, geocache) {
            if (err) {
                res.status(400);
                res.send(err);
            } else {
                // Finding creator so we can remove geocache from created list
                userModel.findById(geocache.createdBy, function (err, user) {
                    if (err) {
                        res.status(400);
                        res.send(err);
                    } else {
                        // Removing geocache from created list
                        var indexToBeRemoved = user.geocachesCreated.indexOf(req.params.geocache_id);
                        if (indexToBeRemoved > -1) {
                            user.geocachesCreated.splice(indexToBeRemoved, 1);
                            // Deleting geocache
                            geocacheModel.remove({
                                _id: req.params.geocache_id
                            }, function (err, geocache) {
                                if (err) {
                                    res.status(400);
                                    res.send(err);
                                } else {
                                    res.status(200);
                                    res.json({message: 'Geocache sucessfully deleted'});
                                }
                            });
                        }
                        user.save(function (err) {
                            if (err) {
                                res.status(400);
                                res.send(err);
                            }
                        });
                    }
                });
            }
        });
    });

exports.router = router;
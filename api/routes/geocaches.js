/**
 * Routes for geocache operations.
 */

var express = require('express');
var router = express.Router();
var models = require('../models/geocache');

// https://{Base URL}/api/geocaches
router.route('/geocaches')
    // Adds a new geocache
    .post(function (req, res) {
        // Check if user exists
        models.User.findById(req.body.createdBy, function (err, user) {
            if (err) {
                res.send(err);
            } else {
                var geocache = new models.Geocache();
                geocache.name = req.body.name;
                geocache.description = req.body.description;
                geocache.createdBy = user._id;
                geocache.xCoord = req.body.xCoord;
                geocache.yCoord = req.body.yCoord;
                geocache.save(function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        user.geocachesCreated.push(geocache._id);
                        user.save(function (error) {
                            if (error) {
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

    // Gets all geocaches
    .get(function (req, res) {
        // Populate user data for createdBy
        models.Geocache.find({}).populate('createdBy').exec(function (err, geocaches) {
            if (err) {
                res.send(err);
            } else {
                res.json(geocaches);
            }
        });
    });

// https://{Base URL}/api/geocaches/{geocache id}
router.route('/geocaches/:geocache_id')
    // Gets a geocache by ID
    .get(function (req, res) {
        // Populate user data for createdBy
        models.Geocache.findById(req.params.geocache_id).populate('createdBy').exec(function (err, geocache) {
            if (err) {
                res.send(err);
            } else {
                res.json(geocache);
            }
        });
    })

    // Updates a geocache by ID
    .put(function (req, res) {
        models.Geocache.findById(req.params.geocache_id, function (err, geocache) {
            if (err) {
                res.send(err);
            } else {
                // Update geocache info based on request body
                geocache.name = req.body.name;
                geocache.description = req.body.description;
                geocache.xCoord = req.body.xCoord;
                geocache.yCoord = req.body.yCoord;
                geocache.save(function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({message: 'Geocache has been updated.',
                                geocache: geocache});
                    }
                });
            }
        });
    })

    // Deletes a geocache by ID
    .delete(function (req, res) {
        models.Geocache.findById(req.params.geocache_id, function (err, geocache) {
            if (err) {
                res.send(err);
            } else {
                // Finding creator so we can remove geocache from created list
                models.User.findById(geocache.createdBy, function (err, user){
                    if (err) {
                        res.send(err);
                    } else {
                        // Removing geocache from created list
                        var indexToBeRemoved = user.geocachesCreated.indexOf(req.params.geocache_id);
                        if (indexToBeRemoved > -1) {
                            user.geocachesCreated.splice(indexToBeRemoved,1);
                            // Deleting geocache
                            models.Geocache.remove({
                                _id: req.params.geocache_id
                            }, function (err, geocache) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    res.json({message: 'Geocache sucessfully deleted'});
                                }
                            });
                        }
                        user.save(function (err) {
                            if (err) {
                                res.send(err);
                            }
                        });
                    }
                });
            }
        });
    });

exports.router = router;
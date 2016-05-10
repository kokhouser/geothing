/**
 * Model for Geocache
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var geocacheSchema = new Schema({
    // _id : Schema.Types.ObjectId,
    name: {type: String, required: true},
    description: String,
    updated: {type: Date, default: Date.now},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    xCoord: {type: Number, required: true},
    yCoord: {type: Number, required: true},
    logs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Log'}]
});

module.exports = mongoose.model('Geocache', geocacheSchema);
/**
 * Model for log
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    loggedOn: {type: Date, default: Date.now},
    comment: String
});

module.exports = mongoose.model('Log', logSchema);

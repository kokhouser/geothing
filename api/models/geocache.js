/**
 * Model for Mongoose
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

var userSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    memberSince: {type: Date, default: Date.now},
    geocachesVisited: [{type: mongoose.Schema.Types.ObjectId, ref: 'Geocache'}],
    geocachesCreated: [{type: mongoose.Schema.Types.ObjectId, ref: 'Geocache'}]
});

//Whitelist for user schema, to exclude password
userSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        var retJson = {
            id: ret._id,
            username: ret.username,
            email: ret.email,
            memberSince: ret.memberSince,
            geocachesVisited: ret.geocachesVisited,
            geocachesCreated: ret.geocachesCreated
        };
        return retJson;
    }
});

var logSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    loggedOn: {type: Date, default: Date.now},
    comment: String
});

var Geocache = mongoose.model('Geocache', geocacheSchema);
var User = mongoose.model('User', userSchema);
var Log = mongoose.model('Log', logSchema);

exports.Geocache = Geocache;
exports.User = User;
exports.Log = Log;
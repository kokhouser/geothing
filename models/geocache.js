// Model for Mongoose
// Created by HaoZhe on 5/7/2016

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var geocacheSchema = new Schema({
	// _id : Schema.Types.ObjectId,
	name: String,
	description: String,
	updated: { type: Date, default: Date.now },
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	xCoord: Number,
	yCoord: Number,
	logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Log' }]
});

var userSchema = new Schema ({
	// _id: Schema.Types.ObjectId,
	name: String,
	geocachesVisited: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Geocache'}],
	geocachesCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Geocache'}]
});

var logSchema = new Schema({
	// _id: Schema.Types.ObjectId,
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	loggedOn: { type: Date, default: Date.now },
	comment: String
});

var Geocache = mongoose.model('Geocache', geocacheSchema);
var User = mongoose.model('User', userSchema);
var Log = mongoose.model('Log', logSchema);

exports.Geocache = Geocache;
exports.User = User;
exports.Log = Log;
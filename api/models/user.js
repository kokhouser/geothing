/**
 * Model for User
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('User', userSchema);
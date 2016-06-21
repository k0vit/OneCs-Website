module.exports = function() {

    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        _websites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Website' }],
        dateCreated: {type: Date},
        dateUpdated: {type: Date, default: Date.now},
        facebook: {
            id:    String,
            token: String
        }
    }, {collection: "assignment.user"});

    return UserSchema
};

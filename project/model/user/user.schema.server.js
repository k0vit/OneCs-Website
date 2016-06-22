module.exports = function() {

    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        _bookLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
        _bookReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BookReview' }],
        role: { type: String, enum: ['ADMIN', 'STUDENT'] },
        dateCreated: {type: Date},
        dateUpdated: {type: Date, default: Date.now},
    }, {collection: "project.user"});

    return UserSchema
};

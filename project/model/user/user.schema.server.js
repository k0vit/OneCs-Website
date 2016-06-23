module.exports = function() {

    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        bookLikes: [{
            bookIsbn: String,
            bookTitle: String,
            bookSubtitle: String,
            bookAuthors: [String],
            bookPublication: String,
            bookGoogleRating: String,
            bookImageUrl: String
        }],
        _bookReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BookReview' }],
        role: { type: String, enum: ['ADMIN', 'STUDENT'] },
        dateCreated: {type: Date},
        dateUpdated: {type: Date, default: Date.now},
        google: {
            id:    String,
            token: String
        }
    }, {collection: "project.user"});

    return UserSchema
};

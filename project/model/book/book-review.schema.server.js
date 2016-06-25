module.exports = function() {

    var mongoose = require("mongoose");

    var BookReviewSchema = mongoose.Schema({
        bookId: String,
        bookCat: String,
        rating: String,
        title: String,
        comment: String,
        user: {
            _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            firstName: String,
            lastName: String,
            userName: String
        },
        dateCreated: {type: Date},
        dateUpdated: {type: Date, default: Date.now},
    }, {collection: "project.book.review"});

    return BookReviewSchema
};
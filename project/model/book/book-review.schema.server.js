module.exports = function() {

    var mongoose = require("mongoose");

    var BookReviewSchema = mongoose.Schema({
        rating: String,
        title: String,
        comment: String,
        book: {
            bookId: String,
            bookCat: String,
            bookTitle: String,
            bookImageUrl: String,
        },
        user: {
            _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            userName: String
        },
        dateCreated: {type: Date},
        dateUpdated: {type: Date, default: Date.now},
    }, {collection: "project.book.review"});

    return BookReviewSchema
};
module.exports = function() {

    var mongoose = require("mongoose");

    var BookReviewSchema = mongoose.Schema({
        bookId: String,
        rating: Number,
        title: String,
        comment: String,
        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        dateCreated: {type: Date},
        dateUpdated: {type: Date, default: Date.now},
    }, {collection: "project.book.review"});

    return BookReviewSchema
};

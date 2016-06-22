module.exports = function() {

    var mongoose = require("mongoose");

    var BookReviewSchema = mongoose.Schema({
        rating: Number,
        title: String,
        comment: String,
        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        _book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
        dateCreated: {type: Date},
        dateUpdated: {type: Date, default: Date.now},
    }, {collection: "project.bookreview"});

    return BookReviewSchema
};

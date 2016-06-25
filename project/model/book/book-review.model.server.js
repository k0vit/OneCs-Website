module.exports = function() {

    var mongoose = require("mongoose");
    var BookReviewSchema = require("./book-review.schema.server")(mongoose);
    var BookReview = mongoose.model("BookReview", BookReviewSchema);

    var api = {
        createBookReview: createBookReview,
        findBookReviewByUserId: findBookReviewByUserId,
        findBookReviewById: findBookReviewById,
        updateBookReview: updateBookReview,
        deleteBookReview: deleteBookReview,
        findBookReviewByBookId: findBookReviewByBookId
    };
    return api;

    function createBookReview(bookReview) {
        bookReview.dateCreated = new Date();
        return BookReview.create(bookReview);
    }

    function findBookReviewById(bkRevId) {
        return BookReview.findById(bkRevId);
    }

    function findBookReviewByUserId(userId) {
        return BookReview.find({'user._user': userId});
    }

    function updateBookReview(id, bookReview) {
        delete bookReview._id;
        return BookReview.update(
            {_id: id},
            {$set : bookReview}
        );
    }

    function deleteBookReview(bkRevId) {
        return BookReview.remove({_id: bkRevId});
    }

    function findBookReviewByBookId(bookId) {
        return BookReview.find({'book.bookId': bookId});
    }
};
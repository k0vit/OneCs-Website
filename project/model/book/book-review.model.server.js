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
        findBookReviewByBookId: findBookReviewByBookId,
        findBookReviewByBookTitle: findBookReviewByBookTitle,
        findBookReviewByBookCat: findBookReviewByBookCat,
        findBookReviewByUsername: findBookReviewByUsername,
        deleteBookReviewByUser : deleteBookReviewByUser
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

    function findBookReviewByBookCat(bkCat) {
        return BookReview.find({'book.bookCat': bkCat});
    }

    function findBookReviewByBookTitle(bkTitle) {
        return BookReview.find({'book.bookTitle': bkTitle});
    }

    function findBookReviewByUsername(uname) {
        return BookReview.find({'user.userName': uname});
    }

    function deleteBookReviewByUser(userId) {
        return BookReview.remove({'user._user': userId});
    }
};
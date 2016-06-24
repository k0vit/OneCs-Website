module.exports = function(app, models) {

    var bookReviewModel = models.bookReviewModel;

    app.post("/api/bookreview", createBookReview);
    app.get("/api/bookreview/:bkRevId", findBookReviewById);
    app.put("/api/bookreview/:bkRevId", updateBookReview);
    app.delete("/api/bookreview/:bkRevId", deleteBookReview);
    app.get("/api/bookreview/books/:bkId", findBookReviewByBookId);
    app.get("/api/bookreview/user/:userId", findBookReviewByUserId);

    function createBookReview(req, res) {
        var newBookReview = req.body;
        bookReviewModel
            .createBookReview(newBookReview)
            .then(
                function (bookReview) {
                    res.json(bookReview);
                },
                function (error) {
                    res.status(500).send("Failed to create book review. Internal Server error");
                }
            );
    }

    function deleteBookReview(req, res) {
        var id = req.params.bkRevId;

        bookReviewModel
            .deleteBookReview(id)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.status(500).send("Unable to remove book review with Id: " + id);
                }
            );
    }

    function updateBookReview(req, res) {
        var id = req.params.bkRevId;
        var newBookReview = req.body;

        bookReviewModel
            .updateBookReview(id, newBookReview)
            .then(
                function(bookReview) {
                    res.send(200);
                },
                function(error) {
                    res.status(500).send("Unable to update book review with ID: " + id);
                }
            );
    }

    function findBookReviewById(req, res) {
        var id = req.params.bkRevId;
        bookReviewModel
            .findBookReviewById(id)
            .then(
                function (bookReview) {
                    res.json(bookReview);
                },
                function (error) {
                    res.status(500).send("Book Reviews with ID: "+ id +" not found");
                }
            );
    }

    function findBookReviewByBookId(req, res) {
        var id = req.params.bkId;
        bookReviewModel
            .findBookReviewByBookId(id)
            .then(
                function (bookReviewies) {
                    res.json(bookReviewies);
                },
                function (error) {
                    res.status(500).send("Book Reviews with book id: "+ id +" not found");
                }
            );
    }

    function findBookReviewByUserId(req, res) {
        var id = req.params.userId;
        bookReviewModel
            .findBookReviewByUserId(id)
            .then(
                function (bookReviewies) {
                    res.json(bookReviewies);
                },
                function (error) {
                    res.status(500).send("Book Reviews with user id: "+ id +" not found");
                }
            );
    }
};
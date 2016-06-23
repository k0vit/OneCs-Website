module.exports = function(app, models) {

    var bookCategoryModel = models.bookCategoryModel;

    app.post("/api/bookcategory", createBookCategory);
    app.get("/api/bookcategory/:bkCatId", findBookCategoryById);
    app.get("/api/bookcategory/", findAllBookCategory);
    app.put("/api/bookcategory/:bkCatId", updateBookCategory);
    app.delete("/api/bookcategory/:bkCatId", deleteBookCategory);

    function createBookCategory(req, res) {
        var newBookCategory = req.body;
        bookCategoryModel
            .findBookCategoryByTitle(newBookCategory.title)
            .then(
                function (bookCategory) {
                    if (bookCategory) {
                        res.status(403).send("Requested book category title " +
                            newBookCategory.title + " is already taken");
                    }
                    else {
                        createNewBookCategory(req, res, newBookCategory);
                    }
                },
                function(error) {
                    res.status(500).send("Failed to create book category. Internal Server error");
                }
            );
    }

    function createNewBookCategory(req, res, newBookCategory) {
        bookCategoryModel
            .createBookCategory(newBookCategory)
            .then(
                function (bookCategory) {
                    res.json(bookCategory);
                },
                function (error) {
                    res.status(500).send("Failed to create book category. Internal Server error");
                }
            );
    }

    function deleteBookCategory(req, res) {
        var id = req.params.bkCatId;

        bookCategoryModel
            .deleteBookCategory(id)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.status(500).send("Unable to remove book category with Id: " + id);
                }
            );
    }

    function updateBookCategory(req, res) {
        var id = req.params.bkCatId;
        var newBookCategory = req.body;

        bookCategoryModel
            .updateBookCategory(id, newBookCategory)
            .then(
                function(bookCategory) {
                    res.send(200);
                },
                function(error) {
                    res.status(500).send("Unable to update book category with ID: " + id);
                }
            );
    }

    function findBookCategoryById(req, res) {
        var id = req.params.bkCatId;
        bookCategoryModel
            .findBookCategoryById(id)
            .then(
                function (bookCategory) {
                    res.json(bookCategory);
                },
                function (error) {
                    res.status(500).send("Book Category with ID: "+ id +" not found");
                }
            );
    }

    function findAllBookCategory(req, res) {
        bookCategoryModel
            .findAllBookCategory()
            .then(
                function (bookCategories) {
                    res.json(bookCategories);
                },
                function(error) {
                    res.status(500).send("Failed to retrieve all the book categoies");
                }
            );
    }
};
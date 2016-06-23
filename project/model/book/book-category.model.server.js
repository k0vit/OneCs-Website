module.exports = function() {

    var mongoose = require("mongoose");
    var BookCategorySchema = require("./book-category.schema.server")(mongoose);
    var BookCategory = mongoose.model("BookCategory", BookCategorySchema);

    var api = {
        createBookCategory: createBookCategory,
        findBookCategoryByTitle: findBookCategoryByTitle,
        findBookCategoryById: findBookCategoryById,
        updateBookCategory: updateBookCategory,
        deleteBookCategory: deleteBookCategory,
        findAllBookCategory: findAllBookCategory
    };
    return api;

    function createBookCategory(bookCategory) {
        bookCategory.dateCreated = new Date();
        return BookCategory.create(bookCategory);
    }

    function findBookCategoryById(bkCatId) {
        return BookCategory.findById(bkCatId);
    }

    function findBookCategoryByTitle(title) {
        return BookCategory.findOne({title: title});
    }

    function updateBookCategory(id, bookCategory) {
        delete bookCategory._id;
        return BookCategory.update(
            {_id: id},
            {$set : bookCategory}
        );
    }

    function deleteBookCategory(bkCatId) {
        return BookCategory.remove({_id: bkCatId});
    }

    function findAllBookCategory() {
        return BookCategory.find();
    }
};
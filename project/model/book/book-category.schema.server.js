module.exports = function() {

    var mongoose = require("mongoose");

    var BookCategorySchema = mongoose.Schema({
        title: String,
        author: String,
        display: String,
        url: String,
        dateCreated: {type: Date},
        dateUpdated: {type: Date, default: Date.now},
    }, {collection: "project.book.category"});

    return BookCategorySchema
};

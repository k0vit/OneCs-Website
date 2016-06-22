module.exports = function() {

    var mongoose = require("mongoose");

    var BookSchema = mongoose.Schema({
        dateCreated: {type: Date},
        dateUpdated: {type: Date, default: Date.now},
    }, {collection: "project.book"});

    return BookSchema
};

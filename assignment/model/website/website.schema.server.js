module.exports = function() {

    var mongoose = require("mongoose");

    var WebsiteSchema = mongoose.Schema({
        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name : String,
        description : String,
        _pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
        dateCreated: {type: Date},
        dateUpdated: {type: Date, default: Date.now}
    }, {collection: "assignment.website"});

    return WebsiteSchema;
};
module.exports = function() {

    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
        _page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
        type: { type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT', 'TEXT'] },
        name : String,
        text: String,
        placeholder: String,
        description : String,
        url: String,
        width: String,
        height: Number,
        position: Number,
        rows: Number,
        size: { type: Number, min: 1, max: 6 },
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date},
        dateUpdated: {type: Date, default: Date.now}
    }, {collection: "assignment.widget"});

    return WidgetSchema;
};
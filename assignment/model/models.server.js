module.exports = function() {

    var connectionString = 'mongodb://localhost/nisark-webdev';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server.js")(mongoose);
    var websiteModel = require("./website/website.model.server.js")(mongoose);
    var pageModel = require("./page/page.model.server.js")(mongoose);
    var widgetModel = require("./widget/widget.model.server.js")(mongoose);

    var models = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    return models;
};
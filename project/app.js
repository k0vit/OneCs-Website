module.exports = function(app) {

    var models = require("./model/models.server.js")();

    require("./services/user.service.server.js")(app, models);
};

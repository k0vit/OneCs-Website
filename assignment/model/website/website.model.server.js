module.exports = function() {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        findWebsiteByName: findWebsiteByName
    };
    return api;

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        website.dateCreated = new Date();
        return Website.create(website);
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId});
    }

    function findWebsiteById(websiteId) {
        return Website.findById(websiteId);
    }

    function findWebsiteByName(name, userId) {
        return Website.findOne({name: name, _user: userId});
    }

    function updateWebsite(websiteId, website) {
        delete website._id;
        return Website.update(
            {_id: websiteId},
            {$set: website}
        );
    }

    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }
};
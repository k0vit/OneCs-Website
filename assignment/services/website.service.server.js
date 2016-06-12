module.exports = function(app, models) {

    var websiteModel = models.websiteModel;
    var userModel = models.userModel;

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var newWebsite = req.body;
        var userId = req.params.userId;

        websiteModel
            .findWebsiteByName(newWebsite.name, userId)
            .then(
                function (website) {
                    if (website) {
                        res.status(403).send("Requested website name " + newWebsite.name + " is already taken");
                    }
                    else {
                        createNewWebsite(userId, newWebsite, res);
                    }
                },
                function(error) {
                    res.status(500).send("Failed to create website. Internal Server error");
                }
            );
    }

    function createNewWebsite(userId, newWebsite, res) {
        websiteModel
            .createWebsiteForUser(userId, newWebsite)
            .then(
                function (website) {
                    if (website) {
                        updateUserWebsite(userId, website, res);
                    }
                    else {
                        res.status(400).send("Failed to create website for user id " + userId);
                    }
                },
                function (error) {
                    res.status(500).send("Failed to create website. Internal Server error");
                }
            );
    }

    function updateUserWebsite(userId, website, res) {
        var websiteId = website._id;
        userModel
            .findUserById(userId)
            .then(
                function(user){
                    user._websites.push(websiteId);
                    user.save();
                    res.json(website);
                },
                function(error){
                    res.status(500).send("Internal Server Error. " +
                        "Website created successfully but fail to update user about this website.");
                }
            );
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;

        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    var userId = website._user;
                    removeWebsite(userId, websiteId, res);
                },
                function (error) {
                    res.status(500).send("Failed to delete website as unable to find user with user for this website." +
                        " Internal Server error");
                }
            );
    }

    function removeWebsite(userId, websiteId, res) {
        websiteModel
            .deleteWebsite(websiteId)
            .then(
                function (stats) {
                    removeWebsiteFromUser(res, userId, websiteId);
                },
                function (error) {
                    res.status(500).send("Failed to delete website. Internal Server error");
                }
            );
    }

    function removeWebsiteFromUser(res, userId, websiteId) {
        userModel
            .findUserById(userId)
            .then(
                function(user) {
                    var elemIndex = user._websites.indexOf(websiteId);
                    user._websites.splice(elemIndex, 1);
                    user.save();
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(500).send("Website deleted successfully but failed to update user." +
                        " Internal Server error");
                }
            );
    }

    function updateWebsite(req, res) {
        var id = req.params.websiteId;
        var newWebsite = req.body;

        websiteModel
            .updateWebsite(id, newWebsite)
            .then(
                function (website) {
                    res.json(website);
                },
                function (error) {
                    res.status(500).send("Failed to update website. Internal Server error");
                }
            );
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;

        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    if (!website) {
                        res.status(400).send("Website with ID: "+ websiteId +" not found");
                    }
                    else {
                        res.json(website);
                    }
                },
                function (error) {
                    res.status(500).send("Failed to retrieve website. Website with ID: "+ websiteId +" not found");
                }
            );
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.status(500).send("Failed to retrieve websites. Internal Server error");
                }
            );
    }
};
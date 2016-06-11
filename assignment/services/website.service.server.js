module.exports = function(app, models) {

    var websiteModel = models.websiteModel;

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
                    res.json(website);
                },
                function (error) {
                    res.status(500).send("Failed to create website. Internal Server error");
                }
            );
    }

    function deleteWebsite(req, res) {
        var id = req.params.websiteId;
        websiteModel
            .deleteWebsite(id)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.status(500).send("Failed to delete website. Internal Server error");
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
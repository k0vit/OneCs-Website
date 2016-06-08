module.exports = function(app) {

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var newWebsite = req.body;
        for (var w in websites) {
            if (websites[w].name === newWebsite.name) {
                res.status(400).send("Website name " + newWebsite.name + " is already in use");
                return;
            }
        }

        var devId = req.params.userId;
        newWebsite._id = (new Date()).getTime() + "";
        newWebsite.developerId = devId;
        websites.push(newWebsite);
        res.json(newWebsite);
    }

    function deleteWebsite(req, res) {
        var id = req.params.websiteId;
        for(var i in websites) {
            if(websites[i]._id === id) {
                websites.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(404).send("Unable to remove website with ID: " + id);
    }

    function updateWebsite(req, res) {
        var id = req.params.websiteId;
        var newWebsite = req.body;
        for(var i in websites) {
            if(websites[i]._id === id) {
                websites[i] = newWebsite;
                res.send(200);
                return;
            }
        }
        res.status(400).send("Website with ID: "+ id +" not found");
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        for(var i in websites) {
            if(websiteId === websites[i]._id) {
                res.send(websites[i]);
                return;
            }
        }

        res.status(400).send("Website with ID: "+ id +" not found");
    }

    function findAllWebsitesForUser(req, res) {
        var resultSet = [];
        var devId = req.params.userId;

        for(var i in websites) {
            if(websites[i].developerId === devId) {
                resultSet.push(websites[i]);
            }
        }

        res.json(resultSet);
        return;
    }
};
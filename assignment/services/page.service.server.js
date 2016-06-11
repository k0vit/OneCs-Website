module.exports = function(app, models) {

    var pageModel = models.pageModel;

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var newPage = req.body;
        var websiteId = req.params.websiteId;

        pageModel
            .findPageByName(newPage.name, websiteId)
            .then(
                function (page) {
                    if (page) {
                        res.status(403).send("Requested page name " + newPage.name + " is already taken");
                    }
                    else {
                        createNewPage(websiteId, newPage, res);
                    }
                },
                function(error) {
                    res.status(500).send("Failed to create page. Internal Server error");
                }
            );
    }

    function createNewPage(websiteId, newPage, res) {
        pageModel
            .createPage(websiteId, newPage)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.status(500).send("Failed to create page. Internal Server error");
                }
            );
    }

    function deletePage(req, res) {
        var id = req.params.pageId;
        pageModel
            .deletePage(id)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.status(500).send("Failed to delete page. Internal Server error");
                }
            );
    }

    function updatePage(req, res) {
        var id = req.params.pageId;
        var newPage = req.body;

        pageModel
            .updatePage(id, newPage)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.status(500).send("Failed to update page. Internal Server error");
                }
            );
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    if (!page) {
                        res.status(400).send("Page with ID: "+ pageId +" not found");
                    }
                    else {
                        res.json(page);
                    }
                },
                function (error) {
                    res.status(500).send("Failed to retrieve page. Page with ID: "+ pageId +" not found");
                }
            );
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (error) {
                    res.status(500).send("Failed to retrieve pages. Internal Server error");
                }
            );
    }
};
module.exports = function(app, models) {

    var pageModel = models.pageModel;
    var websiteModel = models.websiteModel;

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
                    updateWebsitePages(websiteId, page, res);
                },
                function (error) {
                    res.status(500).send("Failed to create page. Internal Server error");
                }
            );
    }

    function updateWebsitePages(websiteId, page, res) {
        var pageId = page._id;
        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website){
                    website._pages.push(pageId);
                    website.save();
                    res.json(page);
                },
                function(error){
                    res.status(500).send("Internal Server Error. " +
                        "Page created successfully but fail to update website about this page.");
                }
            );
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    var websiteId = page._website;
                    removePage(res, websiteId, pageId);
                },
                function (error) {
                    res.status(500).send("Failed to delete page as unable to find page with id as "+ pageId +
                        ". Internal Server error");
                }
            );
    }

    function removePage(res, websiteId, pageId) {
        pageModel
            .deletePage(pageId)
            .then(
                function (stat) {
                    removePageFromWebsite(res, websiteId, pageId);
                },
                function (error) {
                    res.status(500).send("Failed to delete page. Internal Server error");
                }
            );
    }

    function removePageFromWebsite(res, websiteId, pageId) {
        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website) {
                    var elemIndex = website._pages.indexOf(pageId);
                    website._pages.splice(elemIndex, 1);
                    website.save();
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(500).send("Page deleted successfully but failed to update website." +
                        " Internal Server error");
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
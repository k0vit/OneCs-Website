module.exports = function(app) {

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var newPage = req.body;
        for (var p in pages) {
            if (pages[p].name === newPage.name) {
                res.status(400).send("Page name " + newPage.name + " is already in use");
                return;
            }
        }

        var websiteId = req.params.websiteId;
        newPage._id = (new Date()).getTime() + "";
        newPage.websiteId = websiteId;
        pages.push(newPage);
        res.json(newPage);
    }

    function deletePage(req, res) {
        var id = req.params.pageId;
        for(var i in pages) {
            if(pages[i]._id === id) {
                pages.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(404).send("Unable to remove page with Id: " + id);
    }

    function updatePage(req, res) {
        var id = req.params.pageId;
        var newPage = req.body;
        for(var i in pages) {
            if(pages[i]._id === id) {
                pages[i] = newPage;
                res.send(200);
                return;
            }
        }
        res.status(400).send("Page with ID: "+ id +" not found");
    }

    function findPageById(req, res) {
        var id = req.params.pageId;
        for(var i in pages) {
            if(id === pages[i]._id) {
                res.send(pages[i]);
                return;
            }
        }

        res.status(400).send("Page with ID: "+ id +" not found");
    }

    function findAllPagesForWebsite(req, res) {
        var resultSet = [];
        var websiteId = req.params.websiteId;

        for(var i in pages) {
            if(pages[i].websiteId === websiteId) {
                resultSet.push(pages[i]);
            }
        }

        res.json(resultSet);
        return;
    }
};
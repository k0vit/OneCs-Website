module.exports = function (app) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/upload", uploadImage);

    function createWidget(req, res) {
        var newWidget = req.body;
        var pageId = req.params.pageId;
        newWidget._id = (new Date()).getTime() + "";
        newWidget.pageId = pageId;
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function updateWidget(req, res) {
        var id = req.params.widgetId;
        var newWidget = req.body;
        for(var i in widgets) {
            if(widgets[i]._id === id) {
                widgets[i] = newWidget;
                res.send(200);
                return;
            }
        }
        res.status(400).send("Widget with ID: "+ id +" not found");
    }

    function deleteWidget(req, res) {
        var id = req.params.widgetId;
        for(var i in widgets) {
            if(widgets[i]._id === id) {
                widgets.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(404).send("Unable to remove widget with Id: " + id);
    }

    function findAllWidgetsForPage(req, res) {
        var resultSet = [];
        var pageId = req.params.pageId;

        for(var i in widgets) {
            if(widgets[i].pageId === pageId) {
                resultSet.push(widgets[i]);
            }
        }
        res.json(resultSet);
        return;
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                res.json(widgets[i]);
                return;
            }
        }
        res.status(404).send("Widget with id as " + widgetId + " not found");
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var userId = req.body.userId;
        var pageId = req.body.pageId;
        var websiteId = req.body.websiteId;
        var width = req.body.width;
        var myFile = req.file;

        if(myFile == null) {
            if (widgetId) {
                res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
            }
            else {
                res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/new/IMAGE");
            }
            return;
        }

        var filename = myFile.filename;

        if (widgetId) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i].url = "/uploads/" + filename;
                    res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
                    return;
                }
            }
        }
        else {
            var newWidget = {};
            newWidget.widgetType = "IMAGE";
            newWidget._id =  (new Date()).getTime() + "";
            newWidget.url = "/uploads/" + filename;
            newWidget.pageId = pageId;
            if (width) {
                newWidget.width = width;
            }
            else {
                newWidget.width = "100%";
            }
            widgets.push(newWidget);
            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
            return;
        }
    }
}

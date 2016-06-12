module.exports = function (app, models) {

    var widgetModel = models.widgetModel;
    var pageModel = models.pageModel;
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

        widgetModel
            .findWidgetByName(newWidget.name, pageId)
            .then(
                function (widget) {
                    if (widget) {
                        res.status(403).send("Requested widget name " + newWidget.name + " is already taken");
                    }
                    else {
                        createNewWidget(pageId, newWidget, res);
                    }
                },
                function(error) {
                    res.status(500).send("Failed to create widget. Internal Server error");
                }
            );
    }

    function createNewWidget(pageId, newWidget, res) {
        widgetModel
            .createWidget(pageId, newWidget)
            .then(
                function (widget) {
                    updatePageWidgetLst(pageId, widget, res);
                },
                function (error) {
                    res.status(500).send("Failed to create widget. Internal Server error");
                }
            );
    }

    function updatePageWidgetLst(pageId, widget, res) {
        var widgetId = widget._id;
        pageModel
            .findPageById(pageId)
            .then(
                function(page){
                    page._widgets.push(widgetId);
                    page.save();
                    res.json(widget);
                },
                function(error){
                    res.status(500).send("Internal Server Error. " +
                        "Widget created successfully but fail to update page about this widget.");
                }
            );
    }

    function updateWidget(req, res) {
        var id = req.params.widgetId;
        var newWidget = req.body;

        widgetModel
            .updateWidget(id, newWidget)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.status(500).send("Failed to update widget. Internal Server error");
                }
            );
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    var pageId = widget._page;
                    removeWidget(res, pageId, widgetId);
                },
                function (error) {
                    res.status(500).send("Failed to delete widget as unable to find widget with id as "+ widgetId +
                        ". Internal Server error");
                }
            );
    }

    function removeWidget(res, pageId, widgetId) {
        widgetModel
            .deleteWidget(widgetId)
            .then(
                function (stat) {
                    removeWidgetFromWidgetLst(res, pageId, widgetId);
                },
                function (error) {
                    res.status(500).send("Failed to delete widget. Internal Server error");
                }
            );
    }

    function removeWidgetFromWidgetLst(res, pageId, widgetId) {
        pageModel
            .findPageById(pageId)
            .then(
                function(page) {
                    var elemIndex = page._widgets.indexOf(widgetId);
                    page._widgets.splice(elemIndex, 1);
                    page.save();
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(500).send("Widget deleted successfully but failed to update page." +
                        " Internal Server error");
                }
            );
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.json(widgets);
                },
                function (error) {
                    res.status(500).send("Failed to get all the widgets for page id " + pageId + ". Internal Server error");
                }
            );

    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.status(500).send("Failed to get requested widget. Internal Server error");
                }
            );
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
            widgetModel
                .updateWidgetUrl(widgetId, "/uploads/" + filename)
                .then(
                    function (widget) {
                        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
                    },
                    function (error) {
                        res.status(500).send("Failed to get upload the image. Internal Server error");
                    }
                );
        }
        else {
            var newWidget = {};
            newWidget.type = "IMAGE";
            newWidget.url = "/uploads/" + filename;
            if (width) {
                newWidget.width = width;
            }
            else {
                newWidget.width = "100%";
            }

            widgetModel
                .createWidget(pageId, newWidget)
                .then(
                    function (widget) {
                        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
                    },
                    function (error) {
                        res.status(500).send("Failed to create widget. Internal Server error");
                    }
                );
        }
    }
}
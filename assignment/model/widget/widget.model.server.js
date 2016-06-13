module.exports = function() {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        findWidgetByName: findWidgetByName,
        updateWidgetUrl: updateWidgetUrl
    };
    return api;

    function updateWidgetUrl(widgetId, url) {
        return Widget.update(
            {_id: widgetId},
            {$set: {
                url: url
            }}
        );
    }

    function createWidget(pageId, widget) {
        widget._page = pageId;
        widget.dateCreated = new Date();
        return findMaxPos(pageId).then(
            function(wid) {
                if (wid) {
                    console.log(widget);
                    widget.position = wid.position + 1;
                    return Widget.create(widget)
                }
                else {
                    console.log(widget);
                    widget.position = 1;
                    return Widget.create(widget)
                }
            },
            function(error) {
                return error;
            }
        );
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetByName(name) {
        return Widget.findOne({name: name});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        delete widget._id;
        return Widget.update(
            {_id: widgetId},
            {$set: widget}
        );
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }

    function reorderWidget(pageId, start, end) {
        return Widget
            .find({_page: pageId})
            .sort({position: 1})
            .exec()
            .then(
                function(widgets) {
                    var prevPos = -1;
                    if (end > start) {
                        for (var i = 0; i < widgets.length; i++) {
                            if (i == start) {
                                prevPos = widgets[i].position;
                            }
                            else if (i > start && i <= end) {
                                var currentPos = widgets[i].position;
                                widgets[i].position = prevPos;
                                prevPos = currentPos;
                                if (i == end) {
                                    widgets[start].position = prevPos;
                                    widgets[start].save();
                                }
                                widgets[i].save();
                            }
                        }
                    }
                    else {
                        for (var i = widgets.length-1; i >= 0; i--) {
                            if (i == start) {
                                prevPos = widgets[i].position;
                            }
                            else if (i < start && i >= end) {
                                var currentPos = widgets[i].position;
                                widgets[i].position = prevPos;
                                prevPos = currentPos;
                                if (i == end) {
                                    widgets[start].position = prevPos;
                                    widgets[start].save();
                                }
                                widgets[i].save();
                            }
                        }
                    }
                    return;
                },
                function(error) {
                    return error;
                }
            );
    }

    function findMaxPos(pageId){
        return Widget.find({_page: pageId}).sort({position: -1}).findOne().exec();
    }
};
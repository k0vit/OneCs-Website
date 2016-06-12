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
        return Widget.update(
            {_id: widgetId},
            {$set: widget}
        );
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }

    function reorderWidget(pageId, start, end) {

    }

    function findMaxPos(pageId){
        return Widget.find({_page: pageId}).sort({position: -1}).findOne().exec();
    }
};
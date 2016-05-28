/**
 * Created by kovit on 5/28/2016.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];


    function WidgetService() {
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            deleteWidget: deleteWidget,
            findWidgetsById: findWidgetsById,
            updateWidget: updateWidget
        };
        return api;
    }

    function deleteWidget(widgetId) {
        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                widgets.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    function createWidget(pageId, widget) {
            widget._id = (new Date()).getTime()+"",
            widget.pageId = pageId;
        widgets.push(widget);
    }

    function findWidgetsByPageId(pageId) {
        var resultSet = [];
        for(var i in widgets) {
            if(widgets[i].pageId === pageId) {
                resultSet.push(widgets[i]);
            }
        }
        return resultSet;
    }

    function findWidgetsById(widgetId) {
        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                return widgets[i];
            }
        }
        return false;
    }

    function updateWidget(widgetId, widget) {
        var website = findWebsiteById(widgetId);
        if (website) {
            website.name = newWebsite.name;
            website.description = newWebsite.description;
            return true;
        }
        else {
            return false;
        }
    }
})();

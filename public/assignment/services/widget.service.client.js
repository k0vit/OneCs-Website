/**
 * Created by kovit on 5/28/2016.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            deleteWidget: deleteWidget,
            findWidgetsById: findWidgetsById,
            updateWidget: updateWidget,
            reorderWidget: reorderWidget
        };
        return api;


        function deleteWidget(widgetId) {
            return $http.delete(getUrlWithWidgetId(widgetId));
        }

        function createWidget(pageId, widget) {
            return $http.post(getUrlWithPageId(pageId), widget);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get(getUrlWithPageId(pageId));
        }

        function findWidgetsById(widgetId) {
            return $http.get(getUrlWithWidgetId(widgetId));
        }

        function updateWidget(widgetId, widget) {
            return $http.put(getUrlWithWidgetId(widgetId), widget);
        }

        function getUrlWithWidgetId(widgetId) {
            return "/api/widget/" + widgetId;
        }

        function getUrlWithPageId(pageId) {
            return "/api/page/" + pageId + "/widget";
        }

        function reorderWidget(pageId, start, end) {
            return $http.put(getUrlWithPageId(pageId) + "?start=" + start +"&end=" + end);
        }
    }
})();

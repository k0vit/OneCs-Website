/**
 * Created by kovit on 5/28/2016.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($sce, $routeParams, WidgetService, $location) {
        var vm = this;
        vm.pageId = $routeParams.pid;
        vm.userId = $routeParams.id;
        vm.websiteId = $routeParams.wid;
        vm.widgetId = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = angular.copy(WidgetService.findWidgetsById(vm.widgetId));
            console.log(vm.widget);
        }
        init();

        function updateWidget() {
            var result = WidgetService.updateWidget(vm.widgetId, vm.widget);

            if(result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.error = "Failed to update widget"
            }
        }

        function deleteWidget() {
            var result = WidgetService.deleteWidget(vm.widgetId);

            if(result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.error = "Failed to delete widget"
            }
        }
    }
})();
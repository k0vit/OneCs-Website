/**
 * Created by kovit on 5/28/2016.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.pageId = $routeParams.pid;
        vm.userId = $routeParams.id;
        vm.websiteId = $routeParams.wid;
        vm.widgetType  = $routeParams.wtype;
        vm.createWidget = createWidget;

        function createWidget() {
            vm.widget.widgetType = vm.widgetType;
            var result = WidgetService.createWidget(vm.pageId, angular.copy(vm.widget));

            if(result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.error = "Internal Error: Failed to create widget"
            }
        }
    }
})();
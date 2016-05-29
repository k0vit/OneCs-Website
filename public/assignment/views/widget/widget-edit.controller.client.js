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
            var isValid = validate();

            if (isValid) {
            var result = WidgetService.updateWidget(vm.widgetId, vm.widget);

            if (result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.error = "Internal Error: Failed to update widget"
            }
        }
    }

    function validate() {
        switch(vm.widget.widgetType) {
            case "HEADER":
                if ((!vm.widget.size) || vm.widget.size === "Select Heading Size") {
                    vm.error = "Please provide size of the heading";
                    return false;
                }
                else if (!vm.widget.text.trim()) {
                    vm.error = "Please provide heading text";
                    return false;
                }
                break;
            case "IMAGE":
            case "YOUTUBE":
                if ((!vm.widget.url)) {
                    vm.error = "Please provide url";
                    return false;
                }
                if ((!vm.widget.width)) {
                    vm.widget.width = "100%";
                }
                break;
        }
        return true;
    }

    function deleteWidget() {
        var result = WidgetService.deleteWidget(vm.widgetId);

        if(result) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        } else {
            vm.error = "Internal Error: Failed to delete widget"
        }
    }
}
})();
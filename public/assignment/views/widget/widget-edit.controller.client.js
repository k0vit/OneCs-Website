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
            WidgetService
                .findWidgetsById(vm.widgetId)
                .then(
                    function (response) {
                        vm.widget = response.data;
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        init();

        function updateWidget() {
            if (validate()) {
                WidgetService
                    .updateWidget(vm.widgetId, vm.widget)
                    .then(navigate, displayErrorMsg);
            }
        }

        function navigate() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function displayErrorMsg(error) {
            vm.error = error.data;
        }

        function validate() {
            switch(vm.widget.widgetType) {
                case "HEADER":
                    if ((!vm.widget.size) || vm.widget.size === "Select Heading Size") {
                        vm.error = "Please provide size of the heading";
                        return false;
                    }
                    else if (!vm.widget.text) {
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
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(navigate, displayErrorMsg);
        }
    }
})();
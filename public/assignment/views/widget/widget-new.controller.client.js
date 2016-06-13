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
        vm.navigateToSearchFlickr = navigateToSearchFlickr;

        function createWidget() {
            if (validate()) {
                vm.widget.type = vm.widgetType;
                console.log(vm.widget);
                WidgetService
                    .createWidget(vm.pageId, vm.widget)
                    .then(function (response) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );
            }
        }

        function navigateToSearchFlickr() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/new/flickr");
        }

        function validate() {
            if (!vm.widget) {
                vm.error = "Please provide widget details";
                return false;
            }

            switch(vm.widgetType) {
                case "HEADER":
                    if ((!vm.widget.size) || vm.widget.size === "Select Heading Size") {
                        vm.error = "Please provide size of the heading";
                        return false;
                    }
                    else if ((!vm.widget.text) || !vm.widget.text.trim()) {
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
    }
})();
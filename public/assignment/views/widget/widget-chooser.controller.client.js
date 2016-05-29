/**
 * Created by kovit on 5/28/2016.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($routeParams, $location) {
        var vm = this;
        vm.pageId = $routeParams.pid;
        vm.userId = $routeParams.id;
        vm.websiteId = $routeParams.wid;
    }
})();
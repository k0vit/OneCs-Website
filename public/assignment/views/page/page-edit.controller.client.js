(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams.id;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.page = angular.copy(PageService.findPageById(vm.pageId));
        }
        init();

        function updatePage() {
            var result = PageService.updatePage(vm.pageId, vm.page);

            if(result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.error = "Failed to update page";
            }
        }

        function deletePage() {
            var result = PageService.deletePage(vm.pageId);

            if(result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.error = "Failed to delete page";
            }
        }
    }
})();
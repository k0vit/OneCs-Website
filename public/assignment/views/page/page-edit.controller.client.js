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
            var isValid = validate();

            if (isValid) {
            var result = PageService.updatePage(vm.pageId, vm.page);

            if (result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.error = "Internal Error: Failed to update page";
            }
        }
    }

    function validate() {
        if (!vm.page) {
            vm.error = "Please provide page name and title";
            return false;
        }
        else if (!vm.page.name) {
            vm.error = "Please provide unique page name";
            return false;
        }
        else if (!vm.page.title) {
            vm.error = "Please provide page title";
            return false;
        }
        return true;
    }

    function deletePage() {
        var result = PageService.deletePage(vm.pageId);

        if(result) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        } else {
            vm.error = "Internal Error: Failed to delete page";
        }
    }
}
})();
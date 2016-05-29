(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams.id;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.createPage = createPage;

        function createPage() {
            var isValid = validate();

            if (isValid) {
                var result = PageService.createPage(vm.websiteId, vm.page);

                if (result) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                } else {
                    vm.error = "Internal Error: Failed to create website"
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
            else if (PageService.findPageByName(vm.page.name)) {
                vm.error = "Page Name already exists";
                return false;
            }
            return true;
        }
    }
})();
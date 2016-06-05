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
            if (validate()) {
                PageService
                    .createPage(vm.websiteId, vm.page)
                    .then(function (response) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );

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
    }
})();
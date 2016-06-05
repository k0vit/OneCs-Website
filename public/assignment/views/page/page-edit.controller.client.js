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
            PageService
                .findPageById(vm.pageId)
                .then(
                    function (response) {
                        vm.page = response.data;
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }
        init();

        function updatePage() {
            if (validate()) {
                PageService
                    .updatePage(vm.pageId, vm.page)
                    .then(navigate, displayErrorMsg);
            }
        }

        function navigate() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function displayErrorMsg(error) {
            vm.error = error.data;
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
            PageService
                .deletePage(vm.pageId)
                .then(navigate, displayErrorMsg);
        }
    }
})();
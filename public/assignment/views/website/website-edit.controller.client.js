(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams.id;
        vm.websiteId = $routeParams.wid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(
                    function (response) {
                        vm.website = response.data;
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        init();

        function updateWebsite() {
            if (validate()) {
                WebsiteService
                    .updateWebsite(vm.websiteId, vm.website)
                    .then(navigate, displayErrorMsg);
            }
        }

        function navigate() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function displayErrorMsg(error) {
            vm.error = error.data;
        }

        function validate() {
            if (!vm.website) {
                vm.error = "Please provide website name and description";
                return false;
            }
            else if (!vm.website.name) {
                vm.error = "Please provide unique website name";
                return false;
            }
            return true;
        }

        function deleteWebsite() {
            if (!vm.error) {
                WebsiteService
                    .deleteWebsite(vm.websiteId)
                    .then(navigate, displayErrorMsg);
            }
        }
    }
})();
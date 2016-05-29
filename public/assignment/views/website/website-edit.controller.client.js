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
            vm.website = angular.copy(WebsiteService.findWebsiteById(vm.websiteId));
        }
        init();

        function updateWebsite() {
            var isValid = validate();

            if (isValid) {
                var result = WebsiteService.updateWebsite(vm.websiteId, vm.website);

                if (result) {
                    $location.url("/user/" + vm.userId + "/website");
                } else {
                    vm.error = "Internal Error: Failed to update website";
                }
            }
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
            var result = WebsiteService.deleteWebsite(vm.websiteId);

            if(result) {
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.error = "Internal Error: Failed to delete website";
            }
        }
    }
})();
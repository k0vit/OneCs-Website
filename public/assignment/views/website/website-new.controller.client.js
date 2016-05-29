(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams.id;
        vm.websiteId = $routeParams.wid;
        vm.createWebsite = createWebsite;

        function createWebsite() {
            var isValid = validate();

            if (isValid) {
                var result = WebsiteService.createWebsite(vm.userId, vm.website);

                if (result) {
                    $location.url("/user/" + vm.userId + "/website");
                } else {
                    vm.error = "Internal Error: Failed to create website";
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
            else if (WebsiteService.findWebsiteByName(vm.website.name)) {
                vm.error = "Website Name already exists";
                return false;
            }
            return true;
        }
    }
})();
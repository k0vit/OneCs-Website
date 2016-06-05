(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams.id;
        vm.createWebsite = createWebsite;

        function createWebsite() {
            if (validate()) {
                WebsiteService
                    .createWebsite(vm.userId, vm.website)
                    .then(function (response) {
                            $location.url("/user/" + vm.userId + "/website");
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );
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
    }
})();
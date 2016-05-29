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
            var result = WebsiteService.createWebsite(vm.userId, vm.website);

            if(result) {
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.error = "Internal Error: Failed to create website";
            }
        }
    }
})();
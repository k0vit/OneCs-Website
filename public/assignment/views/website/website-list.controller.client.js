(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            var userId = $routeParams.id;
            vm.websites = WebsiteService.findWebsitesForUser(userId);
        }
        init();
    }
})();
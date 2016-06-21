(function() {
    angular
        .module("OneCs")
        .controller("BookSearchController", BookSearchController);

    function BookSearchController($location, $rootScope) {
        var vm = this;
        vm.isCollapsed = true;
        var currentUser = $rootScope.currentUser

        function init() {
            vm.isUserLoggedIn = false;
            if (currentUser) {
                vm.isUserLoggedIn = true;
            }
        }
        init();
    }
})();

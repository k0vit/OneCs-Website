(function() {
    angular
        .module("OneCs")
        .controller("BookDetailController", BookDetailController);

    function BookDetailController($location, $rootScope, UserService) {
        var vm = this;
        vm.logout = logout;

        function init() {
            vm.isCollapsed = true;
            vm.isUserLoggedIn = false;

            if ($rootScope.currentUser) {
                vm.isUserLoggedIn = true;
                vm.user=$rootScope.currentUser;
            }
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser=null;
                        vm.user=null;
                        vm.isUserLoggedIn=false;
                        $location.url("/home");
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }
    }
})();

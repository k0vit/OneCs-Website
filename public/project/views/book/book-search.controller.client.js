(function() {
    angular
        .module("OneCs")
        .controller("BookSearchController", BookSearchController);

    function BookSearchController($location, $rootScope, UserService, BookCategoryService) {
        var vm = this;
        vm.logout = logout;

        function init() {
            vm.isCollapsed = true;
            vm.isUserLoggedIn = false;

            if ($rootScope.currentUser) {
                vm.isUserLoggedIn = true;
                vm.user=$rootScope.currentUser;
            }

            BookCategoryService
                .findAllBookCategory()
                .then(
                    function(response) {
                        vm.bookCategories = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
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

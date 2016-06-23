(function() {
    angular
        .module("OneCs")
        .controller("BookDetailController", BookDetailController);

    function BookDetailController($sce, $routeParams, $location, $rootScope, UserService, BookSearchService) {
        var vm = this;
        vm.logout = logout;
        vm.getSafeHtml = getSafeHtml;
        vm.isCollapsed = true;
        vm.bkCat = $routeParams.bkCat;
        vm.bkId = $routeParams.bkId;

        function init() {
            checkIfUserLoggedIn();
            getBookDetails();
        }
        init();

        function getSafeHtml(htmlText) {
            return $sce.trustAsHtml(htmlText);
        }

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

        function getBookDetails() {
            BookSearchService
                .getBookDetails(vm.bkId)
                .then(
                    function(response) {
                        vm.book = response.data;
                    },
                    function(error) {
                        vm.error = error;
                    }
                );
        }

        function checkIfUserLoggedIn() {
            vm.isUserLoggedIn = false;

            if ($rootScope.currentUser) {
                vm.isUserLoggedIn = true;
                vm.user=$rootScope.currentUser;
            }
        }
    }
})();

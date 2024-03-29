(function() {
    angular
        .module("OneCs")
        .controller("BookSearchResultController", BookSearchResultController);

    function BookSearchResultController($routeParams, $location, $rootScope, UserService, BookSearchService) {
        var vm = this;
        vm.logout = logout;

        function init() {
            if ($rootScope.previousPath) {
                $rootScope.previousPath=false;
            }
            vm.isCollapsed = true;
            checkIfUserLoggedIn();
            searchBooks();
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

        function searchBooks() {
            var searchTerm=$routeParams.bkCat.split("&");
            var title = searchTerm[0];
            var author = searchTerm[1];
            vm.title=title;
            vm.author=author;

            if (author) {
                vm.bkCategory = $routeParams.bkCat;
            }
            else {
                vm.bkCategory = title;
            }

            BookSearchService
                .searchBooks(title, author)
                .then(
                    function(response) {
                        vm.books = response.data;
                        console.log(vm.books);
                        if (vm.books.totalItems==0) {
                            vm.noResult=true;
                        }
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

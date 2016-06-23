(function() {
    angular
        .module("OneCs")
        .controller("BookSearchController", BookSearchController);

    function BookSearchController($location, $rootScope, UserService, BookCategoryService) {
        var vm = this;
        vm.logout = logout;
        vm.searchBooks = searchBooks;
        vm.searchBookByCategory = searchBookByCategory;

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

        function searchBooks() {
            if (!vm.searchTerm || !vm.searchOptions) {
                vm.error = "Please enter search term and select search option"
            }
            else if (vm.searchOptions==='defaul') {
                vm.error = "Please select valid search option"
            }
            else {
                switch (vm.searchOptions) {
                    case "Title":
                        $location.url("book/" +  vm.searchTerm);
                        break;
                    case "TitleNAuthor":
                        $location.url("book/" + vm.searchTerm);
                        break;
                }
            }

        }

        function searchBookByCategory(title, author) {
            if (author) {
                $location.url("book/" + title + "&" + author);
            }
            else {
                $location.url("book/" + title);
            }
        }
    }
})();

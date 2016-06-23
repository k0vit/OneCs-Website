(function() {
    angular
        .module("OneCs")
        .controller("BookCategoryEditController", BookCategoryEditController);

    function BookCategoryEditController($routeParams, $location, $rootScope, UserService, BookCategoryService) {
        var vm = this;
        vm.isCollapsed = true;
        vm.logout = logout;
        vm.updateBookCategory = updateBookCategory;
        vm.deleteBookCategory = deleteBookCategory;
        var id = $routeParams.bkCatId;

        function init() {
            if ($rootScope.currentUser.role != 'ADMIN') {
                $location.url("/book");
            }
            else {
                BookCategoryService
                    .findBookCategoryById(id)
                    .then(
                        function(response) {
                            vm.bookCategory = response.data;
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    );
            }
        }

        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser=null;
                        $location.url("/login");
                    },
                    function (error) {
                        vm.error = error.data;
                        vm.success = false;
                    }
                );
        }

        function updateBookCategory() {
            if (isValid) {
                if (!vm.bookCategory.display) {
                    vm.bookCategory.display = vm.bookCategory.title;
                }
                if (!vm.bookCategory.url) {
                    vm.bookCategory.url = "resources/category/book/book-category/default-book-category.png"
                }
                BookCategoryService
                    .updateBookCategory(vm.bookCategory._id, vm.bookCategory)
                    .then(
                        function (response) {
                            $location.url("/book");
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );
            }
        }

        function deleteBookCategory() {
            BookCategoryService
                .deleteBookCategory(id)
                .then(
                    function (response) {
                        $location.url("/book");
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        function isValid() {
            if (!vm.bookCategory || !vm.bookCategory.title) {
                vm.error = "Please provide book title"
            }
        }
    }
})();
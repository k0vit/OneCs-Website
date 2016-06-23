(function() {
    angular
        .module("OneCs")
        .controller("BookCategoryNewController", BookCategoryNewController);

    function BookCategoryNewController($location, $rootScope, UserService, BookCategoryService) {
        var vm = this;
        vm.isCollapsed = true;
        vm.logout = logout;
        vm.createBookCategory = createBookCategory;

        function init() {
            if ($rootScope.currentUser.role != 'ADMIN') {
                $location.url("/book");
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

        function createBookCategory() {
            if (isValid) {
                if (!vm.bookCategory.display) {
                    vm.bookCategory.display = vm.bookCategory.title;
                }
                if (!vm.bookCategory.url) {
                    vm.bookCategory.url = "resources/category/book/book-category/default-book-category.png"
                }
                BookCategoryService
                    .createBookCategory(vm.bookCategory)
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

        function isValid() {
            if (!vm.bookCategory || !vm.bookCategory.title) {
                vm.error = "Please provide book title"
            }
        }
    }
})();
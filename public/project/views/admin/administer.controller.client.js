(function() {
    angular
        .module("OneCs")
        .controller("AdministerController", AdministerController);

    function AdministerController($location, $rootScope, UserService, BookCategoryService) {
        var vm = this;
        vm.logout = logout;
        vm.createBookCategory = createBookCategory;
        vm.navigateToEditBookCat = navigateToEditBookCat;
        vm.register = register;
        vm.setSelectedMenu = setSelectedMenu;

        function init() {
            vm.isCollapsed = true;
            vm.selectedMenu = "addBookCat";

            if ($rootScope.currentUser.role != 'ADMIN') {
                $location.url("/book");
            }
        }

        init();

        function setSelectedMenu(menu) {
            vm.error = false;
            vm.success = false;
            vm.selectedMenu = menu;
            if (menu==="listBookCat") {
                listBookCat();
            }
        }

        function register() {
            vm.error = false;
            vm.success = false;
            if (validateNewUser()) {
                UserService
                    .createUser(vm.newuser)
                    .then(
                        function (response) {
                            vm.success="User created successfully";
                            $location.url("/administer");
                            resetForm();
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );
            }
        }

        function resetForm() {
            vm.newuser.username="";
            vm.newuser.password="";
            vm.verifyPassword="";
            vm.newuser.role="default";
        }

        function validateNewUser() {
            if (!vm.newuser || !vm.newuser.username || !vm.newuser.password || !vm.newuser.role ||
                vm.newuser.role === "default") {
                vm.error = "All the fields are mandatory for creating new user";
                return false;
            }
            else if (vm.newuser.password!==vm.verifyPassword) {
                vm.error = "Password does not match";
                return false;
            }
            return true;
        }

        function navigateToEditBookCat(id) {
            $rootScope.previousPath="/administer";
            $location.url("/book-category/" + id);
        }

        function listBookCat() {
            BookCategoryService
                .findAllBookCategory()
                .then(
                    function (response) {
                        vm.bookCategories = response.data;
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

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
            vm.error = false;
            vm.success = false;
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
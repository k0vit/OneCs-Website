(function() {
    angular
        .module("OneCs")
        .controller("AdministerController", AdministerController);

    function AdministerController($location, $rootScope, UserService, BookCategoryService, BookReviewService) {
        var vm = this;
        vm.logout = logout;
        vm.createBookCategory = createBookCategory;
        vm.navigateToEditBookCat = navigateToEditBookCat;
        vm.register = register;
        vm.setSelectedMenu = setSelectedMenu;
        vm.unregisterUser = unregisterUser;
        vm.fetchReviews = fetchReviews;
        vm.deleteReview = deleteReview;

        function init() {
            vm.isCollapsed = true;
            vm.selectedMenu = "addBookCat";

            if ($rootScope.currentUser.role != 'ADMIN') {
                $location.url("/book");
            }
            else {
                vm.user = $rootScope.currentUser;
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

            if (menu==="listUser") {
                listAllUser();
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

        function listAllUser() {
            UserService
                .findAllUser()
                .then(
                    function(response) {
                        vm.users = response.data;
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        function unregisterUser(id) {
            UserService
                .deleteUser(id)
                .then(
                    function (response) {
                        vm.success="User Deleted Successfully";
                        listAllUser();
                    },
                    function (error) {
                        vm.error = error.data;
                        vm.success = false;
                    }
                );
        }

        function fetchReviews() {
            vm.error = false;
            vm.success = false;

            if (validReviewListReq()) {
                if (vm.listreviews.searchOption==='User') {
                    BookReviewService
                        .findBookReviewByUsername(vm.listreviews.searchTerm)
                        .then(
                            function (response) {
                                vm.reviews = response.data;
                            },
                            function (error) {
                                vm.error = error.data;
                            }
                        );
                }
                else if (vm.listreviews.searchOption==='BookCat') {
                    BookReviewService
                        .findBookReviewByBookCat(vm.listreviews.searchTerm)
                        .then(
                            function (response) {
                                vm.reviews = response.data;
                            },
                            function (error) {
                                vm.error = error.data;
                            }
                        );
                }
                else {
                    BookReviewService
                        .findBookReviewByBookTitle(vm.listreviews.searchTerm)
                        .then(
                            function (response) {
                                vm.reviews = response.data;
                            },
                            function (error) {
                                vm.error = error.data;
                            }
                        );
                }
            }
        }

        function validReviewListReq() {
            if (!vm.listreviews || !vm.listreviews.searchOption || !vm.listreviews.searchTerm ||
                vm.listreviews.searchOption === "default") {
                vm.error = "All the fields are mandatory to search reviews";
                return false;
            }
            return true;
        }

        function deleteReview(reviewId) {
            vm.error = false;
            vm.success = false;

            BookReviewService
                .deleteBookReview(reviewId)
                .then(
                    function(response) {
                        fetchReviews();
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }
    }
})();
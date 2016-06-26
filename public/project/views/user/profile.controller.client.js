(function() {
    angular
        .module("OneCs")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location, $rootScope, BookReviewService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
        vm.logout = logout;
        vm.navigateToBookDetailPage = navigateToBookDetailPage;
        var otherUserId = $routeParams.otherUserId;
        var currentUserId;

        function init() {
            vm.isCollapsed = true;

            if (otherUserId &&
                (!$rootScope.currentUser || otherUserId!=$rootScope.currentUser._id)) {
                getUserDetails(otherUserId);
                vm.isOtherUser = true;
                fetchUserReviews(otherUserId);
            }
            else {
                currentUserId = $rootScope.currentUser._id;
                getUserDetails(currentUserId);
                fetchUserReviews(currentUserId);
            }
        }
        init();

        function navigateToBookDetailPage(bookCat, bookId) {
            $rootScope.previousPath = "/profile";
            $location.url("/book/" + bookCat + "/" + bookId);
        }

        function updateUser() {
            if (validate()) {
                UserService
                    .updateUser(currentUserId, vm.user)
                    .then(
                        function (response) {
                            vm.success = "User successfully updated";
                            vm.error = false;
                        },
                        function (error) {
                            vm.error = error.data;
                            vm.success = false;
                        }
                    );
            }
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
                        vm.error = erro.data;
                        vm.success = false;
                    }
                );
        }

        function unregisterUser() {
            UserService
                .unregister(currentUserId)
                .then(
                    function (response) {
                        vm.user=null;
                        $rootScope.currentUser=null;
                        $location.url("/home");
                    },
                    function (error) {
                        vm.error = error.data;
                        vm.success = false;
                    }
                );
        }

        function validate() {
            console.log(vm.user);
            if (!vm.user || !vm.user.username || !vm.user.email
                || !vm.user.firstName || !vm.user.lastName || !vm.user.role || vm.user.role === "default") {
                vm.error = "Please fill all the fields. All the fields are mandatory";
                return false;
            }
            return true;
        }

        function getUserDetails(id) {
            UserService
                .findUserById(id)
                .then(
                    function(response) {
                        vm.user = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }

        function fetchUserReviews(id) {
            BookReviewService
                .findBookReviewByUserId(id)
                .then(
                    function(response) {
                        vm.reviews = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }
    }
})();
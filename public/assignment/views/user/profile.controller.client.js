(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
        var id = $routeParams["id"];

        function init() {
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
        init();

        function updateUser() {
            if (validate()) {
                UserService
                    .updateUser(id, vm.user)
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

        function unregisterUser() {
            UserService
                .deleteUser(id)
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function (error) {
                        vm.error = error.data;
                        vm.success = false;
                    }
                );
        }

        function validate() {
            if (!vm.user.email) {
                vm.error = "Please provide valid email id";
                vm.success = false;
                return;
            }
            else if (!vm.user.lastName) {
                vm.error = "Please provide last name";
                vm.success = false;
                return;
            }
            else if (!vm.user.firstName) {
                vm.error = "Please provide first name";
                vm.success = false;
                return;
            }
            return true;
        }
    }
})();
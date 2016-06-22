(function() {
    angular
        .module("OneCs")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location, $rootScope) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
        vm.logout = logout;
        vm.isCollapsed = true;
        var id = $rootScope.currentUser._id;

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
                .deleteUser(id)
                .then(
                    function (response) {
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
    }
})();
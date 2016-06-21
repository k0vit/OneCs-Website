(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, $rootScope) {
        var vm = this;
        vm.register = register;

        function register() {
            if (validate()) {
                UserService
                    .register(vm.user.username, vm.user.password)
                    .then(
                        function (response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/profile");
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );
            }
        }

        function validate() {
            if (!vm.user) {
                vm.error = "Please provide username and password";
                return false;
            }
            else if (!vm.user.username) {
                vm.error = "Please provide username";
                return false;
            }
            else if (!vm.user.password) {
                vm.error = "Please provide password";
                return false;
            }
            else if (vm.verifyPassword !== vm.user.password) {
                vm.error = "Password does not match";
                return false;
            }

            return true;
        }
    }
})();
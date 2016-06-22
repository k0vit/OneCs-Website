(function(){
    angular
        .module("OneCs")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService) {
        var vm = this;
        vm.isCollapsed = true;
        vm.register = register;

        function register() {
            if (validate()) {
                UserService
                    .register(vm.user)
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
            if (!vm.user || !vm.user.username || !vm.user.password || !vm.user.email
                || !vm.user.firstName || !vm.user.lastName || !vm.user.role || vm.user.role === "default") {
                vm.error = "All the fields are mandatory";
                return false;
            }
            return true;
        }
    }
})();
(function(){
    angular
        .module("OneCs")
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, UserService) {
        var vm = this;
        vm.isCollapsed = true;
        vm.login = login;

        function login() {
            if (!vm.user || !vm.user.username || !vm.user.password) {
                vm.error = "Please provide username and password";
            }
            else {
                UserService
                    .login(vm.user)
                    .then(
                        function (response) {
                            var user = response.data;
                            if (user) {
                                $rootScope.currentUser = user;
                                $location.url("/profile");
                            }
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );
            }
        }
    }
})();
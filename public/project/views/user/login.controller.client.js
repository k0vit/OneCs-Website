(function(){
    angular
        .module("OneCs")
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, UserService) {
        var vm = this;
        vm.login = login;
        vm.isCollapsed = true;

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
                                if (user.role==='ADMIN') {
                                    $location.url("/administer");
                                }
                                else if ($rootScope.previousPath) {
                                    $location.url($rootScope.previousPath);
                                }
                                else {
                                    $location.url("/profile");
                                }
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
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login() {
            if (!vm.user.username || !vm.user.password) {
                vm.error = "Please provide username and password";
            }
            else {
                UserService
                    .login(vm.user)
                    .then(
                        function (response) {
                            var user = response.data;
                            if (user) {
                                var id = user._id;
                                $location.url("/user/" + id);
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
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        function login (username, password) {
            var user = UserService.findUserByCredential(username, password);
            if(user) {
                var id = user._id;
                vm.error = false;
                $location.url("/user/" + id);
            } else {
                vm.error = "Invalid username and password";
            }
        }
    }
})();
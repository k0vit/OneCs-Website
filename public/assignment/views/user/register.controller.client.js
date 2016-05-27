(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser() {
            if (vm.verifyPassword !== vm.user.password) {
                vm.error = "Password does not match";
            }
            
            var user = UserService.createUser(vm.user);

            if(user) {
                $location.url("/user/" + user._id);
            } else {
                vm.error = "Username should be unique";
            }
        }
    }
})();
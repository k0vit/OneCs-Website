(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser() {
            var result = validate();
            if (result) {
                var user = UserService.createUser(vm.user);
                if (user) {
                    $location.url("/user/" + user._id);
                } else {
                    vm.error = "Username should be unique";
                }
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
            else if (UserService.findUserByUsername(vm.user.username)) {
                vm.error = "Username already exists";
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
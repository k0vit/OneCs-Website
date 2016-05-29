(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        var id = $routeParams["id"];
        var index = -1;

        function init() {
            vm.user = angular.copy(UserService.findUserById(id));
            console.log(vm.user);
        }

        init();

        function updateUser() {
            var isValid = validate();
            if (isValid) {
                var result = UserService.updateUser(vm.user._id, vm.user);

                if (result === true) {
                    vm.success = "User successfully updated";
                    vm.error = false;
                } else {
                    vm.error = "Failed while retrieving data for this user";
                    vm.success = false;
                }
            }
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
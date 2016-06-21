(function() {
    angular
        .module("OneCs")
        .controller("BookCategoryNewController", BookCategoryNewController);

    function BookCategoryNewController($location, $rootScope) {
        var vm = this;
        vm.isCollapsed = true;
    }
})();

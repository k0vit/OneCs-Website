(function() {
    angular
        .module("OneCs")
        .controller("BookCategoryEditController", BookCategoryEditController);

    function BookCategoryEditController($location, $rootScope) {
        var vm = this;
        vm.isCollapsed = true;
    }
})();

(function(){
    angular
        .module("OneCs")
        .controller("HomeController", HomeController);

    function HomeController() {
        var vm = this;
        vm.isCollapsed = true;

        vm.currentImg = "resources/2016_news_computerscience-883x432.jpg";
    }
})();

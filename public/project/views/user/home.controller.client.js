(function(){
    angular
        .module("OneCs")
        .controller("HomeController", HomeController);

    function HomeController($interval) {
        var vm = this;
        var slideCount = 2;
        var slides = [
            'resources/home-slide/code.jpg',
            'resources/home-slide/laptop.jpg',
            'resources/home-slide/cs-topics.png'
        ];

        function init() {
            vm.isCollapsed = true;
            vm.slide = slides[0];
            $interval(changeSlide, 10000);
        }

        init();

        function changeSlide() {
            vm.slide = slides[(slideCount%3)];
            slideCount++;
        }
    }
})();

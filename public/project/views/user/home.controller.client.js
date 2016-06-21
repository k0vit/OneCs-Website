(function(){
    angular
        .module("OneCs")
        .controller("HomeController", HomeController);

    function HomeController($interval) {
        var vm = this;
        var slideCount = 2;
        var slides = [
            'resources/home-slide/cs-topics3.png',
            'resources/home-slide/cs-topics2.png',
            'resources/home-slide/cs-topics.png',
            'resources/home-slide/languages.png',
            'resources/home-slide/laptop.jpg'
        ];

        function init() {
            vm.isCollapsed = true;
            vm.slide = slides[0];
            $interval(changeSlide, 10000);
        }

        init();

        function changeSlide() {
            vm.slide = slides[(slideCount%(slides.length))];
            slideCount++;
        }
    }
})();

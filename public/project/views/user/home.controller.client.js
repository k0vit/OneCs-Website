(function(){
    angular
        .module("OneCs")
        .controller("HomeController", HomeController);

    function HomeController($interval) {
        var vm = this;
        var slideCount = 2;
        var slides = [
            'resources/2016_news_computerscience-883x432.jpg',
            'resources/computer-science.jpg',
            'resources/most_popular_twitter_topics.png'
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

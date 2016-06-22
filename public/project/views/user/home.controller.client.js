(function(){
    angular
        .module("OneCs")
        .controller("HomeController", HomeController);

    function HomeController($interval, $rootScope, UserService) {
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
            vm.isUserLoggedIn = false;

            console.log($rootScope.currentUser);

            if (!$rootScope.currentUser) {
                UserService
                    .loggedIn()
                    .then(
                        function (user) {
                            if (user.data != '0') {
                                $rootScope.currentUser = user.data;
                                vm.user = user.data;
                                vm.isUserLoggedIn = true;
                                console.log(user.data);
                            }
                        }
                    );
            }
            else {
                vm.user = $rootScope.currentUser;
                vm.isUserLoggedIn = true;
                console.log(vm.user);
            }
        }

        init();

        function changeSlide() {
            vm.slide = slides[(slideCount%(slides.length))];
            slideCount++;
        }
    }
})();

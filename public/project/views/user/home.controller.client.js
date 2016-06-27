(function(){
    angular
        .module("OneCs")
        .controller("HomeController", HomeController);

    function HomeController($interval, $rootScope, UserService, $location) {
        var vm = this;
        vm.logout = logout;
        vm.search = search;
        var slideCount = 2;
        var slides = [
            'resources/home-slide/cs-topics3.png',
            'resources/home-slide/languages.png',
            'resources/home-slide/laptop.jpg'
        ];

        function init() {
            vm.funcInfo="Currently user can only search and check the details of the book." +
                "Research Paper, jobs, courses and IDE will be implemented in future.";
            vm.showFuncInfo = true;
            vm.isCollapsed = true;
            vm.slide = slides[0];
            $interval(changeSlide, 10000);
            vm.isUserLoggedIn = false;

            if (!$rootScope.currentUser) {
                UserService
                    .loggedIn()
                    .then(
                        function (user) {
                            if (user.data != '0') {
                                $rootScope.currentUser = user.data;
                                vm.user = user.data;
                                vm.isUserLoggedIn = true;
                            }
                        }
                    );
            }
            else {
                vm.user = $rootScope.currentUser;
                vm.isUserLoggedIn = true;
            }
        }

        init();

        function changeSlide() {
            vm.slide = slides[(slideCount%(slides.length))];
            slideCount++;
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser=null;
                        vm.user=null;
                        vm.isUserLoggedIn=false;
                        $location.url("/home");
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        function search() {
            if (validateSearchForm()) {
                if (vm.searchForm.category==='Book') {
                    $location.url("/book/" +  vm.searchForm.searchTerm);
                }
            }
        }

        function validateSearchForm() {
            if (!vm.searchForm || !vm.searchForm.category || vm.searchForm.category==='default'
                || !vm.searchForm.searchTerm ) {
                vm.searchForm.error = "Please select search category and enter search term";
                return false;
            }
            else if (vm.searchForm.category!='Book') {
                vm.searchForm.error = "Currently only Book functionality has been implemented";
                return false;
            }

            return true;
        }
    }
})();
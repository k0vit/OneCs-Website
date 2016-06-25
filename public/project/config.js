(function(){
    angular
        .module("OneCs")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/user/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "views/user/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/profile/:otherUserId", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
            })
            .when("/book", {
                templateUrl: "views/book/book-search.view.client.html",
                controller: "BookSearchController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/book/:bkCat", {
                templateUrl: "views/book/book-search-result.view.client.html",
                controller: "BookSearchResultController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/book/:bkCat/:bkId", {
                templateUrl: "views/book/book-detail.view.client.html",
                controller: "BookDetailController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/book-category/new", {
                templateUrl: "views/book/book-category-new.view.client.html",
                controller: "BookCategoryNewController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/book-category/:bkCatId", {
                templateUrl: "views/book/book-category-edit.view.client.html",
                controller: "BookCategoryEditController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .otherwise({
                templateUrl: "views/user/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            });

        function checkLoggedIn(UserService, $location, $q, $rootScope, $route) {
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function(response) {
                        var user = response.data;
                        if(user == '0') {
                            $rootScope.currentUser = null;
                            if ($route.current.$$route.originalPath === '/profile') {
                                deferred.reject();
                                $location.url("/login");
                            }
                            else {
                                deferred.resolve();
                            }
                        } else {
                            deferred.resolve();
                            $rootScope.currentUser = user;
                        }
                    },
                    function(err) {
                        $location.url("/home");
                    }
                );
            return deferred.promise;
        }
    }
})();
(function() {
    angular
        .module("OneCs")
        .controller("BookDetailController", BookDetailController);

    function BookDetailController($sce, $routeParams, $location, $rootScope, UserService, BookSearchService) {
        var vm = this;
        vm.logout = logout;
        vm.login = login;
        vm.addProdToUserLikesLst = addProdToUserLikesLst;
        vm.displayBookPreview = displayBookPreview;
        vm.getSafeHtml = getSafeHtml;
        vm.removeProdToUserLikesLst = removeProdToUserLikesLst;
        vm.back = back;
        vm.isCollapsed = true;
        vm.bkCat = $routeParams.bkCat;
        vm.bkId = $routeParams.bkId;
        vm.showBookPreview = false;

        function init() {
            checkIfUserLoggedIn();
            getBookDetails();
            if (vm.user) {
                hasUserLikedThisProd();
            }
        }
        init();

        function back() {
            if ($rootScope.previousPath) {
                $location.url($rootScope.previousPath);
            }
            else {
                $location.url("/book/" + vm.bkCat);
            }
        }

        function hasUserLikedThisProd() {
            for (i = 0; i < vm.user.bookLikes.length; i++) {
                if (vm.user.bookLikes[i].bookId === vm.bkId) {
                    vm.hasUserLikedThisBook= true;
                    break;
                }
            }
        }

        function login() {
            $rootScope.previousPath = "/book/" + vm.bkCat + "/" + vm.bkId;
            $location.url("/login");
        }

        function displayBookPreview(isbn) {
            vm.showBookPreview=true;
            window.initialize(isbn);
        }

        function getSafeHtml(htmlText) {
            return $sce.trustAsHtml(htmlText);
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

        function getBookDetails() {
            BookSearchService
                .getBookDetails(vm.bkId)
                .then(
                    function(response) {
                        vm.book = response.data;
                    },
                    function(error) {
                        vm.error = error;
                    }
                );
        }

        function checkIfUserLoggedIn() {
            vm.isUserLoggedIn = false;

            if ($rootScope.currentUser) {
                vm.isUserLoggedIn = true;
                vm.user=$rootScope.currentUser;
            }
        }

        function addProdToUserLikesLst() {
            var bookDetails = {};
            bookDetails.bookId = vm.book.id;
            bookDetails.bookTitle = vm.book.volumeInfo.title;
            bookDetails.bookAuthors = vm.book.volumeInfo.authors;
            bookDetails.bookCategory = vm.bkCat;
            bookDetails.bookImageUrl = vm.book.volumeInfo.imageLinks.smallThumbnail;
            vm.user.bookLikes.push(bookDetails);
            UserService
                .updateUser(vm.user._id, vm.user)
                .then(
                    function(response) {
                        vm.hasUserLikedThisBook = true;
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        function removeProdToUserLikesLst() {
            for(var i = vm.user.bookLikes.length - 1; i >= 0; i--) {
                if(vm.user.bookLikes[i].bookId === vm.bkId) {
                    vm.user.bookLikes.splice(i, 1);
                    break;
                }
            }

            UserService
                .updateUser(vm.user._id, vm.user)
                .then(
                    function(response) {
                        vm.hasUserLikedThisBook = false;
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }
    }
})();

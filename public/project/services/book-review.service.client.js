(function () {
    angular
        .module("OneCs")
        .factory("BookReviewService", BookReviewService);

    function BookReviewService($http) {

        var baseUrl = "/api/bookreview/";

        var api = {
            createBookReview: createBookReview,
            findBookReviewById: findBookReviewById,
            updateBookReview: updateBookReview,
            deleteBookReview: deleteBookReview,
            findBookReviewByBookId: findBookReviewByBookId,
            findBookReviewByUserId: findBookReviewByUserId
        };

        return api;

        function createBookReview(newBookReview) {
            return $http.post("/api/bookreview/" ,newBookReview);
        }

        function updateBookReview(id, newBookReview) {
            return $http.put(getUrlWithId(id), newBookReview);
        }

        function deleteBookReview(id) {
            return $http.delete(getUrlWithId(id));
        }

        function findBookReviewById(id) {
            return $http.get(getUrlWithId(id));
        }

        function findBookReviewByBookId(bkId) {
            return $http.get(baseUrl + "books/" + bkId);
        }

        function findBookReviewByUserId(userId) {
            return $http.get(baseUrl + "user/" + userId);
        }

        function getUrlWithId(id) {
            return baseUrl + id;
        }
    }
})();
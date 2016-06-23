(function () {
    angular
        .module("OneCs")
        .factory("BookCategoryService", BookCategoryService);

    function BookCategoryService($http) {

        var api = {
            createBookCategory: createBookCategory,
            findBookCategoryById: findBookCategoryById,
            updateBookCategory: updateBookCategory,
            deleteBookCategory: deleteBookCategory,
            findAllBookCategory: findAllBookCategory
        };

        return api;

        function createBookCategory(newBookCategory) {
            return $http.post("/api/bookcategory/" ,newBookCategory);
        }

        function updateBookCategory(id, newBookCategory) {
            return $http.put(getUrlWithId(id), newBookCategory);
        }

        function deleteBookCategory(id) {
            return $http.delete(getUrlWithId(id));
        }

        function findBookCategoryById(id) {
            return $http.get(getUrlWithId(id));
        }

        function findAllBookCategory() {
            return $http.get("/api/bookcategory");
        }

        function getUrlWithId(id) {
            return "/api/bookcategory/" + id;
        }
    }
})();
(function() {
    angular
        .module("OneCs")
        .factory("BookSearchService", BookSearchService);

    function BookSearchService($http) {
        var baseUrl = "https://www.googleapis.com/books/v1/volumes";
        var searchByTitle = baseUrl + "?q=TITLE+subject:COMPUTERS";
        var searchByTitleNAuthor = baseUrl + "?q=TITLE+inauthor:AUTHOR+subject:COMPUTERS";
        var bookDetailsUrl = baseUrl + "/BOOKID";

        var api = {
            searchBooks: searchBooks,
            getBookDetails: getBookDetails
        };
        return api;

        function getBookDetails(id) {
            var url = bookDetailsUrl.replace("BOOKID", id);
            return $http.get(url);
        }

        function searchBooks(title, author) {
            var url;
            if (author) {
                url = searchByTitleNAuthor.replace("TITLE", title).replace("AUTHOR", author);
            }
            else {
                url = searchByTitle.replace("TITLE", title);
            }
            return $http.get(url);
        }
    }
})();
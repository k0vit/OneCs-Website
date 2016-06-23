(function() {
    angular
        .module("OneCs")
        .factory("BookSearchService", BookSearchService);

    function BookSearchService($http) {
        var searchByTitle = "https://www.googleapis.com/books/v1/volumes?q=TITLE+subject:COMPUTERS";
        var searchByTitleNAuthor = "https://www.googleapis.com/books/v1/volumes?q=TITLE+inauthor:AUTHOR+subject:COMPUTERS";

        var api = {
            searchBooks: searchBooks
        };
        return api;

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
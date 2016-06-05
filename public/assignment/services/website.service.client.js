(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    function WebsiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            deleteWebsite: deleteWebsite,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite
        };
        return api;

        function deleteWebsite(websiteId) {
            return $http.delete(getUrlWithWebsiteId(websiteId));
        }

        function createWebsite(userId, website) {
            var newWebsite = {
                name: website.name,
                description: website.description,
            };
            return $http.post(getUrlWithUserId(userId), newWebsite);
        }

        function findWebsitesByUser(userId) {
            return $http.get(getUrlWithUserId(userId));
        }

        function findWebsiteById(websiteId) {
            return $http.get(getUrlWithWebsiteId(websiteId));
        }

        function updateWebsite(websiteId, newWebsite) {
            return $http.put(getUrlWithWebsiteId(websiteId), newWebsite);
        }

        function getUrlWithUserId(userId) {
            return "/api/user/" + userId + "/website";
        }

        function getUrlWithWebsiteId(websiteId) {
            return "/api/website/" + websiteId;
        }
    }
})();
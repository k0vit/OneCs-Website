(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            deletePage: deletePage,
            findPageById: findPageById,
            updatePage: updatePage,
        };
        return api;

        function deletePage(pageId) {
            return $http.delete(getUrlWithPageId(pageId));
        }

        function createPage(websiteId, page) {
            var newPage = {
                name: page.name,
                title: page.title,
            };

            return $http.post(getUrlWithWebsiteId(websiteId), newPage);
        }

        function findPageByWebsiteId(websiteId) {
            return $http.get(getUrlWithWebsiteId(websiteId));
        }

        function findPageById(pageId) {
            return $http.get(getUrlWithPageId(pageId));
        }

        function updatePage(pageID, newPage) {
            return $http.put(getUrlWithPageId(pageID), newPage);
        }

        function getUrlWithWebsiteId(websiteId) {
            return "/api/website/" + websiteId + "/page";
        }

        function getUrlWithPageId(pageId) {
            return "/api/page/" + pageId;
        }
    }
})();
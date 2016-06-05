/**
 * Created by kovit on 5/28/2016.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, FlickrService, $location, WidgetService) {
        var vm = this;
        vm.pageId = $routeParams.pid;
        vm.userId = $routeParams.id;
        vm.websiteId = $routeParams.wid;
        vm.widgetId = $routeParams.wgid;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function init() {
            if (vm.widgetId) {
                WidgetService
                    .findWidgetsById(vm.widgetId)
                    .then(
                        function (response) {
                            vm.widget = response.data;
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );
            }
        }

        init();

        function searchPhotos(searchTerm) {
            if (!searchTerm) {
                vm.error = "Please provide search text"
                return;
            }

            vm.error = false;
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            if (vm.widgetId) {
                vm.widget.url = url;
                WidgetService
                    .updateWidget(vm.widgetId, vm.widget)
                    .then(navigate, displayErrorMsg);
            }
            else {
                var newWidget = {};
                newWidget.url = url;
                newWidget.width= "100%";
                newWidget.widgetType="IMAGE";
                WidgetService
                    .createWidget(vm.pageId, newWidget)
                    .then(navigate, displayErrorMsg);
            }
        }

        function navigate() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function displayErrorMsg(error) {
            vm.error = error.data;
        }
    }
})();
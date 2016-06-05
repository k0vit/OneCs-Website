(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var userBaseUrl = "/api/user/";

        var api = {
            createUser: createUser,
            findUserByCredential: findUserByCredential,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserByUsername: findUserByUsername
        };

        return api;

        function updateUser(id, newUser) {
            return $http.put(getUrlWithId(id), newUser);
        }

        function createUser(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post(userBaseUrl, user);
        }

        function deleteUser(id) {
            return $http.delete(getUrlWithId(id));
        }

        function findUserByCredential(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function findUserById(id) {
            return $http.get(getUrlWithId(id));
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function getUrlWithId(id) {
            return "/api/user/" + id;
        }
    }
})();
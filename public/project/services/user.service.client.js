(function () {
    angular
        .module("OneCs")
        .factory("UserService", UserService);

    function UserService($http) {

        var userBaseUrl = "/api/user/";

        var api = {
            createUser: createUser,
            register: register,
            findUserByCredential: findUserByCredential,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserByUsername: findUserByUsername,
            login: login,
            logout: logout,
            loggedIn: loggedIn
        };

        return api;
        
        function loggedIn() {
            return $http.get("/api/loggedin");
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function updateUser(id, newUser) {
            return $http.put(getUrlWithId(id), newUser);
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function createUser(newUser) {
            return $http.post("/api/user", newUser);
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
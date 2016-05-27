(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

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
            for(var i in users) {
                if(users[i]._id === id) {
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    users[i].email = newUser.email;
                    console.log(users);
                    return true;
                }
            }
            console.log(users);
            console.log(false);
            return false;
        }

        function createUser(user) {
            if (findUserByUsername(user.username)) {
                console.log("username not unique");
                return false;
            } 
            user._id = new Date().getTime() + "";
            users.push(user);
            console.log(users);
            return user;
        }

        function deleteUser(id) {
            for(var i in users) {
                if(users[i]._id === id) {
                    users.splice(i, i);
                    console.log(users);
                    break;
                }
            }
            console.log(false);
            console.log(users);
        }

        function findUserByCredential(username, password) {
            for(var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }
            return false;
        }

        function findUserById(id) {
            for(var i in users) {
                if(users[i]._id === id) {
                    console.log("user by id found")
                    return users[i];
                }
            }
            return false;
        }

        function findUserByUsername(username) {
            for(var i in users) {
                if(users[i].username === username) {
                    return users[i];
                }
            }
            return false;
        }
    }
})();
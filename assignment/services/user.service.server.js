module.exports = function(app, models) {

    var userModel = models.userModel;

    app.post("/api/user", createUser);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/user/", findUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res) {
        var newUser = req.body;

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.status(403).send("Requested username " + newUser.username + " is already taken");
                    }
                    else {
                        createNewUser(newUser, res);
                    }
                },
                function(error) {
                    res.status(500).send("Failed to create user. Internal Server error");
                }
            );
    }

    function createNewUser(newUser, res) {
        userModel
            .createUser(newUser)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(500).send("Failed to create user. Internal Server error");
                }
            );
    }

    function deleteUser(req, res) {
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.status(500).send("Unable to remove user with Id: " + id);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;

        userModel
            .updateUser(id, newUser)
            .then(
                function(user) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send("Unable to update user with ID: " + id);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(400).send("User with ID: "+ userId +" not found");
                }
            );
    }

    function findUser(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            findUserByCredentials(username, password, res);
        } else if(username) {
            findUserByUsername(username, res);
        } else {
            res.sendStatus(400);
        }
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (!user) {
                        res.status(403).send("Invalid username or password");
                    }
                    res.json(user);
                },
                function (error) {
                    res.status(400).send("User with username: "+ username +" not found");
                }
            );
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (!user) {
                        res.status(403).send("User with username: "+ username +" not found");
                    }
                    res.json(user);
                },
                function(error) {
                    res.status(403).send("User with username: "+ username +" not found");
                }
            );
    }
};
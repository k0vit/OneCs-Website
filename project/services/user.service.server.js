module.exports = function(app, models) {

    var userModel = models.userModel;
    var bookReviewModel = models.bookReviewModel;

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var bcrypt = require("bcrypt-nodejs");
    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    app.post("/api/user", createUser);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/user/", findAllUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.get("/api/user/followers/:userId", findFollowers);
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.delete('/api/unregister/:userId', unregister);
    app.get('/api/loggedin', loggedin);
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/#/profile',
            failureRedirect: '/project/#/login'
        }));

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel
                            .createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    if (user) {
                        done(null, user);
                    }
                    else {
                        done(null, false);
                    }
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        return createUser(req, res, "UserMode");
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function createUser(req, res, mode) {
        var newUser = req.body;
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.status(403).send("Requested username " + newUser.username + " is already taken");
                    }
                    else {
                        createNewUser(req, res, mode, newUser);
                    }
                },
                function(error) {
                    res.status(500).send("Failed to create user. Internal Server error");
                }
            );
    }

    function createNewUser(req, res, mode, newUser) {
        newUser.password = bcrypt.hashSync(newUser.password);
        userModel
            .createUser(newUser)
            .then(
                function (user) {
                    if (mode==="UserMode") {
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                    else {
                        res.json(user);
                    }
                },
                function (error) {
                    res.status(500).send("Failed to create user. Internal Server error");
                }
            );
    }

    function unregister(req, res) {
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function (stats) {
                    return bookReviewModel.deleteBookReviewByUser(id);
                },
                function (error) {
                    res.status(500).send("Unable to remove user with Id: " + id);
                }
            )
            .then(
                function (stats) {
                    return res.send(200);
                },
                function (error) {
                    res.status(500).send("User removed successfully but failed to remove all the reviews " +
                        "associated with the user");
                }
            );

        req.logOut();
    }

    function deleteUser(req, res) {
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function (stats) {
                    return bookReviewModel.deleteBookReviewByUser(id);
                },
                function (error) {
                    res.status(500).send("Unable to remove user with Id: " + id);
                }
            )
            .then(
                function (stats) {
                    return res.send(200);
                },
                function (error) {
                    res.status(500).send("User removed successfully but failed to remove all the reviews " +
                        "associated with the user");
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

    function findAllUser(req, res) {
        userModel
            .findAllUser()
            .then(
                function (userx) {
                    res.json(userx);
                },
                function (error) {
                    res.status(500).send("Failed to find all the users");
                }
            );
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

    function findFollowers(req, res) {
        var userId = req.params.userId;
        userModel
            .findFollowers(userId)
            .then(
                function (users) {
                    res.json(users);
                },
                function (error) {
                    res.status(400).send("Failed to find followers");
                }
            );
    }
};
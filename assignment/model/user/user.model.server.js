module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")(mongoose);
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        user.dateCreated = new Date();
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function updateUser(id, newUser) {
        return User.update(
            {_id: id},
            {$set : newUser}
        );
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};
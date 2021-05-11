const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User Schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        index: true,
    },
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [({ length }) => length >= 6, "Password should be longer."],
    },
    email: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    },
    userCreated: {
        type: Date,
        default: Date.now,
    },
});

const User = (module.exports = mongoose.model("User", userSchema));

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserByEmail = function (email, callback) {
    var query = { email: email };
    User.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
};

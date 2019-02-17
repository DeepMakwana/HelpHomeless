const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const userSchema = mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    gender: String,
    email: {
        type: String,
        required: true
    },
    mobileNo: String,
    username: {
        type: String,
        required: true
    },
    age: String,
    password: {
        type: String,
        required: true
    },
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    isVolunteer: {
        type: Boolean,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err
        callback(null, isMatch);
    });
}

module.exports.checkUsername = async function(Username){
    const user = await User.findOne({username:Username});
    if(user) {return true;}
    else {return false;}
}

module.exports.checkEmail = async function(Email){
    const user = await User.findOne({email:Email});
    if(user) {return true;}
    else {return false;}
}

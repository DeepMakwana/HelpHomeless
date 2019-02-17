const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');
const Maps = require('../models/maps');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        isVolunteer: req.body.isVolunteer,
        isAdmin: req.body.isAdmin
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, msg: "Failed to register user"});
        } else {
            res.json({success: true, msg: "Registration Completed"});
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: "Username Not Found! Please try again."});
        } else {
            User.comparePassword(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    const token = jwt.sign({data: user}, config.secret, {
                        expiresIn: 604800 // 1 week converted to seconds
                    });

                    res.json({
                        success: true,
                        token: `Bearer ${token}`,
                        user: user
                    });
                } else {
                    return res.json({success: false, msg: "Incorrect Password! Please try again."});
                }
            });
        }
    });
});

//Check Exist
router.post("/checkUsername", async (req, res) => {
    try {
        const exists = await User.checkUsername(req.body.username);
        res.json({exists: exists});
    } catch (e) {
      res.status(404).json({ error: e});
    }
});

router.post("/checkEmail", async (req, res) => {
    try {
        const exists = await User.checkEmail(req.body.email);
        res.json({exists: exists});
    } catch (e) {
      res.status(404).json({ error: e});
    }
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

// Edit-Profile
router.post('/editprofile', ( req, res, next ) => {
    // console.log(req.body);
    User.getUserById(req.body.id, (err, user) => {

        user.username     = req.body.username;
        user.first_name   = req.body.first_name;
        user.last_name    = req.body.last_name;
        user.email        = req.body.email;
        user.mobileNo     = req.body.mobileNo;
        user.gender       = req.body.gender;
        user.age          = req.body.age;
        user.address1     = req.body.address1;
        user.address2     = req.body.address2;
        user.city         = req.body.city;
        user.state        = req.body.state;
        user.zipCode      = req.body.zipCode;
        user.country      = req.body.country;

        user.save(function(err) {
            if (err) {
                return res.json({ success: false, msg: 'Failed to Update Your Profile !' });
            } else {
                return res.json({ success: true, msg: 'Profile Update Successfully !', user: user });
            }
        });
    });
});

//map route
router.post('/drawMap', async (req, res) => {
    const locationList = await Maps.getDistance(req.body);
    res.json({ success: true, list: locationList});
});

//for getting cordinates from address
router.post('/getCoordinates', async (req,res) => {
    const coordinates = await Maps.getGeoCoder(req.body.address);
    // console.log("In routes: ");
    // console.log(coordinates);

    res.json({success: true, coordinates: coordinates});
});
module.exports = router;

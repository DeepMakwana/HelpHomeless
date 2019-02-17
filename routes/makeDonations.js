const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Donations = require('../models/makeDonations');

router.post('/makeDonation', (req, res, next) => {
    let newDonation = new Donations({
        date: req.body.date,
        noOfClothes: req.body.noOfClothes,
        userId: req.body.userId,
        address: req.body.address,
        latitude : req.body.latitude,
        longitude : req.body.longitude
    });

    Donations.addDonation(newDonation, (err, user) => {
        if(err) {
            res.json({success: false, msg: "Failed to make Donation"});
        } else {
            res.json({success: true, msg: "Donation Accepted"});
        }
    });
});

router.post('/getAddressList', async (req, res) => {
    let listOfCoordinates = await Donations.getDonationsbyDate(req.body.date);
    res.json({ success: true, listOfCoordinates: listOfCoordinates});
});

module.exports = router;

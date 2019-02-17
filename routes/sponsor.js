const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Coupon = require('../models/coupon');
const Sponsor = require('../models/sponsor');

// Register
router.post('/sponsorRegister', (req, res, next) => {
    console.log(req.body);
    let newSponsor = new Sponsor({
       company_name: req.body.company_name,
       company_email: req.body.company_email,
       password: req.body.password
    });

    Sponsor.addSponsor(newSponsor, (err, sponsor) => {
        if(err) {
            res.json({success: false, msg: "Failed to register Sponsor"});
        } else {
            res.json({success: true, msg: "Registration Completed"});
        }
    });
});

// Authenticate
router.post('/sponsorAuthenticate', (req, res, next) => {
    const companyEmail = req.body.company_email;
    const password = req.body.password;

    Sponsor.getSponsorByCompanyEmail(companyEmail, (err, sponsor) => {
        if(err) throw err;
        if(!sponsor) {
            return res.json({success: false, msg: "Email Id Not Found! Please try again."});
        } else {
            Sponsor.comparePassword(password, sponsor.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    const token = jwt.sign({data: sponsor}, config.secret, {
                        expiresIn: 604800 // 1 week converted to seconds
                    });

                    res.json({
                        success: true,
                        token: `Bearer ${token}`,
                        sponsor: sponsor
                    });
                } else {
                    return res.json({success: false, msg: "Incorrect Password! Please try again."});
                }
            });
        }
    });
});

//Check Exist
router.post("/checkCompanyName", async (req, res) => {
    try {
        const exists = await Sponsor.checkCompanyName(req.body.company_name);
        res.json({exists: exists});
    } catch (e) {
        res.status(404).json({ error: e});
    }
});

router.post("/checkCompanyEmail", async (req, res) => {
    try {
        const exists = await Sponsor.checkCompanyEmail(req.body.company_email);
        res.json({exists: exists});
    } catch (e) {
      res.status(404).json({ error: e});
    }
});

// Profile
router.get('/sponsorProfile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({sponsor: req.sponsor});
});

// Edit-Profile
router.post('/editSponsorProfile', ( req, res, next ) => {
    console.log(req.body);
    Sponsor.getSponsorById(req.body.id, (err, sponsor) => {

        sponsor.company_name    = req.body.company_name;
        sponsor.company_email   = req.body.company_email;

        sponsor.save(function(err) {
            if (err) {
                return res.json({ success: false, msg: 'Failed to Update Your Profile !' });
            } else {
                return res.json({ success: true, msg: 'Profile Update Successfully !', user: user });
            }
        });
    });
});

router.post('/createCoupon', async (req,res)=>{
    const newCoupon ={
       company_name: req.body.company_name,
       company_id: asd,
       discount: req.body.discount,
       coupon_code: req.body.coupon_code,
       validity: req.body.validity  
    }
    await Coupon.addCoupon(newCoupon);
}
);

module.exports = router;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const couponSchema = mongoose.Schema({
    compay_name: {
        type: String,
        required: true
    },
    company_id: {
        type: String,
        required: true
    },
    discount_offer: {
        type: String,
        required: true
    },
    coupon_code: {
        type: String,
        required: true
    },
    validity: {
        type: Date,
        required: true
    }
});

const Coupon = module.exports = mongoose.model('Coupon', couponSchema);

module.exports.getCouponById = function(id, callback) {
    Coupon.findById(id, callback);
}

module.exports.getCouponByCompanyId = function(id, callback) {
    Coupon.find({compay_id: id}, callback);
}

module.exports.addCoupon= function(newCoupon, callback) {
    newCoupon.save(callback);
   }

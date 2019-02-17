const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const sponsorSchema = mongoose.Schema({
    company_name: {
        type: String
    },
    company_email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const Sponsor = module.exports = mongoose.model('Sponsor', sponsorSchema);

module.exports.getSponsorById = function(id, callback) {
    Sponsor.findById(id, callback);
}

module.exports.getSponsorByCompanyName = function(CompanyName, callback) {
    Sponsor.findOne({company_name: CompanyName}, callback);
}

module.exports.getSponsorByCompanyEmail = function(CompanyEmail, callback) {
    Sponsor.findOne({company_email: CompanyEmail}, callback);
}

module.exports.addSponsor = function(newSponsor, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newSponsor.password, salt, (err, hash) => {
            if(err) throw err;
            newSponsor.password = hash;
            newSponsor.save(callback);
        });
    });
}

module.exports.comparePassword = function(sponsorPassword, hash, callback) {
    bcrypt.compare(sponsorPassword, hash, (err, isMatch) => {
        if(err) throw err
        callback(null, isMatch);
    });
}

module.exports.checkCompanyName = async function(companyName){
    const sponsor = await Sponsor.findOne({company_name:companyName});
    if(sponsor) {return true;}
    else {return false;}
}

module.exports.checkCompanyEmail = async function(Email){
    const sponsor = await Sponsor.findOne({company_email:Email});
    if(sponsor) {return true;}
    else {return false;}
}

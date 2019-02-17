const mongoose = require('mongoose');

// const config = require('../config/database');

// Donations form Schema
const donationsSchema = mongoose.Schema({
    date: {
        type: String
    },
    noOfClothes: {
        type: Number
    },
    userId: {
        type: String
    },
    address: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    }
});

const Donations = module.exports = mongoose.model('Donations', donationsSchema);


module.exports.getDonationsbyDate = async function(date) {
    const donations = await Donations.find({date: date});
    // console.log("Donations returned : ", date ,donations);

    let arrayOfCoordinates = [];
    for(let i=0; i< donations.length; i++){
        let singleAddress = {};
        singleAddress["lat"] = donations[i].latitude;
        singleAddress["lng"] = donations[i].longitude;
        arrayOfCoordinates.push(singleAddress);
    }

    // console.log("Array of coordinates : ",arrayOfCoordinates);

    return arrayOfCoordinates;
}

module.exports.addDonation = function(newDonation, callback){
    newDonation.save(callback);
}

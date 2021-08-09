const mongoose = require('mongoose');

const BottleModel = mongoose.model('bottles', {
    bottleQr:{type: String, unique:true},
    bottleTitle:String,
    bottleStatus:String,
    //object inorder to encompass both the ID and Name of Manufacturer
    manufacturer: Object,
    batchQr:String,
    bottleSize: Number,
    sizeUnit:String,
    bottleType:String,
    dateAdded: {type: Date, default: Date.now},
    dateUpdated: {type: Date, default: Date.now},   
})

module.exports = BottleModel


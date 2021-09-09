const mongoose = require('mongoose');
mongoose.pluralize(null);

const BottleHistoryModel = mongoose.model('bottle-history', {
    bottleQr:{type: String, unique:true},
    history:{type: Array, unique:false},
    batchQr:{type: String, unique:false}
})

module.exports = BottleHistoryModel

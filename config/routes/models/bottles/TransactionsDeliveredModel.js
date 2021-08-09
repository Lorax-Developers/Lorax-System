const mongoose = require('mongoose');
mongoose.pluralize(null);

const TransactionsDeliveredModel = mongoose.model('transactions-delivered', {
    bottleQr:{type: String, unique:true},
    userId:{type: String, unique:false},
    batchQr:{type: String, unique:false},
    bottleStatus:{type: String, unique:false},
    dateUpdated: {type: Date, default: Date.now}
})

module.exports = TransactionsDeliveredModel
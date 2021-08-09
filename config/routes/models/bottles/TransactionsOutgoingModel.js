const mongoose = require('mongoose');
mongoose.pluralize(null);

const TransactionsOutgoingModel = mongoose.model('transactions-outgoing', {
    bottleQr:{type: String, unique:true},
    userId:{type: String, unique:false},
    batchQr:{type: String, unique:false},
    bottleStatus:{type: String, unique:false},
    dateUpdated: {type: Date, default: Date.now}
})

module.exports = TransactionsOutgoingModel

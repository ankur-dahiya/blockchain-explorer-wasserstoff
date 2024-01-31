const mongoose = require("mongoose");
const {Schema} = mongoose;

const txn_schema = new Schema({
    hash : {
        type : String,
        required : true,
        unique : true,
        index : true
    },
    from_address : {
        type : String,
        required : true
    },
    to_address : {
        type : String,
        required : true
    },
    value : {
        type : String,
        required : true
    },
    gas_price : {
        type : String,
        required : true
    },
    gas : {
        type : String,
        required : true
    },
    block_timestamp : {
        type : String,
        required : true
    },
    block_number : {
        type : String,
        required : true
    },
});

const txn_Model = mongoose.model("transactions",txn_schema);
module.exports = txn_Model;
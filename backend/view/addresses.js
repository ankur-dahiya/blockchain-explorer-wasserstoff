const mongoose = require("mongoose");
const {Schema} = mongoose;

const add_schema = new Schema({
    eth_add : {
        type : String,
        required : true,
        max : [42],
        min : [42],
        unique : true,
        index: true
    },
    email : [String],
    balance : {type:Number},
    subCnt : {type: Number,default:0},
    searchCnt : {type: Number,default:0}
});

const addr_Model = mongoose.model("addresses",add_schema);
module.exports = addr_Model;
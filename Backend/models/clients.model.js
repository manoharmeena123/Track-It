const mongoose = require('mongoose');


const clientSchema  = mongoose.Schema({
    name : {type:String,required:true},
    email : {type:String,required:true},
    address : {type:String,required:true} ,
    note: {type:String},
    

},{versionKey:false})

const clientModel = mongoose.model("client",clientSchema);


module.exports = {clientModel};


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const teamSchema  = mongoose.Schema({
    name : {type:String,required:true},
    email : {type:String,required:true},
    billableRate : {type:Number,required:true} ,
    role: {type:String, required:true,enum:["admin","user"] ,default:"admin"},
    userId : {type:Schema.Types.ObjectId,ref:"user"},
    

},{versionKey:false})

const TeamModel = mongoose.model("team",teamSchema);


module.exports = {TeamModel};

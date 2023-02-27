const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const projectSchema  = mongoose.Schema({

    projectName : {type:String,required:true},
    clientId : {type:String,required:true},
    clientName :{type:String, required:true}, 
    userId : {type:String,required:true},
    //clientId : {type:Schema.Types.ObjectId,ref:"client",required:true},
    // timeTracked : {type:Number},
    // money : {type:Number},
    star : {type:Boolean,default:false},
    access : {type:String, enum:["Public","Private"],default:"Public"},

    

},{versionKey:false})

const ProjectModel = mongoose.model("project",projectSchema);


module.exports = {ProjectModel};

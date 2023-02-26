const mongoose = require('mongoose');
const {ProjectModel}=require("./projects.model")
const Schema = mongoose.Schema;
const taskSchema  = mongoose.Schema({
    task : {type:String,required:true},
    date : {type:String,required:true},
    startTime : {type:String,required:true} ,
    endTime: {type:String, required:true},
    userId : {type:Schema.Types.ObjectId,ref:"user"},
    projectId:{type:Schema.Types.ObjectId,ref:"project"},
    totalTimeInSec : {type:Number}

},{versionKey:false})

const TaskModel = mongoose.model("task",taskSchema);


module.exports = {TaskModel};

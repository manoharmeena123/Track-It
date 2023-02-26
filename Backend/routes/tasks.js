const express = require("express");
const { takeCoverage } = require("v8");
const { TaskModel } = require("../models/tasks.model");
const taskRouter = express.Router();


taskRouter.post("/",async(req,res)=>{
   try{
   let {task,date,startTime,endTime,projectId,  userId , totalTimeInSec}=req.body;
   if(!task || !date || !startTime ||!userId || !endTime || !projectId || !totalTimeInSec){
    res.status(422).json({err:"please fill all the details"})
   }
   else {
//check whether task already exists 
//res.send(task)

    let newTask = new TaskModel(req.body);
    let out = await newTask.save();
    res.send(out);














   }
   }
   catch(err){
    console.log("error | tasks | post ______________________");
    console.log(err);
   }
})




taskRouter.get("/:id",async(req,res)=>{
let userId = req.params.id;

try{
let tasks = await TaskModel.find({userId });
res.send(tasks)
}
catch(err){
    console.log("error in get | taskrouter",err)
}

 })


 taskRouter.get("/",async(req,res)=>{
    //res.send(req.body)
    try{
        let data = await TaskModel.find();
        res.send(data)
    }
    catch(err){
        console.log("error in get | taskrouter",err)
    }
    
     })
    
//delete tasks

taskRouter.delete("/delete/:id",async(req,res)=>{
    let _id = req.params.id;
    
    try{
   
  await  TaskModel.findByIdAndDelete(_id, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted : ", docs);
        res.send({msg:"deleted",docs})
    }
})
   //res.send("deleted successfully")
    }
    catch(err){
        console.log("error in delete | taskrouter",err)
    }



    
     })

// updating date adn 




module.exports = {taskRouter}
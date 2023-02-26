const express = require("express");
const { TeamModel } = require("../models/team.model");
const teamRouter = express.Router();


teamRouter.get("/", async (req,res)=>{
    try {
        let data = await TeamModel.find();
        res.send(data);
    } catch (error) {
        res.send("Error while getting data")
        console.log(error);
    }
})

teamRouter.get("/my-team",async(req,res)=>{
    let {userId}=req.body;
    
    try{
    let data = await TeamModel.find({userId})
    res.send(data)



    }catch(err){
        console.log("error | team | myteam",err)
    }
})




teamRouter.post("/", async (req,res)=>{
    let payload = req.body;

    try {
        let data = new TeamModel(payload);
        await data.save();
        res.send("Added");
    } catch (error) {
        res.send("Error while getting data")
    }
});


teamRouter.patch("/:id", async (req,res)=>{
    let _id= req.params.id;
    let payload = req.body;

    try {
        let data = await TeamModel.findByIdAndUpdate({"_id": _id}, payload,{new:true});
        res.send(data);
    } catch (error) {
        console.log("error in patch | team Router + + + + + +++++++++",error)
        res.send("Error while getting data")
    }
});

teamRouter.delete("/:id", async (req,res)=>{
    let _id = req.params.id;

    try {
        await TeamModel.findByIdAndRemove({"_id": _id});
        res.send("Deleted");
    } catch (error) {
        res.send("Error while getting data")
    }
});


module.exports={teamRouter}
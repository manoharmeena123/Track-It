const express = require("express");
const { TeamModel } = require("../models/team.model");
const teamRouter = express.Router();


teamRouter.get("/fetch", async (req,res)=>{
    try {
        let data = await TeamModel.find();
        res.send(data);
    } catch (error) {
        res.send("Error while getting data");
    }
})

teamRouter.post("/add", async (req,res)=>{
    let payload = req.body;

    try {
        let data = new TeamModel(payload);
        await data.save();
        res.send("Added");
    } catch (error) {
        res.send("Error while getting data");
    }
});


teamRouter.patch("/update", async (req,res)=>{
    let {_id} = req.body;
    let payload = req.body;

    try {
        let data = await TeamModel.findByIdAndUpdate({"_id": _id, payload});
        res.send("Updated");
    } catch (error) {
        console.log("error in patch | team Router + + + + + +++++++++",error)
        res.send("Error while getting data")
    }
});

teamRouter.delete("/delete", async (req,res)=>{
    let {_id} = req.body;

    try {
        await TeamModel.findByIdAndRemove({"_id": _id});
        res.send("Deleted");
    } catch (error) {
        res.send("Error while getting data")
    }
});


module.exports={teamRouter}
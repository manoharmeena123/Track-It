const express = require("express");
const { TeamModel } = require("../models/team.model");
const teamRouter = express.Router();


teamRouter.get("/", async (req, res) => {
    let email = req.headers.email;
    try {
        let data = await TeamModel.find({ "user": email }).sort({"created_at": -1});
        res.send(data);
    } catch (error) {
        res.send("msg", "Something went wrong please try again");
    }
});



teamRouter.post("/", async (req, res) => {
    let { email } = req.body;

    try {
        let check = await TeamModel.find({ email });
        if (check.length == 1) {
            res.send({ "msg": "Team Member already exist" });
            return;
        }
        let data = new TeamModel(req.body);
        await data.save();
        res.send({ "msg": "Team Member Successfully Added" });
    } catch (error) {
        res.send("msg", "Something went wrong please try again");
    }
});


teamRouter.patch("/:id", async (req, res) => {
    let _id = req.params.id;
    let payload = req.body;

    try {
        await TeamModel.findByIdAndUpdate({ "_id": _id }, payload);
        res.send({ "msg": "Updated Successfully" });
    } catch (error) {
        res.send("msg", "Something went wrong please try again");
    }
});

teamRouter.delete("/:id", async (req, res) => {
    let _id = req.params.id;

    try {
        await TeamModel.findByIdAndRemove({ "_id": _id });
        res.send({ "msg": "Deleted Successfully" });
    } catch (error) {
        res.send("msg", "Something went wrong please try again");
    }
});


module.exports = { teamRouter }
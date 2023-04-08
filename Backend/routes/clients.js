const express = require("express");
const { clientModel } = require("../models/clients.model");
const clientRouter = express.Router();

clientRouter.use(express.json());

//get all clients
clientRouter.get("/", async (req, res) => {
    let email = req.headers.email;
    try {
        let data = await clientModel.find({ user: email }).sort({"create_at": -1});
        res.send(data);
    } catch (err) {
        res.send("msg", "Something went wrong please try again");
    }
});

//get By Id
clientRouter.get("/:id", async (req, res) => {
    try {
        let _id = req.params.id;
        let data = await clientModel.findById(_id);
        res.send(data);
    } catch (err) {
        res.send("msg", "Something went wrong please try again");
    }
});

//post
clientRouter.post("/", async (req, res) => {
    try {
        let { name, email, address, user } = req.body;
        let clientExists = await clientModel.findOne({ email });
        if (clientExists) {
            res.status(409).json({ msg: "Client Already Exists" });
        } else {
            let newClient = new clientModel({ name, email, address, user });
            await newClient.save();
            res.send({ msg: "Client Successfully Added" });
        }
    } catch (err) {
        res.send("msg", "Something went wrong please try again");
    }
});

//delete
clientRouter.delete("/:id", async (req, res) => {
    try {
        let _id = req.params.id;
        await clientModel.findByIdAndRemove(_id);
        res.send({ "msg": "Deleted Successfully" });
    } catch (err) {
        res.send("msg", "Something went wrong please try again");
    }
});

//update
clientRouter.patch("/:id", async (req, res) => {
    try {
        let _id = req.params.id;
        await clientModel.findByIdAndUpdate(_id, req.body, { new: true, });
        res.send({ "msg": "Updated Successfully" });
    } catch (err) {
        res.send("msg", "Something went wrong please try again");
    }
});

module.exports = { clientRouter };

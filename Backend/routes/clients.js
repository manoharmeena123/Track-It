const express = require('express');
const { clientModel } = require('../models/clients.model');
const clientRouter = express.Router();


//get all clients 
clientRouter.get("/",async(req,res)=>{
    try{
        let data = await clientModel.find();
        res.send(data);
    }catch(err){console.log("err | client | get",err)}

})

//get By Id
clientRouter.get("/:id",async(req,res)=>{
    try{
        let _id = req.params.id;
        let data = await clientModel.findById(_id);
        res.send(data);
    }catch(err){console.log("err | client | getby ID",err)}

})

//post 
clientRouter.post("/",async(req,res)=>{
    try{
        let {name, email,address,note}=req.body;
        let clientExists = await clientModel.findOne({email});
        if(clientExists){res.status(409).json({error:"client allready exists"})}
        else{
        if(!name|| !email || !address ){res.status(422).json({error:"please fill all the entries"})}
        let newClient = new clientModel(req.body);
        let out = await newClient.save();
        res.send(out)
            }
    }catch(err){console.log("err | client | get",err)}

})

//delete
clientRouter.delete("/:id",async(req,res)=>{
    try{
        let _id = req.params.id;
        let data = await clientModel.findByIdAndRemove(_id);
        res.send(data);
    }catch(err){console.log("err | client | delete ID",err)}

})

//update 
clientRouter.patch("/:id",async(req,res)=>{
    try{
        let _id = req.params.id;
        let data = await clientModel.findByIdAndUpdate(_id,req.body,{new:true});
        res.send(data);
    }catch(err){console.log("err | client | delete ID",err)}

})


module.exports={clientRouter};
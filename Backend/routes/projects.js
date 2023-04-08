const express = require("express");
const { ProjectModel } = require("../models/projects.model");
const ProjectRouter = express.Router();





//get projects based on user email
ProjectRouter.get("/:email", async (req, res) => {
   let user = req.params.email;
   try {
      let data = await ProjectModel.find({ user }).sort({ "created_at": -1 });
      res.send(data);
   } catch (err) {
      res.send("msg", "Something went wrong please try again");
   }
});






//post 
ProjectRouter.post("/", async (req, res) => {
   let { projectName } = req.body;
   try {
      let check = await ProjectModel.find({ "projectName": projectName });
      if (check.length == 1) {
         res.send({ "msg": "Project Name is already Present" });
         return;
      }

      let newPro = new ProjectModel(req.body);
      await newPro.save();
      res.send({ "msg": "Project Successfully Added" });
   } catch (error) {
      res.send("msg", "Something went wrong please try again");
   }
})




//delete 
ProjectRouter.delete("/:id", async (req, res) => {
   let _id = req.params.id;
   try {
      await ProjectModel.findByIdAndDelete(_id);
      res.send({ "msg": "deleted successfully" })
   } catch (error) {
      res.send("msg", "Something went wrong please try again");
   }
})





module.exports = { ProjectRouter };
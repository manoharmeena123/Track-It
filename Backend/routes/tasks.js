const express = require("express");
const { TaskModel } = require("../models/tasks.model");
const { ProjectModel } = require("../models/projects.model");
const taskRouter = express.Router();


// Get Task Data by user
taskRouter.get("/:id", async (req, res) => {
    let user = req.params.id;
    try {
        let tasks = await TaskModel.find({ user }).sort({ "date": -1 });
        res.send(tasks)
    }
    catch (err) {
        res.send({ "msg": "Something went wrong please try again" });
    }
});


// Add new Task
taskRouter.post("/", async (req, res) => {
    let { task } = req.body;
    try {

        let check = await TaskModel.find({ "task": task });
        if (check.length == 1) {
            res.send({ "msg": "Task already Exist" });
            return;
        }

        let newTask = new TaskModel(req.body);
        let out = await newTask.save();
        res.send(out);
    }
    catch (err) {
        res.send({ "msg": "Something went wrong please try again" });
    }
})



taskRouter.patch("/update/:id", async (req, res) => {
    let payload = req.body;
    let { totalTime } = req.body;
    let projectName = req.headers.projectname;
    try {
        let _id = req.params.id;
        await TaskModel.findByIdAndUpdate(_id, payload);
        if (projectName.length > 0) {
            let project = await ProjectModel.findOne({ "projectName": projectName });
            project.timeTracked += totalTime;
            await project.save();
            res.send({ "msg": "Updated Successfully" });
        } else {
            res.send({ "msg": "No time tracked records found or invalid data" });
        }
    } catch (err) {
        res.send({ "msg": "Something went wrong please try again" });
    }
});


taskRouter.patch("/updateTimer/:id", async (req, res) => {
    let { totalTime, projectName } = req.body;
    try {
        let _id = req.params.id;
        let task = await TaskModel.findOne({ "_id": _id });
        let project = await ProjectModel.findOne({ "projectName": projectName });
        if (project.timeTracked >= 0 && (totalTime - task.totalTime) >= 0) {
            project.timeTracked = project.timeTracked + (totalTime - task.totalTime);
            await project.save();
            if (task.totalTime >= 0) {
                task.totalTime = totalTime;
                await task.save();
            }
            res.send({ "msg": "Updated Successfully" });
        } else {
            res.send({ "msg": "No time tracked records found or invalid data" });
        }
    } catch (err) {
        res.send({ "msg": "Something went wrong please try again" });
    }
});









//delete tasks
taskRouter.delete("/delete/:id", async (req, res) => {
    let _id = req.params.id;
    let projectName = req.headers.projectname;
    let time = req.headers.totaltime;

    try {
        await TaskModel.findByIdAndDelete(_id);
        let project = await ProjectModel.findOne({ "projectName": projectName });
        if (project.timeTracked >= time) {
            project.timeTracked -= time;
            await project.save();
            res.send({ "msg": "Updated Successfully" });
        } else {
            res.send({ "msg": "No time tracked records found or invalid data" });
        }
    } catch (err) {
        res.send({ "msg": "Something went wrong please try again" });
    }
})


module.exports = { taskRouter }
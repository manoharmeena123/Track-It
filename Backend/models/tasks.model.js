const mongoose = require("mongoose");
const taskSchema = mongoose.Schema(
    {
        task: String,
        date: {
            type: Date,
            default: Date.now,
            required: false
        },
        startTime: {
            type: Date,
            default: Date.now,
            required: false
        },
        endTime: {
            type: String,
            required: false
        },
        user: String,
        projectName: String,
        totalTime: {
            type: Number,
            default: 0,
            required: false
        },
    },
    { versionKey: false }
);

const TaskModel = mongoose.model("task", taskSchema);

module.exports = { TaskModel };

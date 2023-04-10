const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    projectName: String,
    clientName: String,
    timeTracked: {
        type: Number,
        default: 0,
        required: false
    },
    user: String,
    amount: {
        type: Number,
        default: 0,
        required: false
    },
    create_at: {
        type: Date,
        default: Date.now,
        required: false
    },
    access: String
}, { versionKey: false });

const ProjectModel = mongoose.model("project", projectSchema);


module.exports = { ProjectModel };

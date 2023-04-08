const mongoose = require("mongoose");
const teamSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        billableRate: Number,
        role: {
            type: String,
            default: "No Role"
        },
        user: String,
        created_at: {
            type: Date,
            default: Date.now,
            required: false
        }
    },
    { versionKey: false }
);

const TeamModel = mongoose.model("team", teamSchema);

module.exports = { TeamModel };

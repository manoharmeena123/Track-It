const mongoose = require('mongoose');


const clientSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  address: { type: String },
  "user": String,
  "create_at": {
    type: Date,
    default: Date.now,
    required: false
  }
}, { versionKey: false })

const clientModel = mongoose.model("client", clientSchema);


module.exports = { clientModel };


const mongoose = require("mongoose")

const deanSchema = new mongoose.Schema({
    universityId: { type: String, unique: true,  minLength: 7, maxLength: 7  },
    password: { type: String, require: true },
    token: { type: String },
    name: { type: String }
});

const Dean = mongoose.model("Dean", deanSchema);
module.exports = Dean;

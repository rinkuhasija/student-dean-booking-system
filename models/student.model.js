const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    universityId: { type: String, unique: true, required: true, minLength: 5, maxLength: 5 },
    password: { type: String, required: true },
    token: { type: String },
    name: { type: String }
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
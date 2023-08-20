const mongoose = require("mongoose")

const sessionSchema = new mongoose.Schema({
    date: { type: Date },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    dean: { type: mongoose.Schema.Types.ObjectId, ref: 'Dean' },
    booked: { type: Boolean }
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;


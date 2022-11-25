// Tutors users module

const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
    tutorId: { type: String, lowercase: true },
    tname: { type: String },
    temail: { type: String },
    moduleTaught: { type: String }



});
const model = mongoose.model('TutorSchema', tutorSchema);
module.exports = model;
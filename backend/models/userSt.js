// Tutors users module

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: { type: String, lowercase: true },
    name: { type: String },
    email: { type: String },
    courseEnrolled: { type: String }



});
const model = mongoose.model('StudentSchema', studentSchema);
module.exports = model;
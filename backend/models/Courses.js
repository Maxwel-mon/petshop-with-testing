//courses user module 

const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
    courseID: {type: int}.type,
    courseName: {type: String, lowercase: true}
});

const model = mongoose.model('CourseSchema', coursesSchema);
module.exports = model;
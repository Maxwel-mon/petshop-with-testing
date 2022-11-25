// Tutors users module

const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    sessionid: { type: String, lowercase: true },
    session_name: { type: String },
    session_type: { type: String }




});
const model = mongoose.model('SessionSchema', sessionSchema);
module.exports = model;
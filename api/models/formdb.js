const mongoose = require('mongoose');

const formsubmitschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    modified_at: {
        type: Date,
        default: Date.now
    },
});


formsubmitschema.pre('save', function (next) {
    this.modified_at = new Date();
    next();
});

formsubmitschema.pre('findOneAndUpdate', function () {
    this.set({ modified_at: new Date() });
});

const formdb = mongoose.model('simpleformsubmit', formsubmitschema);

module.exports = formdb;
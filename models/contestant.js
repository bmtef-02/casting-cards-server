const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contestantSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    ethnicity: {
        type: String,
        required: true
    },
    relStatus: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    IQ: {
        type: Number,
        required: true
    },
    imgSrc: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

const Contestant = mongoose.model('Contestant', contestantSchema);

module.exports = Contestant;
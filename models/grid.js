const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gridSchema = new Schema({
    season: {
        type: Number,
        required: true
    },
    pitch: {
        type: Number,
        required: true
    },
    showName: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    selectedNames: [{
        type: String,
    }],
    numPages: [{
        type: String,
    }],
    gridType: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Grid = mongoose.model('Grid', gridSchema);

module.exports = Grid;
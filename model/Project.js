const mongoose = require('mongoose');
const ProjectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    stack: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: 'no-image'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Project', ProjectSchema);
const mongoose = require('mongoose');

const annonActionSchema = mongoose.Schema({  
    title: {
        type: String,
        required: true
    },
    actionType: {
        type: Number,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('AnnonAction', annonActionSchema);
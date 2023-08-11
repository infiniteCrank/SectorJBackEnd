const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({  
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    imageType: {
      type: String,
      required: true
    }
  });
  
module.exports = mongoose.model('ProductImage', imageSchema);
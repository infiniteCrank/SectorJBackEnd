const mongoose = require('mongoose');

const typeSchema = mongoose.Schema({  
    name: {
      type: String,
      required: true
    },
    description: {
        type: String,
        required: true
      },
    enabled: {
        type: Boolean,
        required: true
    },
  });
  
module.exports = mongoose.model('ProductType', typeSchema);
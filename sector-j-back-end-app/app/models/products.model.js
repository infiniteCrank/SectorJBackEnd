const mongoose = require('mongoose');
const ProductImage = require('../models/product.image.model');
const ProductType = require('../models/product.type.model');

const ProductsSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    quantity: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    size:{
      type: String,
      required: true
    },
    color:{
      type: String,
      required: true
    },
    condition: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    type:  {type: mongoose.Schema.Types.ObjectId, ref: 'ProductType'},
    stripeId: {
      type: String,
      required: true
    },
    wizdudsId: {
        type: String,
        required: true
    },    
    enabled: {
      type: Boolean,
      required: true
    },
  });

module.exports = mongoose.model("products", ProductsSchema);
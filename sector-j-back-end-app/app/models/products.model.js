const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageId: {
      type: String,
      required: true
    },
    quanity: {
        type: string,
        required: true
    },
    size:{
        type: string,
        required: true
    },
    color:{
        type: string,
        required: true
    },
    typeId:{
        type: string,
        required: true
    },
    price: {
        type: string,
        required: true
    },
    stripeId: {
        type: string,
        required: true
    },
    wizdudsId: {
        type: string,
        required: true
    },
  });

module.exports = mongoose.model("products", ProductsSchema);
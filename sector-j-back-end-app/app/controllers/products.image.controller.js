const ProductImageModel = require('../models/product.image.model');
const ProductValidator = require('../validators/product.validation.js')

// Create and Save a new Product image
exports.create = (req, res) => {
    // Validate request
    let err = ProductValidator.validateProductImage(req);
     //return an error if validation does not pass 
    if(err!=""){
        return res.status(400).send({
            title: 'Error saving product image',
            content: err
        });
    }
    // Create a Product image
    const newProductImage = new ProductImageModel({
        name: req.body.image.name,
        quantity: req.body.image.quantity,
        imageType: req.body.image.imageType,
    });

    newProductImage.save()
    .then(productImageData => {
        console.log(productImageData)
        res.send(productImageData);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while saving the Product image."
        });
    });
};

// Retrieve and return all Product images from the database.
exports.findAll = (req, res) => {
    ProductImageModel.find()
    .then(productImages => {
        res.send(productImages);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving product images."
        });
    });
};

// Find a single Product image with a productImageId
exports.findOne = (req, res) => {
    ProductImageModel.findById(req.params.productImageId)
    .then(productImage => {
        if(!productImage) {
            return res.status(404).send({
                message: "Product image not found with id " + req.params.productImageId
            });            
        }
        res.send(productImage);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product image not found with id " + req.params.productImageId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving product image with id " + req.params.productImageId
        });
    });
};

// Update a Product image identified by the productImageId in the request
exports.update = (req, res) => {
    // Validate Request
    let err = ProductValidator.validateProductImage(req);
     //return an error if validation does not pass 
    if(err!=""){
        return res.status(400).send({
            title: 'Error saving product image',
            content: err
        });
    }

    // Find Product image and update it with the request body
    ProductImageModel.findByIdAndUpdate(req.params.productImageId, {
        name: req.body.image.name,
        quantity: req.body.image.quantity,
        imageType: req.body.image.imageType,
    }, {new: true})
    .then(productImage => {
        if(!productImage) {
            return res.status(404).send({
                message: "Product image not found with id " + req.params.productImageId
            });
        }
        res.send(productImage);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product image not found with id " + req.params.productImageId
            });                
        }
        return res.status(500).send({
            message: "Error updating product image with id " + req.params.productImageId
        });
    });
};

// Delete a Product image with the specified productImageId in the request
exports.delete = (req, res) => {
    ProductImageModel.findByIdAndRemove(req.params.productImageId)
    .then(productImage => {
        if(!productImage) {
            return res.status(404).send({
                message: "Product image not found with id " + req.params.productImageId
            });
        }
        res.send({message: "Product image deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product image not found with id " + req.params.productImageId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product image with id " + req.params.productImageId
        });
    });
};
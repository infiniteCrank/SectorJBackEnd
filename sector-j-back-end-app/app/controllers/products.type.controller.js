const ProductTypeModel = require('../models/product.type.model');
const ProductValidator = require('../validators/product.validation.js')

// Create and Save a new Product type
exports.create = (req, res) => {
    // Validate request
    let err = ProductValidator.validateProductType(req);
     //return an error if validation does not pass 
    if(err!=""){
        return res.status(400).send({
            title: 'Error saving product type',
            content: err
        });
    }
    // Create a Product type
    const newProductType = new ProductTypeModel({
        name: req.body.type.name,
        description: req.body.type.description,
        enabled: req.body.type.enabled,

    });
    newProductType.save()
    .then(productTypeData => {
        console.log(productTypeData)
        return productTypeData.id;
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while saving the Product type."
        });
    });
};

// Retrieve and return all Product types from the database.
exports.findAll = (req, res) => {
    ProductTypeModel.find()
    .then(productTypes => {
        res.send(productTypes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving product types."
        });
    });
};

// Find a single Product type with a productTypeId
exports.findOne = (req, res) => {
    ProductTypeModel.findById(req.params.productTypeId)
    .then(productType => {
        if(!productType) {
            return res.status(404).send({
                message: "Product type not found with id " + req.params.productTypeId
            });            
        }
        res.send(productType);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product type not found with id " + req.params.productTypeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving product type with id " + req.params.productTypeId
        });
    });
};

// Update a Product type identified by the productTypeId in the request
exports.update = (req, res) => {
    // Validate Request
    let err = ProductValidator.validateProductType(req);
     //return an error if validation does not pass 
    if(err!=""){
        return res.status(400).send({
            title: 'Error saving product type',
            content: err
        });
    }

    // Find Product type and update it with the request body
    ProductTypeModel.findByIdAndUpdate(req.params.productTypeId, {
        name: req.body.type.name,
        description: req.body.type.description,
        enabled: req.body.type.enabled,
    }, {new: true})
    .then(productType => {
        if(!productType) {
            return res.status(404).send({
                message: "Product type not found with id " + req.params.productTypeId
            });
        }
        res.send(productType);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product type not found with id " + req.params.productTypeId
            });                
        }
        return res.status(500).send({
            message: "Error updating product type with id " + req.params.productTypeId
        });
    });
};

// Delete a Product type with the specified productTypeId in the request
exports.delete = (req, res) => {
    ProductTypeModel.findByIdAndRemove(req.params.productTypeId)
    .then(productType => {
        if(!productType) {
            return res.status(404).send({
                message: "Product type not found with id " + req.params.productTypeId
            });
        }
        res.send({message: "Product type deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product type not found with id " + req.params.productTypeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product type with id " + req.params.productTypeId
        });
    });
};
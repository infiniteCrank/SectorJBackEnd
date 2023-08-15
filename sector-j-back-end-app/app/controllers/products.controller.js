const ProductsModel = require('../models/products.model.js');
const ProductImageModel = require('../models/product.image.model.js');
const ProductTypeModel = require('../models/product.type.model.js');
const ProductValidator = require('../validators/product.validation.js')

// Create and Save a new Product
exports.create = (req, res) => {
    let isObject = value => typeof value === 'object' || value instanceof Object;

    let productTypePromise;

    const isTypeObject = isObject(req.body.type);

    let err = ProductValidator.validateProduct(req) 

    if(isTypeObject){
        err += ProductValidator.validateProductType(req)
        const newProductType = new ProductTypeModel({
            name: req.body.type.name,
            description: req.body.type.description,
            enabled: req.body.type.enabled,
    
        });
        productTypePromise = newProductType.save()
        .then(productTypeData => {
            console.log(productTypeData)
            return productTypeData.id;
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while saving the Product type."
            });
        });
    }else{
        productTypePromise = Promise.resolve(req.body.type);
    }
    
    //return an error if validation does not pass 
    if(err!=""){
        return res.status(400).send({
            title: 'Error saving product',
            content: err
        });
    }

    productTypePromise.then((productType) => {
        console.log(productType);
        // Create a Product
        const product = new ProductsModel({
            name: req.body.name,         
            description: req.body.description,
            type: productType,
            image: req.body.image,         
            quantity: req.body.quantity,    
            size: req.body.size,          
            color: req.body.color,         
            condition: req.body.condition,     
            price: req.body.price,                   
            stripeId: req.body.stripeId,     
            wizdudsId: req.body.wizdudsId,    
            enabled: req.body.enabled,       
        });
    
        //Save Product in the database
        product.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product."
            });
        });
    });

};

// Retrieve and return all Products from the database.
exports.findAll = (req, res) => {
    ProductsModel.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    ProductsModel.findById(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving product with id " + req.params.productId
        });
    });
};

// Update a product identified by the productId in the request
exports.update = (req, res) => {
    // Validate Request
    let err = ProductValidator.validateProduct(req) 

    //return an error if validation does not pass 
    if(err!=""){
        return res.status(400).send({
            title: 'Error updating product',
            content: err
        });
    }

    // Find product and update it with the request body
    ProductsModel.findByIdAndUpdate(req.params.productId, {
        name: req.body.name,         
        description: req.body.description,
        type: req.body.type,
        image: req.body.image,        
        quantity: req.body.quantity,    
        size: req.body.size,          
        color: req.body.color,         
        condition: req.body.condition,     
        price: req.body.price,         
        stripeId: req.body.stripeId,     
        wizdudsId: req.body.wizdudsId,    
        enabled: req.body.enabled,
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error updating product with id " + req.params.productId
        });
    });
};

// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
    console.log("i got here to delete")
    ProductsModel.findByIdAndRemove(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId + " do to:"+ err
        });
    });
};
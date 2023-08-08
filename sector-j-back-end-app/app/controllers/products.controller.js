const ProductsModel = require('../models/products.model.js');
const ProductImageModel = require('../models/product.image.model.js');
const ProductTypeModel = require('../models/product.type.model.js');

// Create and Save a new Product
exports.create = (req, res) => {
    const productFields = [
    'name',         //val
    'description',  //val
    'image',        //val
    'quantity',     //val
    'size',         //val
    'color',        //val
    'condition',    //val
    'price',        //val
    'type',         //val
    'stripeId',     //val
    'wizdudsId',    //val
    'enabled'       //val
    ];

    const stringRegEx = /^[0-9A-Za-z_.-]*/
    const hexColorRegEx = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    const dollarRegEx = /^\$?[0-9]+(\.[0-9][0-9])?$/;

    const sizes = ['xs','s','m','l','xl','xxl','xxxl','xxxxl',
    '0-3 mo','newborn','12 mo','18 mo','1t','2t','3t','4t','5t','6t',
    '1','2','3','4','5','6','7','8','9','10','11','12'];

    const conditions  = ['new','used','custom']

    var err = "";
    let isString = value => typeof value === 'string' || value instanceof String;

    for (i in productFields) {
        if(!req.body[productFields[i]]) {//check for empty fields
            err += productFields[i] + " is a required field.  "
        }else if( //check strings
            isString(req.body[productFields[i]]) &&
            (productFields[i]!= "image") &&
            (productFields[i]!= "quantity") &&
            (productFields[i]!= "type") &&
            (productFields[i]!= "enabled") 
        ) {
            //check the product name 
            if( productFields[i]== "name"){
                const productName = req.body[productFields[i]];
                if(productName.length>150){
                    err += "Product name must be under 150 characters.  ";
                }
                if(productName.length<5){
                    err += "Product name must be greater than 5 characters.  ";
                }
                console.log(productName.match(stringRegEx))
                if(!stringRegEx.test(productName)){
                    err += "Product name must be letters numbers or underscore.  ";
                }
            }

            //check the product description 
            if( productFields[i]== "description"){
                const productdescription = req.body[productFields[i]];
                if(productdescription.length>500){
                    err += "Product description must be under 500 characters.  ";
                }
                if(productdescription.length<5){
                    err += "Product description must be greater than 5 characters.  ";
                }
                if(!stringRegEx.test(productdescription)){
                    err += "Product description must be letters numbers or underscore.  ";
                }
            }
        
            //check to make sure size is on size chart
            if(
                productFields[i]== "size" &&
                (!sizes.includes(req.body[productFields[i]]))
            ){
                err += productFields[i] + " must be a valid size. valid sizes are " + sizes.join() + ".  ";
            }

            //check to make sure color is a hex color 
            if(
                productFields[i]== "color" &&
                (!hexColorRegEx.test(req.body[productFields[i]]))
            ){
                err += productFields[i] + " must be a valid hex color.  ";
            }

            //check to make sure condition is in the list 
            if(
                productFields[i]== "condition" &&
                (!conditions.includes(req.body[productFields[i]]))
            ){
                err += productFields[i] + " must be a valid condition conditions are " + conditions.join() + ".  ";
            }

            //check price for dollar amount 
            if(
                productFields[i]== "price" &&
                (!dollarRegEx.test(req.body[productFields[i]]))
            ){
                err += productFields[i] + " must be a valid dollar amount.  ";
            }

            //check stripe id length 
            if( productFields[i]== "stripeId"){
                const stripeIdNumber = req.body[productFields[i]];
                if(stripeIdNumber){
                    if(stripeIdNumber.length>255){
                        err += "Stripe Id must be under 255 characters.  ";
                    }
                    if(stripeIdNumber.length<20){
                        err += "Stripe Id must be greater than 20 characters.  ";
                    }
                }
            }

            //check wizduds id 
            if( productFields[i]== "wizdudsId"){
                const wizId = req.body[productFields[i]];
                if(wizId){
                    if(wizId.length>255){
                        err += "Product ID must be under 500 characters.  ";
                    }
                    if(wizId.length<5){
                        err += "Product ID must be greater than 5 characters.  ";
                    }
                    if(!stringRegEx.test(wizId)){
                        err += "Product ID must be letters numbers or underscore.  ";
                    }
                }
            }


        }else{
            //this is all non-strings

            //check numbers 
            if(
                productFields[i]== "quantity" && 
                isNaN(req.body[productFields[i]])
            ){
                err += productFields[i] + " must be a number.  "
            }

            //check boolean 
            if(
                productFields[i]== "enabled" &&
                (typeof req.body[productFields[i]] != "boolean")

            ){
                err += productFields[i] + " must be a boolean.  "
            }

            //check objects
            let isObject = value => typeof value === 'object' || value instanceof Object;
            if(
                productFields[i]== "image" &&
                !isObject(req.body[productFields[i]])
            ){
                err += productFields[i] + " must be an product image object. name,quantity,imageType.  "
            }
            if(
                productFields[i]== "type" &&
                !isObject(req.body[productFields[i]])
            ){
                err += productFields[i] + " must be an product type object. name,description,enabled.  "
            }
            
        }


    }// end for loop 

    //check product image 
    //name,quantity,imageType,
    const productImage = req.body.image;
    if(productImage){
        const imgTypes = ['jpeg','jpg','png','svg'];
        //check the product name 
        const productImageName = productImage.name || "";
        if(productImageName.length>150){
            err += "Product Image name must be under 150 characters.  ";
        }
        if(productImageName.length<5){
            err += "Product Image name must be greater than 5 characters.  ";
        }
        if(!stringRegEx.test(productImageName)){
            err += "Product Image name must be letters numbers or underscore.  ";
        }
        //check image quantity 
        if(isNaN(productImage.quantity)){
            err += "Product Image quantity must be a number.  "
        }
        //check image type 
        if(!imgTypes.includes(productImage.imageType)){
            err += "Product Image type must be a one of the following. " + imgTypes.join() + ".  ";
        }
    }else{
        err += "product must have a product image object with. name,quantity,imageType.  ";
    }
    

    //check product type 
    //name,description,enabled,
    const productType = req.body.type;
    if(productType){
        //check the product name 
        const productTypeName = productType.name;
        if(productTypeName.length>150){
            err += "Product type name must be under 150 characters.  ";
        }
        if(productTypeName.length<5){
            err += "Product type name must be greater than 5 characters.  ";
        }
        if(!stringRegEx.test(productTypeName)){
            err += "Product type name must be letters numbers or underscore.  ";
        }
        //check product type description 
        const productTypeDescription = productType.description;
        if(productTypeDescription.length>500){
            err += "Product type description must be under 500 characters.  ";
        }
        if(productTypeDescription.length<5){
            err += "Product type description must be greater than 5 characters.  ";
        }
        if(!stringRegEx.test(productTypeDescription)){
            err += "Product type description must be letters numbers or underscore.  ";
        }
        //check enabled 
        if(typeof productType.enabled != "boolean"){
            err += productFields[i] + " must be a boolean.  "
        }
    }else{
        err += "product must have a product Type object with. name,description,enabled.  ";
    }

    //return an error if validation does not pass 
    if(err!=""){
        return res.status(400).send({
            title: 'Error saving product',
            content: err
        });
    }

    const newProductType = new ProductTypeModel({
        name: req.body.type.name,
        description: req.body.type.description,
        enabled: req.body.type.enabled,

    });

    const newProductImage = new ProductImageModel({
        name: req.body.image.name,
        quantity: req.body.image.quantity,
        imageType: req.body.image.imageType,
    });

    const productTypePromise = newProductType.save()
    .then(productTypeData => {
        console.log(productTypeData)
        return productTypeData.id;
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while saving the Product type."
        });
    });

    const productImagePromise = newProductImage.save()
    .then(productImageData => {
        console.log(productImageData)
        return productImageData.id;
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while saving the Product image."
        });
    });

    Promise.all([productTypePromise, productImagePromise]).then((values) => {
        console.log(values);
        // Create a Product
        const product = new ProductsModel({
            name: req.body.name,         
            description: req.body.description,
            type: values[0],
            image: values[1],         
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
    if(!req.body.content) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Find product and update it with the request body
    ProductsModel.findByIdAndUpdate(req.params.productId, {
        name: req.body.name,         
        description: req.body.description,        
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
                message: "zproduct not found with id " + req.params.productId
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
            message: "Could not delete product with id " + req.params.productId
        });
    });
};
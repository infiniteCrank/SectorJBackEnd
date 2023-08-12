module.exports = (app) => {
    const productImageController = require('../controllers/products.image.controller.js');
    const fs = require('fs');
    const path = require("path");
    const jwtKeyPath = path.resolve("./app/validation/jwtRS256.key.pub");
    const pubKey = fs.readFileSync(jwtKeyPath);
    //json web token stuff
    const { expressjwt: jwt } = require("express-jwt");
    const jwtCheck = jwt({
        secret: pubKey,
        audience: "sector-j:Admin",
        issuer: 'http://sectorj.com',
        algorithms: ['RS256']
    });

    // Create a new product image
    app.post('/product/image',jwtCheck,function (req, res){
        if (!req.user.isAdmin){
            return res.sendStatus(401);
        }
        else{
            productImageController.create(req, res);
        }
    });


    // Retrieve all product images
    app.get('/product/images',jwtCheck,function (req, res){
        if (!req.user.isAdmin){
            return res.sendStatus(401);
        }
        else{
            productImageController.findAll(req, res);
        }
    });

    // Retrieve a single product image with productImageId
    app.get('/product/images/:productImageId',jwtCheck,function (req, res){
        if (!req.user.isAdmin){
            return res.sendStatus(401);
        }
        else{
            productImageController.findOne(req, res);
        }
    });

    // Update a product image with productImageId
    app.put('/product/images/:productImageId',jwtCheck,function (req, res){
        if (!req.user.isAdmin){
            return res.sendStatus(401);
        }
        else{
            productImageController.update(req, res);
        }
    });

    // Delete a product image with productImageId
    app.delete('/delete/product/images/:productImageId',jwtCheck,function (req, res){
        if (!req.user.isAdmin){
            return res.sendStatus(401);
        }
        else{
            productImageController.delete(req, res);
        }
    });
}
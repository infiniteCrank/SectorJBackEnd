module.exports = (app) => {
    const productTypeController = require('../controllers/products.type.controller.js');
    const fs = require('fs');
    const path = require("path");
    const jwtKeyPath = path.resolve("./app/validation/jwtRS256.key.pub");
    const pubKey = fs.readFileSync(jwtKeyPath);
    //json web token stuff
    const jwt = require('express-jwt');
    const jwtCheck = jwt({
        secret: pubKey,
        audience: "sector-j:Admin",
        issuer: 'http://sectorj.com',
        algorithms: ['RS256']
    });

    // Create a new product type
    app.post('/product/type',jwtCheck,function (req, res){
        if (!req.user.isAdmin){
            return res.sendStatus(401);
        }
        else{
            productTypeController.create(req, res);
        }
    });


    // Retrieve all product types
    app.get('/product/types',jwtCheck,function (req, res){
        if (!req.user.isAdmin){
            return res.sendStatus(401);
        }
        else{
            productTypeController.findAll(req, res);
        }
    });

    // Retrieve a single product type with productTypeId
    app.get('/product/types/:productTypeId',jwtCheck,function (req, res){
        if (!req.user.isAdmin){
            return res.sendStatus(401);
        }
        else{
            productTypeController.findOne(req, res);
        }
    });

    // Update a product type with productTypeId
    app.put('/product/types/:productTypeId',jwtCheck,function (req, res){
        if (!req.user.isAdmin){
            return res.sendStatus(401);
        }
        else{
            productTypeController.update(req, res);
        }
    });

    // Delete a product type with productTypeId
    app.delete('/delete/product/types/:productTypeId',jwtCheck,function (req, res){
        if (!req.user.isAdmin){
            return res.sendStatus(401);
        }
        else{
            productTypeController.delete(req, res);
        }
    });
}
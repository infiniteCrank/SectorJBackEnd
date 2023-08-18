module.exports = (app) => {
    const products = require('../controllers/products.controller.js');
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

    //app.use(jwtCheck);
    // Create a new product
    app.post('/products',jwtCheck,function (req, res){
        console.log(req.auth.isAdmin)
        if (!req.auth.isAdmin){
            return res.sendStatus(401);
        }
        else{
            products.create(req, res);
        }
    });


    // Retrieve all products
    app.get('/products',  products.findAll);
    // app.get('/products',jwtCheck,function (req, res){
    //     if (!req.auth.isAdmin){
    //         return res.sendStatus(401);
    //     }
    //     else{
    //         products.findAll(req, res);
    //     }
    // });

    // Retrieve a single product with productId
    app.get('/products/:productId',jwtCheck,function (req, res){
        if (!req.auth.isAdmin){
            return res.sendStatus(401);
        }
        else{
            products.findOne(req, res);
        }
    });

    // Update a product with productId
    app.put('/products/:productId',jwtCheck,function (req, res){
        if (!req.auth.isAdmin){
            return res.sendStatus(401);
        }
        else{
            products.update(req, res);
        }
    });

    // Delete a product with productId
    app.delete('/delete/products/:productId',jwtCheck,function (req, res){
        if (!req.auth.isAdmin){
            return res.sendStatus(401);
        }
        else{
            products.delete(req, res);
        }
    });
}
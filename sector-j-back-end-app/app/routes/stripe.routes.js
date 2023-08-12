module.exports = (app) => {
    const stripeService = require('../stripe/product.stripe.service.js');
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

    //app.use(jwtCheck);
    // Create a new product
    app.post('/stripe/product',jwtCheck,function (req, res){
        if (!req.user.isAdmin){
            return res.sendStatus(401);
        }
        else{
            stripeService.createStripeProduct(req, res);
        }
    });


    // Retrieve all products
    app.get('/stripe/products',jwtCheck,function (req, res){
        if (!req.user.isAdmin){
            return res.sendStatus(401);
        }
        else{
            stripeService.GetStripeProducts(req, res);
        }
    });

    // Delete a product with productId
    app.delete('stripe/delete/products/:productId',jwtCheck,function (req, res){
        if (!req.user.isAdmin){
            return res.sendStatus(401);
        }
        else{
            stripeService.deleteStripeProduct(req, res);
        }
    });
}
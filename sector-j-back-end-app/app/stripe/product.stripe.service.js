const PropertiesReader = require('properties-reader');
const stripeKeyProperties = PropertiesReader('./app/validation/stripeKey.properties');
const stripeConfig = require('../../config/stripe.config');
const stripeEnv = stripeConfig.stripeEnv;
const stripeApiKey = (stripeEnv == "dev")?stripeKeyProperties.get("testKey"):stripeKeyProperties.get("prodKey");
const stripe = require('stripe')(stripeApiKey);
const stripeApiHost = (stripeEnv == "dev")?stripeConfig.stripeDevHost:stripeConfig.stripeProdHost;

exports.checkOutSession = (req, res) => {
    const cart = req.body.lineItems;
    console.log("using key")
    console.log(stripeApiKey.substring(10))
    stripe.checkout.sessions.create({
        line_items: cart,
        mode: 'payment',
        success_url: stripeApiHost + '/success',
        cancel_url: stripeApiHost + '/cancel',
        shipping_address_collection: {
            allowed_countries:["US","CA"]
        }
    }).then((session)=>{
        console.log(session)
        res.send(session);
    });


}

exports.createStripeProduct = (req, res) => {
    const product = req.body;
    stripe.products.create({
        name: product.name,
        description: product.description,
        tax_code:'txcd_99999999',
        active:product.active,
        default_price_data:{
            unit_amount: product.amount,//A positive integer in cents
            currency: 'usd'
        },
        statement_descriptor: 'clothing',
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the product."
        });
    });
}

exports.GetStripeProducts = (req, res) => {
    const product = req.body;
    stripe.products.list({
        limit: product.limit || 10,
        active: product.active || true
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while getting the products."
        });
    });
}

exports.deleteStripeProduct = (req, res) => {
    const productId = req.params.productId
    stripe.products.del(
        productId
    ).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the product."
        });
    });
}
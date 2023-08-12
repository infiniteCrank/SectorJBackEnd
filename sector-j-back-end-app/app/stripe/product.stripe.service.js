const stripeKeyProperties = PropertiesReader('../validation/stripeKeys.properties');
const stripeEnv = stripeKeyProperties.get("stripeEnv")
const stripeApiKey = (stripeEnv == "dev")?stripeKeyProperties.get("testKey"):stripeKeyProperties.get("prodKey");
const stripe = require('stripe')(stripeApiKey);

// Create and Save a new Note
exports.createStripeProduct = (req, res) => {
    const product = req.body;
    stripe.products.create({
        name: product.name,
        description: product.description,
        active:product.active,
        default_price_data:{
            unit_amount: product.amount,//A positive integer in cents
            currency: 'usd'
        },
        statement_descriptor: 'clothing',
        tax_code:'txcd_99999999'
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
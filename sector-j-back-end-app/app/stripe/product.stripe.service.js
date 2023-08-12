const stripeKeyProperties = PropertiesReader('../validation/stripeKeys.properties');
const stripeEnv = stripeKeyProperties.get("stripeEnv")
const stripeApiKey = (stripeEnv == "dev")?stripeKeyProperties.get("testKey"):stripeKeyProperties.get("prodKey");
const stripe = require('stripe')(stripeApiKey);
const stripeApiHost = (stripeEnv == "dev")?stripeKeyProperties.get("stripeDevHost"):stripeKeyProperties.get("stripeProdHost");

exports.checkOutSession = (req, res) => {
    const cart = req.body;
    const session = stripe.checkout.sessions.create({
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: 'usd',
                    unit_amount: 2000,
                    product_data: {
                        name: 'T-shirt',
                        description: 'T-shirt',
                        tax_code:'txcd_99999999',
                    },
                },
            },
        ],
        mode: 'payment',
        success_url: stripeApiHost + '/success.html',
        cancel_url: stripeApiHost + '/cancel.html',
    });

    res.redirect(303, session.url);

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
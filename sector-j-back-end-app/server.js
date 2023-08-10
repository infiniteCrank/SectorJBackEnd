const express = require('express');
// create express app
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

// adding Helmet to enhance your API's security
app.use(helmet());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Wizduds Corp api."});
});

// parse requests of content-type - application/json
app.use(bodyParser.json())

//defines product image routes 
require('./app/routes/product.image.routes.js')(app);

//defines product type routes 
require('./app/routes/product.type.routes.js')(app);

//defines product routes 
require('./app/routes/products.routes.js')(app);

//defines notes routes 
require('./app/routes/note.routes.js')(app);

//defines user routes 
require('./app/routes/user.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
module.exports = (app) => {
    const annonActionController = require('../controllers/annon.action.controller.js');

    app.post('/actions/annon', annonActionController.createAnnonAction)
}
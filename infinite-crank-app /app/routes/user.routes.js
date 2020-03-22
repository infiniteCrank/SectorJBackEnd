module.exports = (app) => {
    const usersController = require('../controllers/users.controller.js');
    app.post("/register", usersController.register);
    app.post("/login", usersController.login);
}
module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    const fs = require('fs');
    const pubKey = fs.readFileSync('/home/bitnami/infinite-crank-app/app/validation/jwtRS256.key.pub');
    //json web token stuff
    const jwt = require('express-jwt');
    const jwtCheck = jwt({
        secret: pubKey,
        audience: "infinite-crank",
        issuer: 'http://infinitecrank.com',
        algorithms: ['RS256']
    });

    //app.use(jwtCheck);
    // Create a new Note
    app.post('/notes',jwtCheck, notes.create);
    //app.post('/notes', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId',jwtCheck, notes.update);
    //app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId',jwtCheck, notes.delete);
    //app.delete('/notes/:noteId', notes.delete);
}
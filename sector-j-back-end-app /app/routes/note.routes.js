module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    const fs = require('fs');
    const pubKey = fs.readFileSync('/home/bitnami/sector-j-back-end-app/app/validation/jwtRS256.key.pub');
    //json web token stuff
    const jwt = require('express-jwt');
    const jwtCheck = jwt({
        secret: pubKey,
        audience: "sector-j:Admin",
        issuer: 'http://sector-j',
        algorithms: ['RS256']
    });

    //app.use(jwtCheck);
    // Create a new Note
    app.post('/notes',jwtCheck,function (req, res){
        if (!req.user.isAdmin){
            return res.sendStatus(401);
        }
        else{
            notes.create(req, res);
        }
    });
    //app.post('/notes', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId',jwtCheck,function (req, res){
        if (!req.user.isAdmin){
            return res.sendStatus(401);
        }
        else{
            notes.update(req, res);
        }
    });
    //app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId',jwtCheck,function (req, res){
        if (!req.user.isAdmin){
            return res.sendStatus(401);
        }
        else{
            notes.delete(req, res);
        }
    });
    //app.delete('/notes/:noteId', notes.delete);
}
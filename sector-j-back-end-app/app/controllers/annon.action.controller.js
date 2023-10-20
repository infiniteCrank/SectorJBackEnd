const AnnonActionsModel = require('../models/annon.action.model');

// Create and Save a new Note
exports.createAnnonAction = (req, res) => {
    // Validate request
    const stringRegEx = /[^-\s\w-_.,#]/
    let err = "";
    
    if(!req.body.title || stringRegEx.test(req.body.title)){
        console.log(req.body.title.match(stringRegEx))
        err += "title did not pass validation ";
    }
    if(!req.body.actionType || stringRegEx.test(req.body.actionType)){
        console.log(req.body.actionType.match(stringRegEx))
        err += "actionType did not pass validation ";
    }
    if(!req.body.userAgent || stringRegEx.test(req.body.userAgent)){
        console.log(req.body.userAgent.match(stringRegEx))
        err += "userAgent did not pass validation ";
    }
    if(!req.body.action || stringRegEx.test(req.body.action)){
        console.log(req.body.action.match(stringRegEx))
        err += "action did not pass validation ";
    }

    if(req.body.title.length > 20 ){
        console.log(req.body.title.match(stringRegEx))
        err += "title did not pass validation ";
    }
    if(req.body.actionType.length > 20 ){
        console.log(req.body.actionType.match(stringRegEx))
        err += "actionType did not pass validation ";
    }
    if(req.body.userAgent.length > 20 ){
        console.log(req.body.userAgent.match(stringRegEx))
        err += "userAgent did not pass validation ";
    }
    if(req.body.action.length > 20 ){
        console.log(req.body.action.match(stringRegEx))
        err += "action did not pass validation ";
    }

    if(err !== "") {
        return res.status(400).send({
            title: 'failed to create annon action log',
            content: err
        });
    }

    // Create an action
    const action = new AnnonActionsModel({
        title: req.body.title || "Untitled Action", 
        actionType: req.body.actionType,
        userAgent: req.body.userAgent,
        action: req.body.action,
    });

    // Save Note in the database
    action.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Annon Action log."
        });
    });
};
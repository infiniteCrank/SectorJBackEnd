const usersModel = require('../models/users.model.js');
const bcrypt = require("bcryptjs");
const validatorjwt = require("jsonwebtoken");
const validateRegisterInput = require("../validation/register.js");
const validateLoginInput = require("../validation/login.js");
const fs = require('fs');
const privateKey = fs.readFileSync('/home/bitnami/infinite-crank-app/app/validation/jwtRS256.key');
exports.register = (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    usersModel.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        }else {
            const newUser = new usersModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        }
    });
}

exports.login = (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    usersModel.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                validatorjwt.sign(
                    payload,
                    privateKey,
                    {
                        audience:"infinite-crank",
                        issuer: 'http://infinitecrank.com',
                        algorithm: 'RS256',
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            }else{
                return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
}
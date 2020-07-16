const validatePassword = require('../config/validate-register');
const validateLoginInput = require('../config/validate-login');
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require("bcryptjs");

router.post("/login", (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                    expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                    }
                );
            }
            else {
                return res.status(400).json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

router.route('/register').post((req, res) => {

    const { errors, isValid } = validatePassword(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        height: req.body.height,
        weight: req.body.weight,
        sex: req.body.sex,
        password: req.body.password,
        birthdate: req.body.birthdate,
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(() => res.json('User added'))
            .catch(err => res.status(400).json('Error: ' + err));
        });
      });        
});

module.exports = router;
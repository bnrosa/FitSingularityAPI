const router = require('express').Router();
const User = require('../models/user.model');
const validatePassword = require('../config/validate-register');
const validateLoginInput = require('../config/validate-login');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

router.route('/').get((req, res) =>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) =>{
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) =>{
    User.findByIdAndDelete(req.params.id)
        .then(user => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) =>{    
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

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
        password2: req.body.password2,
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
})

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

module.exports = router;

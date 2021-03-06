const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require("bcryptjs");

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

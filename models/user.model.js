const mongoose = require('mongoose');
const Validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    role: {type: String, default: 'free'},
    birthdate: {type: Date, required: true},
    height: {type: Number, required: true, minlength: 3},
    weight: {type: Number, required: true, minlength: 3},
    sex: {type: String, required: true, minlength: 4},
    password: {type: String, required: true, minlength: 6},
    email: {type: String, required: true, unique: true, validate: [Validator.isEmail, 'Please use a valid email address']}
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
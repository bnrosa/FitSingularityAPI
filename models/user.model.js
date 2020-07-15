const mongoose = require('mongoose');
import isEmail from 'validator/lib/isEmail';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    birthDate: {type: Date, required: true},
    height: {type: Number, required: true},
    sex: {type: String, required: true},
    email: {type: String, required: true, unique: true, validate: [isEmail, 'Please use a valid email address']}
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
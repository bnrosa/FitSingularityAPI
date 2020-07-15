const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    creator: {type: String,required: true},
    carbohydrates: {type: Number, required: true},
    lipids: {type: Number, required: true},
    proteins: {type: Number, required: true},
    fiber: {type: Number},
    name: {type: String, required: true, minlength: 2},
    quantity: {type: Number, required: true}
}, {
    timestamps: true,
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
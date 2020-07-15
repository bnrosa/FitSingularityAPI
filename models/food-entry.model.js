const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodEntrySchema = new Schema({
    username: {type: String, required: true,},
    amount: {type: Number, required: true},
    fraction: {type: Number, required: true},
    mealTime: {type: String, required: true},
    date: {type: Date, required: true},
}, {
    timestamps: true,
});

const FoodEntry = mongoose.model('FoodEntry', foodEntrySchema);

module.exports = FoodEntry;
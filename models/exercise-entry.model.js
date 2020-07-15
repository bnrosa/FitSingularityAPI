const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseEntrySchema = new Schema({
    description: {type: String,required: true},
    username: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, required: true},
}, {
    timestamps: true,
});

const ExerciseEntry = mongoose.model('ExerciseEntry', exerciseEntrySchema);

module.exports = ExerciseEntry;
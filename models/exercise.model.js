const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: {type: String,required: true},
    creator: {type: String, required: true},
    metabolicEquivalent: {type: Number, required: true},
}, {
    timestamps: true,
});

const ExerciseEntry = mongoose.model('ExerciseEntry', exerciseSchema);

module.exports = ExerciseEntry;
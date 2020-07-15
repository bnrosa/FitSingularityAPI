const router = require('express').Router();
let ExerciseEntry = require('../models/exercise-entry.model');

router.route('/').get((req, res) =>{
    ExerciseEntry.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) =>{
    ExerciseEntry.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) =>{
    ExerciseEntry.findByIdAndDelete(req.params.id)
        .then(() => res.json('Execise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    ExerciseEntry.findById(req.params.id)
      .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
  
        exercise.save()
          .then(() => res.json('ExerciseEntry updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req, res) => {
    const newExerciseEntry = new ExerciseEntry({
        username: req.body.username,
        description: req.body.description,
        duration: Number(req.body.duration),
        date: Date.parse(req.body.date),
    });

    newExerciseEntry.save()
        .then(() => res.json('ExerciseEntry added'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
const express = require('express');
const router = express.Router();
const Alert = require('../models/alert');
const errorHandler = require('../helpers/error-handler');

router.get('/', (req, res) => {
  Alert.find({}).then((alerts) => {
    res.json({ alerts });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Alert.findById(id).then((alert) => {
    res.json({ alert });
  });
});

router.post('/', async (req, res) => {
  const { email, term, frequency } = req.body;
  const minutesAllowed = [2, 5, 30];

  let alert = await Alert.findOne({ email, term }).exec();

  if (alert) {
    res.status(422);
    return res.json({ errors: ['Term already registered for this user'] });
  }

  if (minutesAllowed.indexOf(frequency) > -1) {
    res.status(422);
    return res.json({ errors: [`Frequency can only be ${minutesAllowed.join(', ')}`] });
  }

  Alert.create({ ...req.body }).then((alert) => {
    res.status(201);
    res.json({ alert });
  }).catch((err) => {
    const errors = errorHandler(err);

    res.status(422);
    res.json({ errors });
  });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, frequency, term } = req.body;

  let alert = await Alert.findById(id).exec();

  if (!alert) {
    res.status(400);
    res.json({ error: ['Alert not found']});
  }

  alert.email = email || alert.email;
  alert.frequency = frequency || alert.frequency;
  alert.term = term || alert.term;

  try {
    alert = await alert.save();
    res.status(200);
    return res.json({ alert });
  } catch (error) {
    res.status(400);
    return res.json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  Alert.deleteOne({ _id: id }).then((data) => {
    res.json({
      _id: id,
      message: 'Notification successfully deleted'
    });
  }).catch((err) => {
    res.status(400);
    res.json({ message: err });
  });
});

module.exports = router;

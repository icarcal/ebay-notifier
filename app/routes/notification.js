const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');

router.get('/', (req, res) => {
  res.send('Birds home page');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Notification.findById(id).then((notification) => {
    res.json({ notification });
  });
});

router.post('/', (req, res) => {
  const { email, frequency, term } = req.body;


  const notificationData = {
    email,
    notifications: [{
      term,
      frequency,
    }],
  };

  Notification.create(notificationData).then(() => {
    res.sendStatus(201);
  }).catch((err) => {
    res.sendStatus(422);
  });
});

router.put('/', (req, res) => {
  res.send('About birds');
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Notification.deleteOne({ id }).then((err) => {
    if (!err) {
      res.json({ message: 'Notification successfully deleted' });
    }

    res.json({ message: 'Something went wrong' });
  });
});

module.exports = router;

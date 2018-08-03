const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  email: String,
  notifications: [{
    term: String,
    frequency: Number,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
  }],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);

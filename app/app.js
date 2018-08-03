const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cron = require('node-cron');
const mongoose = require('mongoose');
const router = require('./router');
require('dotenv').config();

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/ebay-notifier?authSource=admin`, {
  useNewUrlParser: true,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
});

const db = mongoose.connection;
db.on('error', () => { console.error('Database is not connected') });
db.once('open', () => { console.error('Connection ok') });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', router.static);
app.use('/notification', router.notification);

// cron.schedule('*/2 * * * *', () => {
//   const now = new Date();
//   console.log(`running a task every 2 minutes ${now.toString()}`);
// });

// cron.schedule('*/5 * * * *', () => {
//   const now = new Date();
//   console.log(`running a task every 5 minutes ${now.toString()}`);
// });

app.listen(3000);

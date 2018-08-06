const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const cron = require('node-cron');
const mongoose = require('mongoose');
const router = require('./routes/router');
const CronService = require('./services/cron-service');
const redis = require('redis');
require('dotenv').config();

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/ebay-notifier?authSource=admin`, {
  server: { auto_reconnect: true },
  useNewUrlParser: true,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
});

if (process.env.APP_ENVIROMENT !== 'production') {
  const db = mongoose.connection;
  db.on('error', () => { console.error('Database is not connected') });
  db.once('open', () => { console.error('Connection ok') });
}

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

if (process.env.APP_ENVIROMENT !== 'production') {
  redisClient.on('error', (err) => { console.log(`Error ${err}`) });
  redisClient.on('connect', () => { console.log('Redis Connected') });
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

.all('*', cors());
app.use('/', router.static);
app.use('/notification', router.notification);

cron.schedule('*/2 * * * *', () => {
  const now = new Date();
  console.log(`Alert 2 minutes started: ${now.toString()}`);

  const cronService = new CronService();
  cronService.sendAlertEmail({ frequency: 2 });
});

cron.schedule('*/5 * * * *', () => {
  const now = new Date();
  console.log(`Alert 5 minutes started: ${now.toString()}`);

  const cronService = new CronService();
  cronService.sendAlertEmail({ frequency: 5 });
});

cron.schedule('*/30 * * * *', () => {
  const now = new Date();
  console.log(`Alert 30 minutes started: ${now.toString()}`);

  const cronService = new CronService();
  cronService.sendAlertEmail({ frequency: 30 });
});

app.listen(process.env.APP_PORT);

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Birds they love you');
});

module.exports = router;

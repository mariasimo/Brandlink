const express = require('express');
const router = express.Router();

router.use('/api', require('./api'))

/* GET home page */
router.get('/', (req, res, next) => {
  res.send('index');
});

module.exports = router;

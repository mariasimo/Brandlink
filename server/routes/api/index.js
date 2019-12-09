const router = require('express').Router();

router.use('/', require('./auth.routes'))

module.exports = router;

const router = require('express').Router();

router.use('/users', require('./auth.routes'))
router.use('/projects', require('./project.routes'))

module.exports = router;

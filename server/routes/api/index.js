const router = require('express').Router();

router.use('/', require('./auth.routes'))
router.use('/project', require('./project.routes'))

module.exports = router;

const router = require('express').Router();
const users = require('./users');
const cards = require('./cards');
const errorPage = require('./errorPage');

router.use('/users', users);
router.use('/cards', cards);
router.use('/*', errorPage);

module.exports = router;

const router = require('express').Router();
const auth = require('./auth');
const users = require('./users');
const cards = require('./cards');
const errorPage = require('./errorPage');

router.use('/', auth);
router.use('/users', users);
router.use('/cards', cards);
router.use('/', errorPage);

module.exports = router;

const router = require('express').Router();
const crashTest = require('./crashTest');
const auth = require('./auth');
const users = require('./users');
const cards = require('./cards');
const errorPage = require('./errorPage');

router.use('/crash-test', crashTest);
router.use('/', auth);
router.use('/users', users);
router.use('/cards', cards);
router.use('/', errorPage);

module.exports = router;

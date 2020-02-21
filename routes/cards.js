const router = require('express').Router();
const { readJsonFile, sendJson } = require('../middlewares');

router.get('/', readJsonFile, sendJson);

module.exports = router;

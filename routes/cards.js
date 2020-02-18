const router = require('express').Router();
const cards = require('../data/cards');

const getCards = (req, res) => {
  res.send(cards);
};

router.get('/', getCards);

module.exports = router;

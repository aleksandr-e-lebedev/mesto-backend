const router = require('express').Router();
const {
  getCards, createCard, removeCard, toggleCardLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', removeCard);
router.put('/:cardId/likes', toggleCardLike);
router.delete('/:cardId/likes', toggleCardLike);

module.exports = router;

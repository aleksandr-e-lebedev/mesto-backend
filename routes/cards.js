const router = require('express').Router();
const {
  getCards, createCard, removeCard, toggleCardLike,
} = require('../controllers/cards');
const { cardPreValidator } = require('../middlewares');

const { createCardReqCheck } = cardPreValidator;

router.get('/', getCards);
router.post('/', createCardReqCheck, createCard);
router.delete('/:cardId', removeCard);
router.put('/:cardId/likes', toggleCardLike);
router.delete('/:cardId/likes', toggleCardLike);

module.exports = router;

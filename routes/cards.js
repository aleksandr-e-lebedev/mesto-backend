const router = require('express').Router();

const {
  getCards, createCard, removeCard, toggleCardLike,
} = require('../controllers/cards');

const {
  auth, cardPreValidator,
} = require('../middlewares');

const {
  createCardReqCheck,
} = cardPreValidator;

router
  .route('/')
  .get(auth, getCards)
  .post(auth, createCardReqCheck, createCard);

router
  .route('/:cardId')
  .delete(auth, removeCard);

router
  .route('/:cardId/likes')
  .put(auth, toggleCardLike)
  .delete(auth, toggleCardLike);

module.exports = router;

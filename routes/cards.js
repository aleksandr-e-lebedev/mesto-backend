const router = require('express').Router();

const {
  getCards, createCard, removeCard, toggleCardLike,
} = require('../controllers/cardsController');

const {
  auth, cardPreValidator,
} = require('../middlewares');

const {
  createCardReqCheck, cardIdReqCheck,
} = cardPreValidator;

router
  .route('/')
  .get(auth, getCards)
  .post(auth, createCardReqCheck, createCard);

router
  .route('/:cardId')
  .delete(auth, cardIdReqCheck, removeCard);

router
  .route('/:cardId/likes')
  .put(auth, cardIdReqCheck, toggleCardLike)
  .delete(auth, cardIdReqCheck, toggleCardLike);

module.exports = router;

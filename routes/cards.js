const router = require('express').Router();

const {
  getCards, createCard, removeCard, toggleCardLike,
} = require('../controllers/cardsController');

const {
  authPreValidator, auth, cardPreValidator,
} = require('../middlewares');

const {
  jwtCookieReqCheck,
} = authPreValidator;

const {
  createCardReqCheck, cardIdReqCheck,
} = cardPreValidator;

router
  .route('/')
  .get(jwtCookieReqCheck, auth, getCards)
  .post(jwtCookieReqCheck, auth, createCardReqCheck, createCard);

router
  .route('/:cardId')
  .delete(jwtCookieReqCheck, auth, cardIdReqCheck, removeCard);

router
  .route('/:cardId/likes')
  .put(jwtCookieReqCheck, auth, cardIdReqCheck, toggleCardLike)
  .delete(jwtCookieReqCheck, auth, cardIdReqCheck, toggleCardLike);

module.exports = router;

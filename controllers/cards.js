const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { CARD_NOT_FOUND, POST_REMOVED, NOT_ENOUGH_RIGHTS } = require('../configuration/constants');

exports.getCards = (req, res, next) => {
  Card.find()
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id: owner } = req.user;

  Card.create({ name, link, owner })
    .then((card) => card.populate('owner').execPopulate())
    .then((card) => res.status(201).send(card))
    .catch(next);
};

exports.removeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError(CARD_NOT_FOUND));
        return;
      }

      const user = req.user._id;
      const owner = card.owner._id.toString();

      if (user === owner) {
        card.remove();
        res.send({ message: POST_REMOVED });
      } else {
        next(new ForbiddenError(NOT_ENOUGH_RIGHTS));
      }
    })
    .catch(next);
};

exports.toggleCardLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;

  let doc = {};

  doc = req.method === 'PUT'
    ? { $addToSet: { likes: userId } }
    : { $pull: { likes: userId } };

  Card.findByIdAndUpdate(cardId, doc)
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        next(new NotFoundError(CARD_NOT_FOUND));
        return;
      }

      res.send(card);
    })
    .catch(next);
};

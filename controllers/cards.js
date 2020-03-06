const Card = require('../models/card');
const ForbiddenError = require('../errors/ForbiddenError');
const { POST_REMOVED, NOT_ENOUGH_RIGHTS } = require('../configuration/constants');

const getCards = (req, res, next) => {
  Card.find()
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id: owner } = req.user;

  Card.create({ name, link, owner })
    .then((card) => card.populate('owner').execPopulate())
    .then((card) => res.status(201).send(card))
    .catch(next);
};

const removeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
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

const toggleCardLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;
  const opts = { new: true, runValidators: true };

  let doc = {};

  doc = req.method === 'PUT'
    ? { $addToSet: { likes: userId } }
    : { $pull: { likes: userId } };

  Card.findByIdAndUpdate(cardId, doc, opts)
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  removeCard,
  toggleCardLike,
};

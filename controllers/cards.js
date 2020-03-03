const Card = require('../models/card');

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
        res.send({ message: 'Пост удалён' });
      } else {
        next({ status: 403, message: { message: 'Недостаточно прав' } });
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  removeCard,
};

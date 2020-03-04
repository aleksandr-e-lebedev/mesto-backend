const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

const getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.send(user))
    .catch(() => next(new NotFoundError('Нет пользователя с таким id')));
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};

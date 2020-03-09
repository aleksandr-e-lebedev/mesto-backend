const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const { USER_NOT_FOUND } = require('../configuration/constants');

const getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(USER_NOT_FOUND));
        return;
      }

      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch(next);
};

const updateUserData = (req, res, next) => {
  const { _id: id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(id, { name, about })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(USER_NOT_FOUND));
        return;
      }

      res.send(user);
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { _id: id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { avatar })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(USER_NOT_FOUND));
        return;
      }

      res.send(user);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserData,
  updateUserAvatar,
};

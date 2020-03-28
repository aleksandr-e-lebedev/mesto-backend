const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const { USER_NOT_FOUND } = require('../configuration/constants');

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.send(users))
    .catch(next);
};

exports.getUser = (req, res, next) => {
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

exports.updateUserData = (req, res, next) => {
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

exports.updateUserAvatar = (req, res, next) => {
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

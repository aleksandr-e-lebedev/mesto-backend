const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.send(user))
    .catch(() => next({ status: 404, message: { message: 'Нет пользователя с таким id' } }));
};

module.exports = {
  getUsers,
  getUser,
};

/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const users = require('../data/users');

const getUsers = (req, res) => {
  res.send(users);
};

const getUser = (req, res) => {
  const { id } = req.params;

  const user = users.find((item) => item._id === id);

  return user ? res.send(user) : res.status(404).send({ message: 'Нет пользователя с таким id' });
};

router.get('/', getUsers);
router.get('/:id', getUser);

module.exports = router;
